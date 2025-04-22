import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { DocObj } from "../utility/fetch";

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

export type LocationLiteral = {
	lat: number;
	lng: number;
};

export interface MapProps {
	currentLocation: React.RefObject<LocationLiteral | null>;
	docLocs: DocObj[];
}

export default function Map({ currentLocation, docLocs }: MapProps) {
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
		if (!map.current || !docLocs) return
		renderMap();
		const coordinates = docLocs.map(item => item.location._geoloc)

		coordinates.forEach((item) => {
			if (map.current) {
				new maplibregl.Marker({ color: "#FF0000" })
					.setLngLat([
						item.lng,
						item.lat,
					])
					.addTo(map.current);
			}
		});

		const bounds = coordinates.reduce((b, coord) => {
			return b.extend(coord);
		}, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));

		map.current.fitBounds(bounds, {
			padding: 30,
			maxZoom: 10,
		});

	}, [docLocs]);

	return (
		<div className="relative">
			<div ref={mapRef} className="h-160"></div>
			<i
				className="border-black border-1 p-1.5 text-2xl font-bold hover:bg-white bg-white/70 rounded-xl shadow bi bi-crosshair absolute right-10 top-10"
				onClick={centerMap}
			></i>
		</div>
	);
}
