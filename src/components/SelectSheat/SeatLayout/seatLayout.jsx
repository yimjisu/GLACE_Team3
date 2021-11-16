import React, { useRef, useEffect } from 'react';
import Canvas from './canvas';

const SeatLayout = ({
    seats
}) => {
    const seatSize = 20;
    const seatInterval = 20;

    function drawSeat(ctx, frameCount) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width);
        
        var lengthY = seats.length;
        for (var y = 0; y < lengthY; y ++) {
            var lengthX = seats[y].length;
            for (var x = 0; x < lengthX; x++){
                if (seats[y][x] == 1){
                    ctx.fillStyle = "#000000";
                } else {
                    ctx.fillStyle = "#CCCCCC";
                }
                ctx.fillRect(
                    x*(seatSize + seatInterval),
                    y*(seatSize + seatInterval), 
                    seatSize, seatSize);
            }
        }
    }

    function resize(canvas) {
        const clientWidth = document.body.clientWidth*0.8;
        const clientHeight = 700; // Math.round(document.body.clientHeight*0.8);
        
        const width = Math.round(clientWidth * 0.7);
        const height = Math.round(clientHeight - 20);
        const offsetX = clientWidth - width;

        if (canvas.width !== width || canvas.height !== height) {
          const { devicePixelRatio:ratio=1 } = window;
          const context = canvas.getContext('2d');
          canvas.width = width*ratio;
          canvas.height = height*ratio;
          context.scale(ratio, ratio);
          return true
        }
    
        return false
    }

    return <Canvas 
        draw={drawSeat} resize={resize}/>
}

export default SeatLayout;