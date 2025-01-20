import React, { useEffect, useRef } from "react";
import { useCanvas } from "./CanvasContext";

function Playground() {
    const canvasRef = useCanvas();
  
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        
        const dpr = window.devicePixelRatio || 1;

        
        const width = canvas.offsetWidth * dpr; 
        const height = canvas.offsetHeight * dpr;

        
        canvas.width = width;
        canvas.height = height;

        
        ctx.scale(dpr, dpr);

        
    }, [canvasRef]);

    return (
        <canvas
            ref={canvasRef}
            className="canvas"

            style={{ border: "1px solid black", backgroundColor: "#fff" }}
        />
    );
}

export default Playground;
