"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet default icon issue with Next.js
const createCustomIcon = () =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: #E84923;
        border: 2px solid #0D0D0D;
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(232, 73, 35, 0.25);
        position: relative;
      ">
        <div style="
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 10px;
          background: #0D0D0D;
        "></div>
      </div>
    `,
    iconSize: [16, 28],
    iconAnchor: [8, 28],
    popupAnchor: [0, -30],
  });

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 14, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

interface MapViewProps {
  lat: number;
  lng: number;
  name: string;
  allPlaces?: { lat: number; lng: number; name: string }[];
}

export default function MapView({ lat, lng, name, allPlaces }: MapViewProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      style={{ width: "100%", height: "100%" }}
      zoomControl={true}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <FlyTo lat={lat} lng={lng} />

      {allPlaces ? (
        allPlaces.map((p) => (
          <Marker key={p.name} position={[p.lat, p.lng]} icon={createCustomIcon()}>
            <Popup>
              <span style={{ fontFamily: "serif", fontSize: "0.85rem" }}>{p.name}</span>
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={[lat, lng]} icon={createCustomIcon()}>
          <Popup>
            <span style={{ fontFamily: "serif", fontSize: "0.85rem" }}>{name}</span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}