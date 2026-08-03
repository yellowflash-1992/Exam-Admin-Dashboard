"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

export default function NigeriaMap() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading map:", err));
  }, []);

  const cities = [
    { name: "Lagos", coordinates: [3.3792, 6.5244], waec: 85000, jamb: 72000 },
    { name: "Abuja", coordinates: [7.4908, 9.0765], waec: 45000, jamb: 38000 },
    { name: "Kano", coordinates: [8.5919, 12.0022], waec: 65000, jamb: 58000 },
    { name: "Ibadan", coordinates: [3.9151, 7.3776], waec: 55000, jamb: 48000 },
    {
      name: "Port Harcourt",
      coordinates: [7.0498, 4.8156],
      waec: 40000,
      jamb: 35000,
    },
    {
      name: "Kaduna",
      coordinates: [7.4388, 10.5264],
      waec: 35000,
      jamb: 30000,
    },
    { name: "Enugu", coordinates: [7.4951, 6.4531], waec: 38000, jamb: 32000 },
    { name: "Jos", coordinates: [8.8921, 9.8965], waec: 30000, jamb: 28000 },
  ];

  if (!geoData) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#071028] rounded-2xl">
        <div className="text-center">
          <div className="border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xs">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden h-[420px]">
      {/* Map Area - No padding, fills completely */}
      <div className="relative bg-[#071028] h-[420px] overflow-hidden rounded-2xl max-w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1700,
            center: [9, 6.5],
          }}
          className="w-full h-full"
        >
          <ZoomableGroup center={[8.5, 9.2]} zoom={1.89}>
            <Geographies geography={geoData}>
              {({ geographies }: { geographies: any[] }) =>
                geographies
                  .filter((geo) => {
                    const name = geo.properties.name || geo.properties.NAME;
                    return name === "Nigeria";
                  })
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#123B5D"
                      stroke="#22D3EE"
                      strokeWidth={2}
                      style={{
                        default: {
                          fill: "#123B5D",
                          stroke: "#22D3EE",
                          strokeWidth: 2,
                          outline: "none",
                          transition: "all 250ms",
                        },
                        hover: {
                          fill: "#22D3EE",
                          stroke: "#fff",
                          strokeWidth: 3,
                          outline: "none",
                          cursor: "pointer",
                        },
                      }}
                    />
                  ))
              }
            </Geographies>

            {cities.map((city) => (
              <Marker key={city.name} coordinates={city.coordinates}>
                <g>
                  <circle
                    r={5}
                    fill="#22D3EE"
                    className="animate-pulse"
                    style={{ animationDuration: "2s" }}
                  />
                  <text
                    x={8}
                    y={4}
                    fill="#fff"
                    fontSize={9}
                    fontWeight="bold"
                    className="hidden md:block"
                    style={{ textShadow: "0 0 10px rgba(0,0,0,0.8)" }}
                  >
                    {city.name}
                  </text>
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
