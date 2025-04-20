import { DiseaseProbs } from "../utility/fetch";

function AnalysisResult(props: {predictions: DiseaseProbs | null, isLoading: boolean}) {
  function getMaxProbDiagnosis() {
    const predictions: DiseaseProbs | null = props.predictions
    if (predictions) {

    }
  }

	return (
		<div>
			<div className="bg-white p-8 rounded-xl shadow-lg">
				<h3 className="text-lg font-medium text-gray-900 mb-4">
					Your Analysis Results
				</h3>

				<div id="resultPlaceholder" className="text-center py-12">
					<i className="fas fa-microscope text-4xl text-gray-300 mb-4"></i>
					<p className="text-gray-500">
						Upload an image to see your analysis results
					</p>
				</div>

        {/* Result */}
				<div id="resultDisplay" className="hidden">
					<div className="result-card rounded-lg overflow-hidden mb-6">
						<div className="px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
									<i className="fas fa-diagnoses text-indigo-600 text-xl"></i>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dt className="text-sm font-medium text-gray-500 truncate">
										AI Diagnosis
									</dt>
									<dd className="flex items-baseline">
										<div
											className="text-xl font-semibold text-gray-900"
											id="diagnosisResult"
										>
											Atypical Nevus (Moderate Risk)
										</div>
									</dd>
								</div>
							</div>
						</div>
					</div>

					<div className="result-card rounded-lg overflow-hidden mb-6">
						<div className="px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
									<i className="fas fa-shield-alt text-indigo-600 text-xl"></i>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dt className="text-sm font-medium text-gray-500 truncate">
										Risk Level
									</dt>
									<dd className="flex items-baseline">
										<div
											className="text-xl font-semibold"
											id="riskLevel"
										>
											<span className="risk-medium px-3 py-1 rounded-full">
												Medium Risk
											</span>
										</div>
									</dd>
								</div>
							</div>
						</div>
					</div>

					<div className="result-card rounded-lg overflow-hidden mb-6">
						<div className="px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
									<i className="fas fa-info-circle text-indigo-600 text-xl"></i>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dt className="text-sm font-medium text-gray-500 truncate">
										Next Steps
									</dt>
									<dd className="mt-2 text-sm text-gray-700">
										<p id="nextSteps">
											We recommend monitoring this spot
											for changes in size, shape or color.
											Consider consulting a dermatologist
											within the next 3 months for a
											professional evaluation.
										</p>
									</dd>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<button
							id="saveResultsBtn"
							className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<i className="fas fa-save mr-2"></i> Save Results to
							Your Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AnalysisResult;
