"use client";

import { mapStyles } from "@/lib/mapStyles";
import {
  GoogleMap,
  LoadScriptProps,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

interface MapProps {
  position: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  pinIcon?: string;
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  onMapLoad?: (map: google.maps.Map) => void;
  mapConfig?: google.maps.MapOptions;
  className?: string;
}

const containerStyle = {
  width: "100%",
  height: "100%",
  border: 0,
};

const googleMapsLibraries: LoadScriptProps["libraries"] = [
  "geometry",
  "geocoding",
];

export const Map = ({
  position,
  zoom = 15,
  onMapClick,
  onMapLoad,
  mapConfig = {},
  pinIcon = "map-pin.svg",
  className = "",
}: MapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const loaderOptions = {
    id: "google-map-script",
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "google-maps-key",
    libraries: googleMapsLibraries,
  };

  const { isLoaded } = useJsApiLoader(loaderOptions);

  useEffect(() => {
    if (map) map.panTo(position);
  }, [map, position]);

  if (!isLoaded) {
    return (
      <div className={`w-full h-full ${className}`}>
        <Skeleton className="flex h-full w-full items-center justify-center" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          keyboardShortcuts: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "cooperative",
          ...mapConfig,
        }}
        onLoad={(map) => {
          setMap(map);
          onMapLoad?.(map);
        }}
        onClick={onMapClick}
        zoom={zoom}
      >
        <MarkerF
          position={position}
          options={{
            icon: {
              url: `/images/icons/${pinIcon}`,
              scaledSize: new google.maps.Size(40, 64),
            },
          }}
        />
      </GoogleMap>
    </div>
  );
};
