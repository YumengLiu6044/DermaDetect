const sections = [
  {
    sectionTitle: "Company",
    subTitles: [
      "About", "Careers", "Blog"
    ]
  },
  {
    sectionTitle: "Resources",
    subTitles: [
      "Skin Cancer Guide", "Research", "Blog"
    ]
  },
  {
    sectionTitle: "Support",
    subTitles: [
      "Help Center", "Privacy", "Terms", "Contact"
    ]
  },
  {
    sectionTitle: "Connect",
    subTitles: [
      "Facebook", "Instagram", "Linkedin"
    ]
  },
]

function Footer() {
	return (
		<div className="bg-gray-800/90">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
				<div className="flex justify-between gap-8">
					{sections.map((item, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <span className="text-xl font-medium text-white/80">{item.sectionTitle}</span>
              {
                item.subTitles.map((subItem, subIndex) => (
                  <span className="hidden sm:inline text-gray-400 hover:text-white" key={subIndex}>{subItem}</span>
                ))
              }
            </div>
          ))}
				</div>
				<div className="mt-12 border-t border-gray-700 pt-8">
					<p className="text-base text-gray-400 text-center">
						© 2025 DermaScan, Inc. All rights reserved.
					</p>
					<p className="mt-2 text-sm text-gray-400 text-center">
						Disclaimer: This tool does not provide medical advice.
						It is intended for informational purposes only. Always
						seek the advice of a qualified healthcare provider with
						any questions you may have regarding a medical
						condition.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
