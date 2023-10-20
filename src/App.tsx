import { Wrapper } from "@googlemaps/react-wrapper";
import { ThreeJSOverlayView } from "@googlemaps/three";
import SceneProvider from "./SceneProvider";
import { Cube } from "./Cube";
import GoogleMap from "./GoogleMap";
import { useState } from "react";
import CustomCanvas from "./CustomCanvas";

const App = () => {
  const [threeJsOverlay, setThreeJsOverlay] = useState<
    ThreeJSOverlayView | undefined
  >();
  return (
    <div className="h-screen w-screen">
      <Wrapper apiKey={import.meta.env.VITE_MAP_KEY}>
        <GoogleMap setOverlay={setThreeJsOverlay} />
        <CustomCanvas>
          <SceneProvider overlay={threeJsOverlay} />
          <Cube overlay={threeJsOverlay} />
        </CustomCanvas>
      </Wrapper>
    </div>
  );
};
export default App;
