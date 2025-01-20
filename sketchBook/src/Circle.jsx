import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Circle({ isActive, onClick, color }) {
  const canvasRef = useCanvas();
  let startX, startY, radius;

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.strokeStyle = color; 
    }
  }, [color]);

  useEffect(() => {
    if (isActive) {
      const canvas = canvasRef.current;
      if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        console.error("Canvas not found or invalid!");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("2D context not available");
        return;
      }

      let drawing = false;

      const startDrawing = (event) => {
        drawing = true;
        const { offsetX, offsetY } = event.nativeEvent || event;
        startX = offsetX;
        startY = offsetY;
      };

      const drawCircle = (event) => {
        if (!drawing) return;

        
        const { offsetX, offsetY } = event.nativeEvent || event;

        
        radius = Math.sqrt(
          (offsetX - startX) ** 2 + (offsetY - startY) ** 2
        );
      };

      const stopDrawing = () => {
        drawing = false;

        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        }
      };

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", drawCircle);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", drawCircle);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseleave", stopDrawing);
      };
    }
  }, [isActive, canvasRef]);

  return (
    <div className={`tool ${isActive ? "active" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={faCircle} />
      <span>Circle</span>
    </div>
  );
}

export default Circle;
