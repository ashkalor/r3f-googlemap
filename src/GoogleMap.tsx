import { useEffect, useRef, useState } from "react";
import { ThreeJSOverlayView } from "@googlemaps/three";
import { mapOptions } from "./constants";

const GoogleMap = ({
  setOverlay,
}: {
  setOverlay: React.Dispatch<
    React.SetStateAction<ThreeJSOverlayView | undefined>
  >;
}) => {
  const mapRef = useRef<HTMLDivElement>(null!);
  const [, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    const instance = new window.google.maps.Map(mapRef.current, mapOptions);
    const overlay = new ThreeJSOverlayView({
      anchor: mapOptions.center,
      upAxis: "Y",
      animationMode: "always",
    });
    overlay.setMap(instance);
    setOverlay((prevOverlay) => {
      if (prevOverlay) {
        return prevOverlay;
      }
      return overlay;
    });
    setMap(instance);
    return () => {
      setMap(undefined);
      setOverlay(undefined);
    };
  }, []);

  return <div ref={mapRef} id="map" className="h-screen" />;
};
export default GoogleMap;
