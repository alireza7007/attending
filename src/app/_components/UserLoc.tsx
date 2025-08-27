"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { useCompanyStore } from "../_store/companyStore";
import "leaflet/dist/leaflet.css";

export default function UserLoc() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const polygonRef = useRef<L.Polygon | null>(null);
  const polygonCoords = useCompanyStore((state) => state.polygonCoords);

  // divIcon برای marker دایره آبی
  const blueCircleIcon = L.divIcon({
    className: "",
    html: `<div style="
      width: 16px;
      height: 16px;
      background-color: #2196F3;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 2px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  // حرکت نرم marker
  const animateMarker = (marker: L.Marker, newLatLng: L.LatLngExpression, duration = 1000) => {
    const start = marker.getLatLng();
    const end = L.latLng(newLatLng);
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const lat = start.lat + (end.lat - start.lat) * progress;
      const lng = start.lng + (end.lng - start.lng) * progress;

      marker.setLatLng([lat, lng]);

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // ایجاد نقشه و marker اولیه
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current, {
      center: [35.6895, 51.3890],
      zoom: 16,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // marker دایره آبی
    markerRef.current = L.marker([35.6895, 51.3890], {
      icon: blueCircleIcon,
    }).addTo(mapInstanceRef.current);

    // لوکیشن زنده
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (markerRef.current && mapInstanceRef.current) {
            animateMarker(markerRef.current, [latitude, longitude], 1000);
            mapInstanceRef.current.panTo([latitude, longitude], { animate: true });
          }
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // آپدیت polygon وقتی coords تغییر میکنه
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (polygonRef.current) mapInstanceRef.current.removeLayer(polygonRef.current);

    if (polygonCoords.length > 0) {
      polygonRef.current = L.polygon(
        polygonCoords.map((p: { latitude: number; longitude: number }) => [p.latitude, p.longitude]),
        { color: "blue", fillColor: "#3b82f6", fillOpacity: 0.3 }
      ).addTo(mapInstanceRef.current);
    }
  }, [polygonCoords]);

  return <div ref={mapRef} className="w-full h-[600px] rounded-xl overflow-hidden shadow-md" />;
}
