// const API_ENDPOINT = "https://dermadetect.onrender.com/";
const API_ENDPOINT = "http://127.0.0.1:8080/";

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
  acceptsCareCredit: boolean;
  additionalInformation: string;
  certification: string;
  conditions: string[];
  firstName: string;
  gender: string;
  groupHospital: string;
  isAcceptingNewPatients: string;
  isUsingTelemedicine: boolean;
  isVisible: boolean;
  languages: string;
  lastName: string;
  location: {
    address1: string;
    address2: string;
    address3: string;
    amsAddressType: string;
    amsIsVisibleToPublic: boolean;
    city: string;
    company: string;
    country: string;
    fax: string;
    hours: any[];
    locationID: number;
    phone: string;
    postalCode: string;
    stateProvince: string;
    website: string;
    _geoloc: {
      lat: number;
      lng: number;
    };
  };
  medicalSchool: string[];
  name: string;
  practiceFocus: string[];
  procedures: string[];
  professionalMemberships: string;
  profilePhotoUrl: string;
  publishedArticles: string;
  residencyTraining: string[];
  specialtyTraining: string[];
};

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
	successCallback: (data: any) => void,
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
			successCallback(data);
		})
		.catch((error) => {
			console.error(error);
			failCallback?.call;
		});
}
