const API_ENDPOINT = "https://dermadetect.onrender.com/predict";
// const API_ENDPOINT = "http://127.0.0.1:8080/predict";

export type DiseaseProbs = {
	"Benign keratosis-like lesions": string;
	"Melanocytic nevi": string;
	Dermatofibroma: string;
	Melanoma: string;
	"Vascular lesions": string;
	"Basal cell carcinoma": string;
	"Actinic keratoses": string;
};

export async function handlePredict(
	selectedFile: File,
	successCallback: (probs: DiseaseProbs) => void,
	failCallback?: (reason: any) => void
) {
	const formData = new FormData();
	formData.append("file", selectedFile);

	try {
		fetch(API_ENDPOINT, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => data.predictions)
			.then((probs) => successCallback(probs))
			.catch(failCallback);
	} catch (error) {
		console.error("Error:", error);
	}
}

// class SearchRequestModel(BaseModel):
//     query: constr(min_length=0) = Field(..., description="Search keyword")
//     aroundLatLng: constr(pattern=r"\-?\d+\.?\d*,\s*\-?\d+\.?\d*") = Field(..., description="Coordinates in 'lat,lng' format")
//     getRankingInfo: StrictBool = Field(..., description="Must be a boolean")
//     page: StrictInt = Field(..., ge=0, description="Page number (0-indexed)")
//     aroundRadius: StrictInt = Field(..., gt=0, description="Search radius in meters (must be positive)")

//     class Config:
//         extra = "forbid"
//         arbitrary_types_allowed = False

const header = {
	"X-Algolia-Application-Id": "55WTPYUY7Q",
	"X-Algolia-API-Key": "41da89e44195a72b2d9d109eeee8db8f",
	"Content-Type": "application/json; charset=UTF-8",
	origin: "https://find-a-derm.aad.org",
	referer: "https://find-a-derm.aad.org/",
};

const AAD_URL_BASE =
	"https://55wtpyuy7q-dsn.algolia.net/1/indexes/production/query";

export type HospitalSearchRequest = {
	query: string;
	aroundLatLng: string;
	getRankingInfo: boolean;
	page: number;
	aroundRadius: number;
};

export async function handleHospitalQuery(request: HospitalSearchRequest) {
	fetch(AAD_URL_BASE, {
		method: "POST",
		headers: header,
		body: JSON.stringify(request),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error(error);
		});
}
