import { Canvas } from "@react-three/fiber";
import { Wrapper } from "@googlemaps/react-wrapper";
import { ThreeJSOverlayView } from "@googlemaps/three";
import SceneProvider from "./SceneProvider";
import { Cube } from "./Cube";
import GoogleMap from "./GoogleMap";
import { useState } from "react";
import CustomCanvas from "./CustomCanvas";
import { PCFSoftShadowMap, SRGBColorSpace, WebGLRenderer } from "three";

const App = () => {
  const [threeJsOverlay, setThreeJsOverlay] = useState<
    ThreeJSOverlayView | undefined
  >();
  return (
    <div className="h-screen w-screen">
      <Wrapper apiKey={import.meta.env.VITE_MAP_KEY}>
        <div className="h-[99.8vh]">
          <GoogleMap setOverlay={setThreeJsOverlay} />
        </div>
        <div className="h-[0.2vh]">
          <Canvas
            gl={(canvas) => {
              console.log(canvas);
              const gl = canvas.getContext("webgl2");
              const renderer = new WebGLRenderer({
                canvas: canvas,
                context: gl ? gl : undefined,
                ...gl?.getContextAttributes(),
              });
              renderer.autoClear = false;
              renderer.autoClearDepth = false;
              renderer.shadowMap.enabled = true;
              renderer.shadowMap.type = PCFSoftShadowMap;
              renderer.outputColorSpace = SRGBColorSpace;

              const { width, height } = canvas;
              renderer.setViewport(0, 0, width, height);

              return renderer;
            }}
          >
            <SceneProvider overlay={threeJsOverlay} />

            <Cube overlay={threeJsOverlay} />
          </Canvas>
        </div>
        {/* <CustomCanvas>
          <SceneProvider overlay={threeJsOverlay} />
          <Cube overlay={threeJsOverlay} />
        </CustomCanvas> */}
      </Wrapper>
    </div>
  );
};
export default App;
