const API_ENDPOINT = "https://dermadetect.onrender.com/";
// const API_ENDPOINT = "http://127.0.0.1:8080/";

export type DiseaseProbs = {
	"Benign keratosis-like lesions": number;
	"Melanocytic nevi": number;
	Dermatofibroma: number;
	Melanoma: number;
	"Vascular lesions": number;
	"Basal cell carcinoma": number;
	"Actinic keratoses": number;
};

export type DocObj = {

}

export async function handlePredict(
	selectedFile: File,
	successCallback: (probs: DiseaseProbs) => void,
	failCallback?: (reason: any) => void
) {
	const formData = new FormData();
	formData.append("file", selectedFile);

	try {
		fetch(API_ENDPOINT + "predict", {
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


export type HospitalSearchRequest = {
	query: string;
	aroundLatLng: string;
	getRankingInfo: boolean;
	page: number;
	aroundRadius: number;
};

export async function handleHospitalQuery(
	request: HospitalSearchRequest,
	successCallback: () => void,
	failCallback?: () => void
) {
	fetch(API_ENDPOINT + "findDoc", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(request),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			successCallback();
		})
		.catch((error) => {
			console.error(error);
			failCallback?.call;
		});
}
