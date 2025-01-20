import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Pencil({ isActive, onClick,color }) {
  const canvasRef = useCanvas();
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
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // ctx.strokeStyle = color;

        ctx.quadraticCurveTo(lastX, lastY, (lastX + offsetX) / 2, (lastY + offsetY) / 2);
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
      <FontAwesomeIcon icon={faPencil} />
      <span>Pencil</span>
    </div>
  );
}

export default Pencil;
