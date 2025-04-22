import React, { useRef, useState } from "react";
import Map, { LocationLiteral } from "../components/Map";
import { handleHospitalQuery, HospitalSearchRequest } from "../utility/fetch";

export default function FindADermatologist() {
	const currentLocation = useRef<LocationLiteral | null>(null);

	const [showSearchBar, setShowSearchBar] = useState(true);
	const [query, setQuery] = useState("");

	const divRef = useRef<HTMLDivElement | null>(null);
	const searchButtonRef = useRef<HTMLDivElement | null>(null);

	const handleSearchDoc = () => {
		const searchQuery: HospitalSearchRequest = {
			query: query,
			aroundLatLng: `${currentLocation.current?.lat ?? 0},${
				currentLocation.current?.lng ?? 0
			}`,
			getRankingInfo: true,
			aroundRadius: 1000000,
			page: 0,
		};

		handleHospitalQuery(searchQuery, () => {});
	};

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key == "Enter") {
			searchButtonRef.current?.click();
		}
	};

	return (
		<div
			className="flex flex-col items-baseline mx-20 mt-5 mb-2 gap-4 min-h-full"
			ref={divRef}
		>
			<span className="text-lg lg:text-4xl font-medium">
				Find a Dermatologist Near You
			</span>

			<div className="flex flex-col lg:flex-row gap-5 w-full items-start">
				{/* Side Search Bar */}
				<div
					className={`smooth-transition relative ${
						showSearchBar ? "w-full lg:w-120" : "w-0"
					}`}
				>
					<i
						className={`hidden lg:inline bi bi-chevron-double-${
							showSearchBar ? "left" : "right"
						} absolute -right-2 font-medium text-lg border-1 rounded-md border-gray-400 text-gray-400 bg-white top-1/2 translate-y-1/2 hover:text-black hover:border-black`}
						onClick={() => {
							setShowSearchBar(!showSearchBar);
						}}
					></i>

					<div
						className={`smooth-transition flex flex-col p-3 w-full rounded-md border-1 border-gray-400 shadow-sm gap-3 overflow-hidden ${
							showSearchBar ? "opacity-100" : "opacity-0"
						}`}
					>
						{/* <div className="flex flex-col gap-1">
							<span className="font-medium text-sm">
								Location
							</span>

							<div className="relative">
								<i className="absolute top-1/2 -translate-y-1/2 left-3 bi bi-geo-alt text-xl text-gray-400"></i>
								<input
									type="text"
									className="pl-10 rounded-md border-1 border-gray-400/70 py-1 pr-3 w-full"
									placeholder="Enter your location"
									onKeyDown={handleEnter}
								></input>
							</div>
						</div> */}

						<div className="flex flex-col gap-2">
							<span className="font-medium text-sm">
								Search for Dermatologists
							</span>

							<div className="relative">
								<i className="absolute top-1/2 -translate-y-1/2 left-3 bi bi-search text-lg text-gray-400"></i>
								<input
									onKeyDown={handleEnter}
									type="text"
									className="pl-10 rounded-md border-1 border-gray-400/70 py-1 pr-3 w-full"
									placeholder="Name, specialty, etc."
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								></input>
							</div>
						</div>

						<div
							className="transition-all duration-300 ease-in-out w-full py-1 rounded-md bg-indigo-500 text-white flex items-center justify-center text-lg hover:bg-indigo-700"
							onClick={handleSearchDoc}
							ref={searchButtonRef}
						>
							Search
						</div>

						<div className="flex flex-col gap-2 border-t-1 border-gray-400 pt-3">
							<span className="font-medium">Filter Results</span>

							<div className="flex gap-3">
								<input
									type="checkbox"
									id="telehealth"
									className="accent-indigo-400"
								/>
								<label htmlFor="telehealth" className="text-sm">
									Telemedicine available
								</label>
							</div>

							<div className="flex gap-3">
								<input
									type="checkbox"
									id="newPatient"
									className="accent-indigo-400"
								/>
								<label htmlFor="newPatient" className="text-sm">
									Accepting new patients
								</label>
							</div>

							<div className="flex gap-3">
								<input
									type="checkbox"
									id="acceptCareCredit"
									className="accent-indigo-400"
								/>
								<label
									htmlFor="acceptCareCredit"
									className="text-sm"
								>
									Accepts care credit
								</label>
							</div>
						</div>
					</div>
				</div>

				<div
					className={`w-full h-full rounded-md border-1 border-gray-400 shadow-sm`}
				>
					<Map currentLocation={currentLocation} docLocs={[]} />
				</div>
			</div>
		</div>
	);
}
