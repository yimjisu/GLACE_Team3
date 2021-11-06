import React, { useRef, useEffect } from 'react'

const SeatLayout = props => {
    const canvasRef = useRef(null);

    const seatSize = 10;
    const seatInterval = 20;

    const drawSeat = (ctx, x, y) => {
        ctx.fillStyle = '#758BFF';
        ctx.fillRect(x, y, seatSize, seatSize);
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = 700;
        canvas.height = 700;
        for (var x = 0; x < 15; x ++) {
            for (var y = 0; y < 15; y++){
                drawSeat(context,
                    x*seatInterval + seatSize,
                    y*seatInterval + seatSize);
            }
        }
        
    }, [drawSeat]);

    return <canvas ref={canvasRef} {...props} />
}

export default SeatLayout;