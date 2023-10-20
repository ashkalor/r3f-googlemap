import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { ThreeJSOverlayView } from "@googlemaps/three";

const SceneProvider = ({
  overlay,
}: {
  overlay: ThreeJSOverlayView | undefined;
}) => {
  const { scene } = useThree();
  useEffect(() => {
    if (overlay && scene) {
      overlay.scene.add(scene);
    }
    return () => {
      if (overlay && scene) {
        overlay.scene.remove(scene);
      }
    };
  }, [overlay, scene]);

  return null;
};
export default SceneProvider;
