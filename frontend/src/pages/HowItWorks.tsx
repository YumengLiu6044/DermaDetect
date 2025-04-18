const steps = [
	{
		desc: "Upload a Picture",
		img: "fa-regular fa-image",
		number_background: "bg-purple-200",
		border: "border-purple-300/50",
		number_color: "text-purple-600",
		subtitle: "Take a clear photo of the skin lesion or area of concern and securely upload it to our platform."
	},
	{
		desc: "Obtain Analysis",
		img: "fas fa-magnifying-glass",
		number_background: "bg-blue-200",
		border: "border-blue-300/50",
		number_color: "text-blue-600",
		subtitle: "Our AI model instantly analyzes the image and provides a preliminary assessment of potential skin conditions."
	},
	{
		desc: "Find A Provider",
		img: "fa-regular fa-hospital",
		number_background: "bg-green-200",
		border: "border-green-300/50",
		number_color: "text-green-600",
		subtitle: "Connect with qualified dermatologists in your area for professional diagnosis and treatment options."
	},
];

export default function HowItWorks() {
	return (
		<div className="flex flex-col">
			<div className="gradient-bg text-white">
				<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
					<div className="text-center flex flex-col gap-3">
						<span className="text-5xl tracking-tight sm:text-3xl lg:text-5xl">
							How DermaScan Works
						</span>
						<span className="mt-6 mx-auto text-xl max-w-3xl">
							Our skin cancer detection website allows users to
							upload images of skin lesions for instant analysis.
							Using a Vision Transformer (ViT) model, it
							classifies the uploaded image to assess the
							likelihood of skin cancer.
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-3 items-center my-5 text-center">
				<span className="text-3xl font-medium text-black">
					Simple 3-Step Process
				</span>
				<span className="text-lg text-gray-700 max-w-3xl">
					DermaScan makes it easy to get a preliminary assessment of
					skin concerns from the comfort of your home.
				</span>

				<div className="grid lg:grid-cols-3 sm:grid-cols-1 px-5 items-center py-5 gap-5">
					{steps.map((item, index) => (
						<div
							className={`transition-transform duration-300 hover:scale-105 relative flex flex-col justify-between h-full rounded-2xl shadow-xl items-center p-5 border-2 ${item.border}`}
							key={index}
						>
							<div className="flex flex-col items-center gap-4">
								<div
									className={`absolute -top-5 w-13 h-13 rounded-full flex items-center justify-center text-4xl mb-6  ${item.number_background} ${item.number_color}`}
								>
									{index + 1}
								</div>
								<span className="text-2xl font-medium">
									{item.desc}
								</span>
								<span className="text-gray-500 max-w-3xs text-lg">{item.subtitle}</span>
							</div>
							<i
								className={
									"mt-5 p-4 rounded-full flex items-center justify-center text-6xl font-thin " +
									item.img +
									" " +
									item.number_color +
									" " +
									item.number_background
								}
							></i>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
