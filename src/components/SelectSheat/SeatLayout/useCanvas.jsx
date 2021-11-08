import { useRef, useEffect } from 'react';
import {Point} from './point';
import {Seat} from './seat';

const useCanvas = ({draw, resize}) => {
  
  const canvasRef = useRef(null)
  
  let mousePos, curItem;

  function onDown(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    console.log(mousePos);
  }

  function onMove(e) {

  }

  function onUp(e) {

  }

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId;

    mousePos = new Point();
    curItem = null;

    let seats = [];
    const render = () => {
      frameCount++
      draw(context, frameCount)
      resize(canvas);
      animationFrameId = window.requestAnimationFrame(render);

      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return canvasRef
}

export default useCanvas