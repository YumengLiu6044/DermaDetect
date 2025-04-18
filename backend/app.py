from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from PIL import Image
from torch import no_grad, set_num_threads, set_num_interop_threads
import multiprocessing
from torch.nn.functional import softmax
import io
from transformers import AutoImageProcessor, AutoModelForImageClassification
import uvicorn
import requests
from pydantic import BaseModel, constr, Field, StrictBool, StrictInt


# Configure PyTorch threading
set_num_threads(multiprocessing.cpu_count())
set_num_interop_threads(multiprocessing.cpu_count())

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and processor
model_id = "Anwarkh1/Skin_Cancer-Image_Classification"
processor = AutoImageProcessor.from_pretrained(model_id)
model = AutoModelForImageClassification.from_pretrained(model_id)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


# API endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    with no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    probs = softmax(logits, dim=-1)[0]  # Shape: [num_classes]

    # Map class labels to probabilities
    id2label = model.config.id2label
    result = {id2label[i]: probs[i].item() for i in range(len(probs))}

    return {"probabilities": result}


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


@app.post("/findDoc")
async def findDoc(searchRequest: SearchRequestModel):
    json_payload = json.loads(searchRequest.model_dump_json())
    response = requests.post(AAD_URL_BASE, json=json_payload, headers=header)

    if response.status_code != 200:
        raise HTTPException(response.status_code, detail=response.json())

    return response.json()


def execute_backend(**kwargs):
    uvicorn.run(app, **kwargs)


if __name__ == "__main__":
    execute_backend(host="0.0.0.0", port=7860, log_level="info")
