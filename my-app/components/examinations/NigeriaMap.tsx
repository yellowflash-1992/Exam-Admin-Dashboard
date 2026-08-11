"use client";

import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import type { ExaminationMapData } from "@/lib/types/ExaminationDashboard";

type NigeriaMapProps = {
  examination: string;
  mapData: ExaminationMapData;
};

export default function NigeriaMap({ examination, mapData }: NigeriaMapProps) {
  const [geoData, setGeoData] = useState<object | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading map:", err));
  }, []);

  if (!geoData) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center">
        <p className="text-sm opacity-50">Loading Nigeria map...</p>
      </div>
    );
  }

  const maxCandidates = Math.max(...mapData.map((city) => city.candidates), 1);

  return (
    <div className="h-full min-h-[400px] rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Geographic Overview
          </p>

          <h2 className="text-xl font-bold mt-1">{examination} Distribution</h2>

          <p className="text-sm text-slate-400 mt-1">
            Candidate and centre distribution across selected locations
          </p>
        </div>

        <div className="rounded-full bg-cyan-500/10 px-3 py-1">
          <span className="text-xs text-cyan-400">
            {mapData.length} locations
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-[430px]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1700,
            center: [9, 6],
          }}
          className="w-full h-full"
        >
          <ZoomableGroup center={[8.5, 9.2]} zoom={1.89}>
            <Geographies geography={geoData}>
              {({ geographies }: { geographies: any[] }) =>
                geographies
                  .filter((geo) => {
                    const name = geo.properties?.name || geo.properties?.NAME;

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
                        },
                        hover: {
                          fill: "#164E6F",
                          stroke: "#67E8F9",
                          strokeWidth: 2.5,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#164E6F",
                          outline: "none",
                        },
                      }}
                    />
                  ))
              }
            </Geographies>

            {mapData.map((city) => {
              const size = 5 + (city.candidates / maxCandidates) * 9;

              const isSelected = selectedCity === city.name;

              return (
                <Marker
                  key={city.name}
                  coordinates={city.coordinates}
                  onClick={() => setSelectedCity(isSelected ? null : city.name)}
                >
                  <g
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {/* Outer glow */}
                    <circle r={size} fill="#22D3EE" opacity={0.18} />

                    {/* Main marker */}
                    <circle
                      r={isSelected ? 6 : 4}
                      fill="#22D3EE"
                      stroke="#67E8F9"
                      strokeWidth={1.5}
                      className="animate-pulse"
                      style={{
                        animationDuration: "2s",
                      }}
                    />

                    {/* City name */}
                    <text
                      x={9}
                      y={3}
                      fill="#ffffff"
                      fontSize={9}
                      fontWeight="bold"
                      pointerEvents="none"
                      style={{
                        textShadow: "0 0 8px rgba(0,0,0,0.9)",
                      }}
                    >
                      {city.name}
                    </text>

                    {/* Information popup */}
                    {isSelected && (
                      <g pointerEvents="none">
                        {/* Popup background */}
                        <rect
                          x={10}
                          y={8}
                          width={145}
                          height={58}
                          rx={8}
                          fill="#020617"
                          stroke="#22D3EE"
                          strokeWidth={1}
                          opacity={0.96}
                        />

                        {/* Examination */}
                        <text
                          x={18}
                          y={22}
                          fill="#67E8F9"
                          fontSize={8}
                          fontWeight="bold"
                        >
                          {examination}
                        </text>

                        {/* Candidate count */}
                        <text
                          x={18}
                          y={38}
                          fill="#ffffff"
                          fontSize={9}
                          fontWeight="bold"
                        >
                          {city.candidates.toLocaleString()} candidates
                        </text>

                        {/* Centre count */}
                        <text x={18} y={52} fill="#94A3B8" fontSize={8}>
                          {city.centres.toLocaleString()} centres
                        </text>
                      </g>
                    )}
                  </g>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-slate-950/80 backdrop-blur-md px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Marker size
          </p>

          <p className="text-xs text-slate-300 mt-1">
            Larger = more candidates
          </p>
        </div>
      </div>
    </div>
  );
}
