from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from torch import no_grad, softmax, load
from torchvision import transforms
import io
from model import DermaScannerModel


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

