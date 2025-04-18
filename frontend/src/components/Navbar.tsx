import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const paths = [
	{
		pathname: "/",
		desc: "Home",
	},
	{
		pathname: "/how-it-works",
		desc: "How It Works",
	},
	{
		pathname: "/about-skin-cancer",
		desc: "About Skin Cancer",
	},
	{
		pathname: "/find-a-dermatologist",
		desc: "Find a Dermatolofist",
	},
];

function Navbar() {
	const location = useLocation();

	useEffect(() => {
		console.log(location);
	}, [location]);

	return (
		<div className="flex gap-5 h-16 w-full px-20 items-center bg-[#F5F5F5]">
			<div className="flex items-center">
				<i className="fas fa-dna text-indigo-600 text-2xl mr-2"></i>
				<span className="text-xl font-bold text-black">DermaScan</span>
			</div>
			<div className="w-full flex justify-baseline sm:ml-6 sm:flex sm:space-x-8">
				{paths.map((item, index) => (
					<Link
						key={index}
						to={item.pathname}
						className={
							"hover:text-black inline-flex items-center px-1 pt-1 font-medium text-sm "
						}
						style={{
							textDecoration: "none",
							color:
								location.pathname == item.pathname
									? "black"
									: "gray",
							textDecorationLine:
								location.pathname == item.pathname
									? "underline"
									: "none",
							textDecorationColor: "#8b5cf6",
							textDecorationThickness: 2,
							textUnderlineOffset: 5,
						}}
					>
						{item.desc}
					</Link>
				))}
			</div>
		</div>
	);
}

export default Navbar;
