import { useRef, useEffect, useState } from 'react';
import {Point} from './point';
import {Seat} from './seat';

import seatData from './seats-kaist.json';

const useCanvas = () => {
  
  const canvasRef = useRef(null);
  
  let mousePos;
  const width = seatData.map.size.width;
  const height = seatData.map.size.height;
  const backgroundColor = seatData.map.background;
  
  let allSeats = [];
  var selectedSeats = [];
  
  let offsetY = 180;
  var offsetX;

function resize(canvas, ctx) {
    // const clientWidth = document.body.clientWidth*0.8;
    // const clientHeight = 700; // Math.round(document.body.clientHeight*0.8);
    
    // const width = Math.round(clientWidth * 0.7);
    // const height = Math.round(clientHeight - 20);
    // const offsetX = clientWidth - width;
    offsetY = canvas.offsetTop;
    offsetX = canvas.offsetLeft;

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio=1 } = window;
      const context = canvas.getContext('2d');
      canvas.width = width*ratio;
      canvas.height = height*ratio;
      context.scale(ratio, ratio);
      return true;
    }


    return false;
}

let scale = 1;

function animate(ctx) {

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.scale(scale, scale);
  for(let i=0; i<allSeats.length; i++) {
    allSeats[i].animate(ctx);
  }
}

  function onDown(e) {
    mousePos.x = e.clientX - offsetX;
    mousePos.y = e.clientY - offsetY;

    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].down(mousePos.clone());
    }
  }

  function onMove(e) {
    mousePos.x = e.clientX - offsetX;
    mousePos.y = e.clientY - offsetY;

    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].move(mousePos.clone());
    }
  }

  function onUp(e) {
    mousePos.x = e.clientX - offsetX;
    mousePos.y = e.clientY - offsetY;

    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].up(mousePos.clone());
    }
  }

  function onWheel(e) {
    const deltaPos = new Point(e.deltaX, e.deltaY);
    for(let i=0; i<allSeats.length; i++) {
      allSeats[i].zoom(deltaPos);
    }
  }

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    let animationFrameId;
    const seats = seatData.seats;
    for (var i=0; i<seats.length; i++){
        const rectangles = seats[i].rectangles
        for (var x = 0; x < rectangles.length; x++){
          let s = rectangles[x];
          let singleSeat = new Seat(s.lefttop, s.size, seats[i].color);
          allSeats.push(singleSeat);
        }
        
    }

    resize(canvas, context);

    mousePos = new Point();
    const render = () => {
      offsetX = canvas.offsetLeft;
      offsetY = canvas.offsetTop;
      animationFrameId = window.requestAnimationFrame(render);
      animate(context);
      
      canvas.addEventListener("resize", () => resize(canvas, context));

      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("wheel", onWheel);
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return canvasRef
}

export default useCanvas