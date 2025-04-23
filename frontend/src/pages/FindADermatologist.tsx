import React, { useEffect, useRef, useState } from "react";
import Map, { LocationLiteral } from "../components/Map";
import loading from "../assets/loading.svg"
import {
	handleHospitalQuery,
	HospitalSearchRequest,
	DocObj,
} from "../utility/fetch";
import DoctorCard from "../components/DoctorCard";

export default function FindADermatologist() {
	const currentLocation = useRef<LocationLiteral | null>(null);
	const [currentCenter, setCurrentCenter] = useState<LocationLiteral | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [filterTelehealth, setFilterTelehealth] = useState(false);
	const [filterAcceptNewPatient, setFilterNewPatient] = useState(false);
	const [filterAcceptCareCredit, setFilterAcceptCareCredit] = useState(false);
	const [query, setQuery] = useState("");
	const [docResults, setDocResults] = useState<DocObj[]>([]);
	const [renderedDocResults, setRenderedDocResults] = useState<DocObj[]>([]);

	const divRef = useRef<HTMLDivElement | null>(null);
	const searchButtonRef = useRef<HTMLDivElement | null>(null);

	const handleClickOnCard = (index: number) => {
		const geoloc = docResults[index].location._geoloc;
		if (geoloc.lat !== -1 || geoloc.lng != -1) {
			setCurrentCenter(geoloc);
		}
	};

	const handleSearchDoc = () => {
		const searchQuery: HospitalSearchRequest = {
			query: query,
			aroundLatLng: `${currentLocation.current?.lat ?? 0},${
				currentLocation.current?.lng ?? 0
			}`,
			getRankingInfo: true,
			aroundRadius: 10000,
			page: 0,
		};
		setIsLoading(true);
		handleHospitalQuery(
			searchQuery,
			(data) => {
				setDocResults(data);
				setIsLoading(false);
			},
			() => setIsLoading(false)
		);
	};

	const handleEnter = (e: React.KeyboardEvent) => {
		if (e.key == "Enter") {
			searchButtonRef.current?.click();
		}
	};

	useEffect(() => {
		let filtered: DocObj[] = [];
		if (docResults.length > 0) {
			filtered = docResults.filter((item) => {
				return (
					(!filterTelehealth || item.isUsingTelemedicine) &&
					(!filterAcceptCareCredit || item.acceptsCareCredit) &&
					(!filterAcceptNewPatient || item.isAcceptingNewPatients)
				);
			});
		}

		setRenderedDocResults(filtered);
	}, [
		docResults,
		filterAcceptCareCredit,
		filterAcceptNewPatient,
		filterTelehealth,
	]);

	return (
		<div
			className="flex flex-col items-baseline mx-10 lg:mx-20 md:mx-7 my-5 gap-4 "
			ref={divRef}
		>
			<span className="text-lg lg:text-4xl font-medium">
				Find a Dermatologist Near You
			</span>

			<div className="flex flex-col lg:flex-row gap-5 w-full items-start">
				{/* Side Search Bar */}
				<div className="w-full lg:w-200 flex flex-col gap-5">
					<div className="smooth-transition flex flex-col p-3 w-full rounded-md border-1 border-gray-400 shadow-sm gap-3 overflow-hidden">
						<div className="flex flex-col gap-2">
							<span className="font-medium text-sm">
								Search for Dermatologists
							</span>

							<div className="">
								<input
									onKeyDown={handleEnter}
									type="text"
									className="px-3 rounded-md border-1 border-gray-400/70 py-1 w-full"
									placeholder="Name, specialty, etc."
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								></input>
							</div>
						</div>

						<div
							className="transition-all duration-300 ease-in-out w-full py-1 rounded-md bg-indigo-500 flex items-center justify-center hover:bg-indigo-700 gap-3"
							onClick={handleSearchDoc}
							ref={searchButtonRef}
						>
							<span className="text-white ">Search</span>
							<i className="bi bi-search text-lg text-white"></i>
						</div>

						<div className="flex flex-col gap-2 border-t-1 border-gray-400 pt-3">
							<span className="font-medium text-sm">
								Filter Results
							</span>

							<div className="flex gap-3">
								<input
									type="checkbox"
									id="telehealth"
									className="accent-indigo-400"
									onChange={(e) =>
										setFilterTelehealth(e.target.checked)
									}
									checked={filterTelehealth}
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
									checked={filterAcceptNewPatient}
									onChange={(e) =>
										setFilterNewPatient(e.target.checked)
									}
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
									checked={filterAcceptCareCredit}
									onChange={(e) =>
										setFilterAcceptCareCredit(
											e.target.checked
										)
									}
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

					{isLoading ? (
						<div className="flex flex-col items-center text-center">
						<img src={loading} className="w-fit" />
						<span className="text-lg text-gray-400">Searching...</span>
					</div>
					) : renderedDocResults.length > 0 ? (
						<div className="flex flex-col gap-2 w-full overflow-y-auto">
							<span className="text-black text-2xl font-medium">
								Found {docResults.length} Dermatologists
							</span>

							{renderedDocResults.map((item, index) => (
								<div
									key={index}
									onClick={() => handleClickOnCard(index)}
									className="h-full"
								>
									<DoctorCard doc={item}></DoctorCard>
								</div>
							))}
						</div>
					) : null}
				</div>

				<div
					className={`w-full h-full rounded-md border-1 border-gray-400 shadow-sm static lg:sticky lg:top-10`}
				>
					<Map
						currentLocation={currentLocation}
						docResults={renderedDocResults}
						center={currentCenter}
					/>
				</div>
			</div>
		</div>
	);
}
