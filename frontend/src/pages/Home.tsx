import React, { useState } from "react";
import { handlePredict, DiseaseProbs } from "../utility/fetch";

const Home = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [prediction, setPrediction] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handlePredictButtonClick = () => {
		if (isLoading) return;

		if (selectedFile) {
			setLoading(true);
			handlePredict(
				selectedFile,
				(probs: DiseaseProbs) => {
					setPrediction(
						`Probability of Melanoma: ${(
							probs.melanoma * 100
						).toFixed(3)}%`
					);
					setLoading(false);
				},
				() => {
					setPrediction("Failed to obtain predictions");
					setLoading(false);
				}
			);
		}
	};

	return (
		<div>
			<div className="gradient-bg text-white">
				<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
					<div className="text-center flex flex-col gap-3">
						<span className="text-4xl tracking-tight sm:text-3xl lg:text-5xl">
							Early Detection Saves Lives
						</span>
						<p className="mt-6 max-w-3xl mx-auto text-2xl text-white">
							Our AI-powered skin cancer detection system helps
							you monitor suspicious moles and spots with 95%
							accuracy.
						</p>
						<div className="mt-10 flex justify-center gap-5">
							<div className="rounded-md shadow">
								<a
									href="#scan-now"
									className="no-underline w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
								>
									Scan Now{" "}
									<i className="fas fa-arrow-down ml-2 text-indigo-600"></i>
								</a>
							</div>
							<div className="ml-3 rounded-md shadow">
								<a
									href="#"
									className="no-underline w-full flex items-center justify-center px-8 py-3 border-2 font-medium rounded-md text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
								>
									Learn More
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
							Skin Cancer Facts
						</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Why Early Detection Matters
						</p>
					</div>
					<div className="mt-10">
						<div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 sm:grid-cols-1">
							<div className="bg-white overflow-hidden shadow rounded-lg">
								<div className="px-4 py-5 sm:p-6">
									<div className="flex items-center">
										<div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
											<i className="fas fa-user-md text-white text-xl"></i>
										</div>
										<div className="ml-5 w-0 flex-1">
											<dt className="text-sm font-medium text-gray-500 truncate">
												Cases Diagnosed Annually
											</dt>
											<dd className="flex items-baseline">
												<div className="text-2xl font-semibold text-gray-900">
													5M+
												</div>
											</dd>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white overflow-hidden shadow rounded-lg">
								<div className="px-4 py-5 sm:p-6">
									<div className="flex items-center">
										<div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
											<i className="fas fa-heartbeat text-white text-xl"></i>
										</div>
										<div className="ml-5 w-0 flex-1">
											<dt className="text-sm font-medium text-gray-500 truncate">
												Survival Rate (Early Detection)
											</dt>
											<dd className="flex items-baseline">
												<div className="text-2xl font-semibold text-gray-900">
													99%
												</div>
											</dd>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white overflow-hidden shadow rounded-lg">
								<div className="px-4 py-5 sm:p-6">
									<div className="flex items-center">
										<div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
											<i className="fas fa-clock text-white text-xl"></i>
										</div>
										<div className="ml-5 w-0 flex-1">
											<dt className="text-sm font-medium text-gray-500 truncate">
												Average Diagnosis Time
											</dt>
											<dd className="flex items-baseline">
												<div className="text-2xl font-semibold text-gray-900">
													{"< 1 min"}
												</div>
											</dd>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white overflow-hidden shadow rounded-lg">
								<div className="px-4 py-5 sm:p-6">
									<div className="flex items-center">
										<div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
											<i className="fas fa-check-circle text-white text-xl"></i>
										</div>
										<div className="ml-5 w-0 flex-1">
											<dt className="text-sm font-medium text-gray-500 truncate">
												Accuracy Rate
											</dt>
											<dd className="flex items-baseline">
												<div className="text-2xl font-semibold text-gray-900">
													95%
												</div>
											</dd>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="scan-now" className="bg-gray-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center mb-12">
						<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
							Skin Analysis
						</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Check Your Skin in Seconds
						</p>
						<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
							Upload a clear photo of your skin concern and our AI
							will analyze it immediately.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<div className="bg-white p-8 rounded-xl shadow-lg">
							<div
								className="upload-box rounded-lg p-8 text-center cursor-pointer"
								id="uploadBox"
							>
								<input
									type="file"
									id="fileInput"
									accept="image/*"
									className="hidden"
								/>
								<i className="fas fa-camera text-4xl text-gray-400 mb-4"></i>
								<h3 className="text-lg font-medium text-gray-900">
									Upload Skin Image
								</h3>
								<p className="mt-1 text-sm text-gray-500">
									Drag & drop your image here or click to
									browse
								</p>
								<p className="mt-2 text-xs text-gray-400">
									Supported formats: JPG, PNG (Max 5MB)
								</p>
							</div>

							<div className="mt-6">
								<h4 className="text-sm font-medium text-gray-900 mb-2">
									Tips for Best Results:
								</h4>
								<ul className="list-disc pl-5 space-y-1 text-sm text-gray-500">
									<li>
										Take photo in good lighting (natural
										light preferred)
									</li>
									<li>
										Place a ruler or coin next to the spot
										for scale
									</li>
									<li>Focus on one spot at a time</li>
									<li>
										Keep camera steady and close (6-12
										inches)
									</li>
								</ul>
							</div>
						</div>

						<div>
							<div className="bg-white p-8 rounded-xl shadow-lg">
								<h3 className="text-lg font-medium text-gray-900 mb-4">
									Your Analysis Results
								</h3>

								<div
									id="resultPlaceholder"
									className="text-center py-12"
								>
									<i className="fas fa-microscope text-4xl text-gray-300 mb-4"></i>
									<p className="text-gray-500">
										Upload an image to see your analysis
										results
									</p>
								</div>

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
															Atypical Nevus
															(Moderate Risk)
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
															We recommend
															monitoring this spot
															for changes in size,
															shape or color.
															Consider consulting
															a dermatologist
															within the next 3
															months for a
															professional
															evaluation.
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
											<i className="fas fa-save mr-2"></i>{" "}
											Save Results to Your Profile
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center mb-12">
						<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
							Why Choose DermaDetect
						</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Advanced Skin Cancer Detection
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
							<div className="p-6">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
									<i className="fas fa-brain text-xl"></i>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									AI-Powered Analysis
								</h3>
								<p className="text-gray-500">
									Our deep learning model has been trained on
									over 250,000 skin images to provide accurate
									assessments.
								</p>
							</div>
						</div>

						<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
							<div className="p-6">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
									<i className="fas fa-history text-xl"></i>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Track Changes Over Time
								</h3>
								<p className="text-gray-500">
									Save your scans to monitor suspicious spots
									and detect concerning changes early.
								</p>
							</div>
						</div>

						<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
							<div className="p-6">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
									<i className="fas fa-user-md text-xl"></i>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Dermatologist Reviewed
								</h3>
								<p className="text-gray-500">
									All results are verified by our team of
									board-certified dermatologists.
								</p>
							</div>
						</div>

						<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
							<div className="p-6">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
									<i className="fas fa-lock text-xl"></i>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Secure & Private
								</h3>
								<p className="text-gray-500">
									Your data is encrypted and never shared
									without your consent.
								</p>
							</div>
						</div>

						<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
							<div className="p-6">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
									<i className="fas fa-mobile-alt text-xl"></i>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Mobile Friendly
								</h3>
								<p className="text-gray-500">
									Scan your skin anytime, anywhere with our
									mobile-optimized platform.
								</p>
							</div>
						</div>

						<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
							<div className="p-6">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
									<i className="fas fa-globe-americas text-xl"></i>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Global Database
								</h3>
								<p className="text-gray-500">
									Our system learns from diverse skin types
									and conditions worldwide.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-indigo-50 py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center mb-12">
						<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
							Success Stories
						</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Trusted by Thousands
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="bg-white p-6 rounded-lg shadow">
							<div className="flex items-center mb-4">
								<img
									className="w-12 h-12 rounded-full"
									src="https://randomuser.me/api/portraits/women/32.jpg"
									alt="Sarah J."
								/>
								<div className="ml-4">
									<h4 className="text-lg font-medium text-gray-900">
										Sarah J.
									</h4>
									<p className="text-indigo-600">
										Melanoma Survivor
									</p>
								</div>
							</div>
							<p className="text-gray-600 italic">
								"DermAI detected a suspicious mole that I had
								overlooked. The early detection allowed me to
								get treatment before it spread. This service
								truly saved my life."
							</p>
							<div className="mt-4 flex text-yellow-400">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
							</div>
						</div>

						<div className="bg-white p-6 rounded-lg shadow">
							<div className="flex items-center mb-4">
								<img
									className="w-12 h-12 rounded-full"
									src="https://randomuser.me/api/portraits/men/45.jpg"
									alt="Michael T."
								/>
								<div className="ml-4">
									<h4 className="text-lg font-medium text-gray-900">
										Michael T.
									</h4>
									<p className="text-indigo-600">
										Regular User
									</p>
								</div>
							</div>
							<p className="text-gray-600 italic">
								"As someone with many moles, I was always
								anxious about skin cancer. DermAI gives me peace
								of mind between dermatologist visits. The
								accuracy is impressive!"
							</p>
							<div className="mt-4 flex text-yellow-400">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
							</div>
						</div>

						<div className="bg-white p-6 rounded-lg shadow">
							<div className="flex items-center mb-4">
								<img
									className="w-12 h-12 rounded-full"
									src="https://randomuser.me/api/portraits/women/68.jpg"
									alt="Dr. Patel"
								/>
								<div className="ml-4">
									<h4 className="text-lg font-medium text-gray-900">
										Dr. Patel
									</h4>
									<p className="text-indigo-600">
										Dermatologist
									</p>
								</div>
							</div>
							<p className="text-gray-600 italic">
								"I recommend DermAI to my patients as a
								supplemental tool. It helps identify concerning
								lesions that need professional evaluation,
								improving early detection rates."
							</p>
							<div className="mt-4 flex text-yellow-400">
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star"></i>
								<i className="fas fa-star-half-alt"></i>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="gradient-bg">
				<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
					<h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
						<span className="block">
							Ready to take control of your skin health?
						</span>
						<span className="block">
							Start monitoring your skin today.
						</span>
					</h2>
					<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
						<div className="inline-flex rounded-md shadow">
							<a
								href="#scan-now"
								className="no-underline inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"

							>
								Scan Your Skin Now
							</a>
						</div>
						<div className="ml-3 inline-flex rounded-md shadow">
							<a
								href="#"
								className="no-underline inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70"

							>
								Learn More
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
