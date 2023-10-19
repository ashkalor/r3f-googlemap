import { Canvas } from "@react-three/fiber";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ThreeJSOverlayView } from "@googlemaps/three";
import SceneProvider from "./SceneProvider";
import { Cube } from "./Cube";
import GoogleMap from "./GoogleMap";
import { useState } from "react";
const App = () => {
  const [threeJsOverlay, setThreeJsOverlay] = useState<
    ThreeJSOverlayView | undefined
  >();
  return (
    <div className="h-screen w-screen">
      <Wrapper apiKey={import.meta.env.VITE_MAP_KEY}>
        <GoogleMap setOverlay={setThreeJsOverlay} />
        <div className="h-0">
          <Canvas>
            <SceneProvider overlay={threeJsOverlay} />

            <Cube overlay={threeJsOverlay} />
          </Canvas>
        </div>
      </Wrapper>
    </div>
  );
};
export default App;
