"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import { useCompanyStore } from "../_store/companyStore";

// تایپ PolygonPoint از استور
// type PolygonPoint = {
//   latitude: number;
//   longitude: number;
// };

// مارکر اختصاصی
const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PolygonDrawMap: React.FC = () => {
  const router = useRouter();
  const polygonCoords = useCompanyStore((state) => state.polygonCoords);
  const setPolygonCoords = useCompanyStore((state) => state.setPolygonCoords);

  // coords داخلی کامپوننت همیشه [number, number][]
  const [coords, setCoords] = useState<[number, number][]>(
    polygonCoords
      .map((p) => [p.latitude, p.longitude])
      .filter((c): c is [number, number] => c[0] != null && c[1] != null)
  );

  // sync با استور بعد از mount
  useEffect(() => {
    if (Array.isArray(polygonCoords) && polygonCoords.length > 0) {
      setCoords(
        polygonCoords
          .map((p) => [p.latitude, p.longitude])
          .filter((c): c is [number, number] => c[0] != null && c[1] != null)
      );
    }
  }, [polygonCoords]);

  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newCoords: [number, number][] = [...coords, [lat, lng]];
        setCoords(newCoords);
        setPolygonCoords(
          newCoords.map(([lat, lng]) => ({ latitude: lat, longitude: lng }))
        );
      },
    });
    return null;
  };

  const handleReset = () => {
    setCoords([]);
    setPolygonCoords([]);
  };

  const handleNextStep = () => {
    if (coords.length >= 3) {
      setPolygonCoords(coords.map(([lat, lng]) => ({ latitude: lat, longitude: lng })));
      router.push("/information/time");
    } else {
      alert("❌ حداقل ۳ نقطه لازم داری");
    }
  };

  const handleDragMarker = (i: number, e: L.DragEndEvent) => {
    const newPos = e.target.getLatLng();
    const updated: [number, number][] = coords.map((c, idx) =>
      idx === i ? [newPos.lat, newPos.lng] : c
    );
    setCoords(updated);
    setPolygonCoords(updated.map(([lat, lng]) => ({ latitude: lat, longitude: lng })));
  };

  // فقط coords معتبر برای Leaflet
  const validCoords = coords.filter(
    (c): c is [number, number] => Array.isArray(c) && c.length === 2 && c[0] != null && c[1] != null
  );

  return (
    <div className="relative w-full h-[80vh]">
      <MapContainer
        center={[35.675, 51.35]}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {validCoords.length > 0 && (
          <Polygon
            positions={validCoords}
            pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.4 }}
          />
        )}

        {validCoords.map((pos, i) => (
          <Marker
            key={i}
            position={pos}
            icon={customMarker}
            draggable
            eventHandlers={{ dragend: (e) => handleDragMarker(i, e) }}
          />
        ))}
      </MapContainer>

      <button
        onClick={handleReset}
        className="absolute top-5 right-5 bg-white text-red-600 font-bold px-3 py-2 rounded-lg shadow z-[1000]"
      >
        ♻️ دوباره
      </button>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-[1000]">
        <button
          onClick={handleNextStep}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow"
        >
          ➡️ ادامه به مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default PolygonDrawMap;
