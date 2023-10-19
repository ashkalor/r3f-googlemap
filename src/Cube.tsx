import { useFrame } from "@react-three/fiber";
import { ThreeJSOverlayView } from "@googlemaps/three";
import { useMemo, useRef } from "react";
import { Color, Vector3 } from "three";
import { mapOptions } from "./constants";

export const Cube = ({
  overlay,
}: {
  overlay: ThreeJSOverlayView | undefined;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const redColor = useMemo(() => new Color("red"), []);
  const position = new Vector3();
  useFrame(() => {
    if (overlay) {
      const boxPosition = overlay.latLngAltitudeToVector3(
        mapOptions.center,
        position
      );

      meshRef.current.position.copy(boxPosition);
    }
    meshRef.current.translateY(25);
    meshRef.current.rotation.y += 0.001;
  });
  return (
    <mesh onClick={() => console.log("Hello")} ref={meshRef}>
      <boxGeometry args={[10, 50, 10]} />
      <meshStandardMaterial ref={materialRef} color={redColor} />
    </mesh>
  );
};
