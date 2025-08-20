"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Map } from "@/components/ui/map";
import { Property } from "@/lib/stores/reviewsStore";

interface LocationProps {
  property: Property;
}

export function Location({ property }: LocationProps) {
  const [zoom, setZoom] = useState(15);

  // Use property coordinates or fallback to Algiers
  const position = property?.coordinates || {
    lat: 36.7538,
    lng: 3.0588,
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 10));
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-[#284e4c]">Location</h3>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Google Maps Component */}
          <div className="w-full h-full relative">
            <Map
              position={position}
              zoom={zoom}
              className="rounded-lg"
              mapConfig={{
                zoomControl: false, // We'll add custom controls
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            />

            {/* Custom Map Controls */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                −
              </button>
            </div>

            {/* Location Info Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded text-xs text-gray-600 shadow-sm">
              <div className="font-medium">{property.location}</div>
              <div>{property.address}</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <a href="#" className="text-[#284e4c] hover:underline text-sm">
            Browse more serviced flats in{" "}
            <span className="underline">{property.location.split(',')[0]}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
