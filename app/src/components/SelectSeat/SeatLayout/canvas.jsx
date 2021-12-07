import React from "react";
import useCanvas from "./useCanvas";

const Canvas = (props) => {
  const canvasRef = useCanvas(props);

  return <canvas ref={canvasRef} styles={{}} />;
};

export default Canvas;
