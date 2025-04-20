import { DiseaseProbs } from "../utility/fetch";
import loading from "../assets/loading.svg";
import { useEffect, useState } from "react";

const DiseaseRecommendations: Record<keyof DiseaseProbs, string> = {
	"Benign keratosis-like lesions":
		"Typically non-cancerous, but monitor for changes. If itching, bleeding, or growth occurs, consult a dermatologist.",
	"Melanocytic nevi":
		"Common moles—harmless in most cases. Watch for changes and follow the ABCDE rule to detect melanoma early.",
	Dermatofibroma:
		"Benign skin nodules. Usually no treatment needed unless painful or irritating. Consult a dermatologist if concerned.",
	Melanoma:
		"A dangerous skin cancer. Seek immediate medical attention if suspected. Early detection is critical.",
	"Vascular lesions":
		"Usually harmless. If they bleed, grow, or cause discomfort, see a dermatologist. Laser treatment may help.",
	"Basal cell carcinoma":
		"Common skin cancer. Rarely spreads but requires treatment. See a dermatologist for removal options.",
	"Actinic keratoses":
		"Precancerous sun-related lesions. Use sun protection and consult a dermatologist for evaluation and treatment.",
};

type RiskLevel = {
	name: string;
	primaryColor: string;
	secondaryColor: string;
};

const Risk = {
	low: {
		name: "Low Risk",
		primaryColor: "text-green-700",
		secondaryColor: "bg-green-200",
	},
	medium: {
		name: "Medium Risk",
		primaryColor: "text-yellow-700",
		secondaryColor: "bg-yellow-200",
	},
	high: {
		name: "High Risk",
		primaryColor: "text-red-700",
		secondaryColor: "bg-red-200",
	},
};

interface Diagnosis {
	diseaseName: string;
	riskLevel: RiskLevel;
	recommendations: string;
}

function AnalysisResult(props: {
	predictions: DiseaseProbs | null;
	isLoading: boolean;
}) {
	const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);

	useEffect(() => {
		const predictions = props.predictions;
		if (predictions) {
			let maxDisease: keyof DiseaseProbs = "Actinic keratoses";
			let maxProb: number = 0;
			let riskLevel: RiskLevel;
			for (const pair of Object.entries(predictions)) {
				if (pair[1] > maxProb) {
					maxProb = pair[1];
					maxDisease = pair[0] as keyof DiseaseProbs;
				}
			}
			console.log(maxDisease);

			if (maxProb > 0.7) {
				riskLevel = Risk.high;
			} else if (maxProb > 0.3) {
				riskLevel = Risk.medium;
			} else {
				riskLevel = Risk.low;
			}

			const newDiagnosis: Diagnosis = {
				diseaseName: maxDisease,
				riskLevel: riskLevel,
				recommendations: DiseaseRecommendations[maxDisease],
			};
			setDiagnosis(newDiagnosis);
		}
	}, [props.predictions]);

	return (
		<div className="bg-white p-8 rounded-xl shadow-lg">
			{props.isLoading ? (
				<div className="flex flex-col items-center text-center">
					<img src={loading} className="w-fit" />
					<span className="text-lg text-gray-400">Analyzing...</span>
				</div>
			) : !props.predictions ? (
				<div>
					<h3 className="text-lg font-medium text-gray-900 mb-4">
						Your Analysis Results
					</h3>

					<div id="resultPlaceholder" className="text-center py-12">
						<i className="fas fa-microscope text-4xl text-gray-300 mb-4"></i>
						<p className="text-gray-500">
							Upload an image to see your analysis results
						</p>
					</div>
				</div>
			) : (
				<div id="resultDisplay" className="flex flex-col gap-2">
					<span className="font-medium text-lg">
						Your Analysis Results
					</span>

					<div className="flex flex-col gap-3">
						<div className={"rounded-xl shadow flex py-3 px-4 gap-4 items-center fade-in-up-0"}>
							<i className="fas fa-user-md text-indigo-600 text-2xl bg-indigo-300/70 rounded-full p-2"></i>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 font-medium">
									AI Diagnosis
								</span>
								<span className="text-black font-semibold text-xl">
									{diagnosis?.diseaseName}
								</span>
							</div>
						</div>
	
						<div className="rounded-xl shadow flex py-3 px-4 gap-4 items-center fade-in-up-1">
							<i className="fa-solid fa-shield-halved text-indigo-600 text-2xl bg-indigo-300/70 rounded-full p-2"></i>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 font-medium">
									Risk Level
								</span>
								<span
									className={`${diagnosis?.riskLevel.primaryColor} rounded-3xl py-1 px-3 ${diagnosis?.riskLevel.secondaryColor} font-semibold text-xl`}
								>
									{diagnosis?.riskLevel.name}
								</span>
							</div>
						</div>

						<div className="rounded-xl shadow flex py-3 px-4 gap-4 items-center fade-in-up-2">
							<i className="fa-solid fa-circle-info text-indigo-600 text-2xl bg-indigo-300/70 rounded-full p-2"></i>
							<div className="flex flex-col gap-1">
								<span className="text-gray-500 font-medium">
									Recommendation
								</span>
								<span
									className={``}
								>
									{diagnosis?.recommendations}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AnalysisResult;
