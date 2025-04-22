import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { DocObj } from "../utility/fetch";
import DoctorCard from "./DoctorCard";

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

export type LocationLiteral = {
	lat: number;
	lng: number;
};

export interface MapProps {
	currentLocation: React.RefObject<LocationLiteral | null>;
	docResults: DocObj[];
}

export default function Map({ currentLocation, docResults }: MapProps) {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const map = useRef<maplibregl.Map | null>(null);

	const centerMap = () => {
		if (currentLocation.current && map.current) {
			map.current.flyTo({
				center: [
					currentLocation.current?.lng ?? 0,
					currentLocation.current?.lat ?? 0,
				],
				zoom: 15,
			});
		}
	};

	const handleClickOnCard = (index: number) => {
		const geoloc = docResults[index].location._geoloc;
		if (geoloc.lat !== -1 || geoloc.lng != -1) {
			if (map.current) {
				map.current.flyTo({
					center: [geoloc.lng, geoloc.lat],
					zoom: 15,
				});
			}
		}
	};

	const renderMap = () => {
		map.current?.remove();
		map.current = new maplibregl.Map({
			container: mapRef.current ?? "",
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAP_API_KEY}`,
			center: [
				currentLocation.current?.lng ?? 0,
				currentLocation.current?.lat ?? 0,
			],
			zoom: 15,
		});

		if (currentLocation.current) {
			new maplibregl.Marker()
				.setLngLat([
					currentLocation.current?.lng ?? 0,
					currentLocation.current?.lat ?? 0,
				])
				.addTo(map.current);
		}
	};

	useEffect(() => {
		if (!map.current) {
			if (!navigator.geolocation) {
				console.error("Geolocation isn't supported by your browser");
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					if (!currentLocation.current) {
						currentLocation.current = {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						};
						renderMap();
					}
				},
				(error) => {
					console.log(error.message);
					renderMap();
				}
			);
		}
	}, [mapRef]);

	useEffect(() => {
		if (!map.current) return;
		renderMap();
		if (docResults.length < 1) {
			return;
		}

		const coordinates = docResults.map((item) => item.location._geoloc);

		coordinates.forEach((item) => {
			if (map.current) {
				new maplibregl.Marker({ color: "#FF0000" })
					.setLngLat([item.lng, item.lat])
					.addTo(map.current);
			}
		});

		const bounds = coordinates.reduce((b, coord) => {
			return b.extend(coord);
		}, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));

		map.current.fitBounds(bounds, {
			padding: 50,
			maxZoom: 10,
		});
	}, [docResults]);

	return (
		<div className="relative overflow-clip">
			<div ref={mapRef} className="h-160"></div>
			<i
				className="border-black border-1 p-1.5 text-2xl font-bold hover:bg-white bg-white/70 rounded-xl shadow bi bi-crosshair absolute right-10 top-10"
				onClick={centerMap}
			></i>

			{docResults.length > 0 ? (
				<div className="flex flex-col gap-2 absolute left-5 top-5 max-w-110">
					<span className="text-black text-2xl font-medium">
						Found {docResults.length} Dermatologists
					</span>

					{docResults.map((item, index) => (
						<div
							key={index}
							onClick={() => handleClickOnCard(index)}
						>
							<DoctorCard doc={item}></DoctorCard>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
