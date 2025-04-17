import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="flex gap-5 h-16 w-full px-8 sm:px-6 lg:px-8 items-center bg-[#F5F5F5]">
            <div className="flex items-center">
                <i className="fas fa-dna text-black  text-2xl mr-2"></i>
                <span className="text-xl font-bold text-black">
                    DermaDetect
                </span>
            </div>
            <div className="w-full flex justify-baseline gap-5 sm:ml-6 sm:flex sm:space-x-8">
                <Link
                    to="/"
                    className="text-black hover:text-black inline-flex items-center px-1 pt-1 font-medium"
                >
                    Home
                </Link>
                <Link
                    to="/how-it-works"
                    className="text-[#4A154B] hover:text-[#4A154B] inline-flex items-center px-1 pt-1 font-medium"
                >
                    How It Works
                </Link>
                <Link
                    to="/about-skin-cancer"
                    className="text-[#4A154B] hover:text-[#4A154B] inline-flex items-center px-1 pt-1 font-medium"
                >
                    About Skin Cancer
                </Link>
                <Link
                    to="/find-a-dermatologist"
                    className="text-[#4A154B] hover:text-[#4A154B] inline-flex items-center px-1 pt-1 font-medium"
                >
                    Find a Dermatologist
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
