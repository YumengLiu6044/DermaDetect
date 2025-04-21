from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from torch import no_grad, softmax, load
from torchvision import transforms
import io
from model import DermaScannerModel
import json
import requests
from pydantic import BaseModel, Field, constr, StrictBool, StrictInt


class SearchRequestModel(BaseModel):
    query: constr(min_length=0) = Field(..., description="Search keyword")
    aroundLatLng: constr(pattern=r"\-?\d+\.?\d*,\s*\-?\d+\.?\d*") = Field(..., description="Coordinates in 'lat,lng' format")
    getRankingInfo: StrictBool = Field(..., description="Must be a boolean")
    page: StrictInt = Field(..., ge=0, description="Page number (0-indexed)")
    aroundRadius: StrictInt = Field(..., gt=0, description="Search radius in meters (must be positive)")

    class Config:
        extra = "forbid"
        arbitrary_types_allowed = False


header = {
    "X-Algolia-Application-Id": "55WTPYUY7Q",
    "X-Algolia-API-Key": "41da89e44195a72b2d9d109eeee8db8f",
    "Content-Type": "application/json; charset=UTF-8",
    "origin": "https://find-a-derm.aad.org",
    "referer": "https://find-a-derm.aad.org/"
}

AAD_URL_BASE = "https://55wtpyuy7q-dsn.algolia.net/1/indexes/production/query"

empty_loc = {"lat": -1, "lng": -1}
ignore_fields = ["_geoloc", "personID", "objectID", "_highlightResult", "_rankingInfo", "locations", "certifications"]

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = DermaScannerModel()
model.load_state_dict(load("cnn_weights.pth", weights_only=True))
model.eval()

transform = transforms.Compose([
    transforms.Resize((64, 64)),
    transforms.ToTensor()
])

class_mapping = {
    0: "Benign keratosis-like lesions",
    1: "Melanocytic nevi",
    2: "Dermatofibroma",
    3: "Melanoma",
    4: "Vascular lesions",
    5: "Basal cell carcinoma",
    6: "Actinic keratoses"
}


@app.get("/")
async def read_root():
    return {"Hello": "World"}


# API endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = transform(image).unsqueeze(0)
    with no_grad():
        outputs = model(image)
        outputs = softmax(outputs, 1)
        outputs = outputs[0]
        predictions = {
            class_mapping[index]: item
            for (index, item) in enumerate(outputs.tolist())
        }
        return {"predictions": predictions}


@app.post("/findDoc")
async def findDoc(searchRequest: SearchRequestModel):
    json_payload = json.loads(searchRequest.model_dump_json())
    response = requests.post(AAD_URL_BASE, json=json_payload, headers=header)

    if response.status_code != 200:
        raise HTTPException(response.status_code, detail=response.json())

    json_data = response.json()
    doc_list = json_data.get("hits") or []
    for index, doc in enumerate(doc_list):
        locs = doc.get("locations") or []

        # Sort by least to most important fields
        locs = sorted(locs, key=lambda loc: loc.get("phone") != "", reverse=True)
        locs = sorted(locs, key=lambda loc: loc.get("website") != "", reverse=True)
        locs = sorted(locs, key=lambda loc: loc.get("_geoloc") != empty_loc, reverse=True)
        locs = locs[0] if len(locs) > 0 else None

        # Remove unnecessary fields
        for ignore_field in ignore_fields:
            if ignore_field in doc:
                doc.pop(ignore_field)

        # Update original array
        doc["location"] = locs
        doc_list[index] = doc

    return doc_list
