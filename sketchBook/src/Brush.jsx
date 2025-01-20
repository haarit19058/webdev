import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Brush({ isActive, onClick,color }) {
  const canvasRef = useCanvas();

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
      let lastX = 0;
      let lastY = 0;

      const startDrawing = (event) => {
        drawing = true;
        const { offsetX, offsetY } = event.nativeEvent || event;
        lastX = offsetX;
        lastY = offsetY;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
      };

      const draw = (event) => {
        if (!drawing) return;
        const { offsetX, offsetY } = event.nativeEvent || event;
        ctx.lineWidth = 5; 
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color; 

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
        lastX = offsetX;
        lastY = offsetY;
      };

      const stopDrawing = () => {
        drawing = false;
        ctx.closePath();
      };

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseleave", stopDrawing);
      };
    }
  }, [isActive, canvasRef]);

  return (
    <div
      className={`tool ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPaintBrush} />
      <span>Brush</span>
    </div>
  );
}

export default Brush;
