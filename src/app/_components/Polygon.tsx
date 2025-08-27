"use client";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useRouter } from 'next/navigation';
import { useCompanyStore } from "../_store/companyStore";

// مارکر اختصاصی (مثلا همون آبی معروف)
const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PolygonDrawMap = () => {
    const router = useRouter();
  const [coords, setCoords] = useState<LatLngExpression[]>([]);
  const setPolygonCoords = useCompanyStore((state) => state.setPolygonCoords);
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoords((prev) => [...prev, [lat, lng]]);
      },
    });
    return null;
  };

  const handleReset = () => setCoords([]);

  const handleNextStep = () => {
    if (coords.length >= 3) {
      // setPolygonCoords(coords);
     router.push('/information/time');
     console.log(coords);
     
    } else {
      alert("❌ حداقل ۳ نقطه لازم داری");
    }
  };

  return (
    <div className="relative w-full h-[80vh]"> {/* دقیقا ۷۵ درصد ارتفاع */}
      {/* نقشه */}
      <MapContainer
        center={[35.675, 51.35]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {/* پلی‌گون */}
        {coords.length > 0 && (
          <Polygon
            positions={coords}
            pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.4 }}
          />
        )}

        {/* مارکرها با آیکن سفارشی */}
        {coords.map((pos, i) => (
          <Marker
            key={i}
            position={pos}
            icon={customMarker}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const newPos = e.target.getLatLng();
                setCoords((prev) =>
                  prev.map((c, idx) => (idx === i ? [newPos.lat, newPos.lng] : c))
                );
              },
            }}
          />
        ))}
      </MapContainer>

      {/* دکمه ریست */}
      <button
        onClick={handleReset}
        className="absolute top-5 right-5 bg-white text-red-600 font-bold px-3 py-2 rounded-lg shadow z-[1000]"
      >
        ♻️ دوباره
      </button>

      {/* دکمه ادامه */}
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
