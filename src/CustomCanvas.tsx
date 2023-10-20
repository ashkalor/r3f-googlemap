import * as THREE from "three";
import { ReconcilerRoot, createRoot, events, extend } from "@react-three/fiber";
import { ReactNode, useEffect, useRef } from "react";
extend(THREE);

const CustomCanvas = ({ children }: { children: ReactNode }) => {
  const rootRef = useRef<ReconcilerRoot<HTMLCanvasElement> | null>();

  const createCustomCanvas = () => {
    const canvas = document.querySelector("canvas");
    if (!rootRef.current) {
      rootRef.current = canvas && createRoot(canvas);
    }
    const gl = canvas && canvas.getContext("webgl2");
    if (gl && rootRef.current) {
      rootRef.current.configure({
        events,
        gl: () => {
          const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            context: gl,
            ...gl.getContextAttributes(),
          });
          renderer.autoClear = false;
          renderer.autoClearDepth = false;
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.outputColorSpace = THREE.SRGBColorSpace;

          const { width, height } = canvas;
          renderer.setViewport(0, 0, width, height);
          renderer.resetState();
          return renderer;
        },
      });

      rootRef.current.render(children);
    } else {
      setTimeout(createCustomCanvas, 1000);
    }
  };

  useEffect(() => {
    createCustomCanvas();
  }, [children]);

  return null;
};
export default CustomCanvas;
