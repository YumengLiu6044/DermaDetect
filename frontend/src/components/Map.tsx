import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY

export type LocationLiteral = {
	lat: number;
	lng: number;
};

export interface MapProps {
  center: LocationLiteral | null
}

export default function Map({center}: MapProps) {
	const mapRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const map = new maplibregl.Map({
			container: mapRef.current ?? "",
			style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAP_API_KEY}`,
			center: [center?.lng ?? 0, center?.lat ?? 0],
			zoom: 15,
		});

    return () => map.remove()
	}, [mapRef, center]);
	return <div ref={mapRef} className="relative h-160"></div>;
}
