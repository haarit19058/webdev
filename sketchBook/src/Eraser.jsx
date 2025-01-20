import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Eraser({ isActive, onClick }) {
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
      let lastX, lastY;

      const startErasing = (event) => {
        drawing = true;
        const { offsetX, offsetY } = event.nativeEvent || event;
        lastX = offsetX;
        lastY = offsetY;
      };

      const erase = (event) => {
        if (!drawing) return;
        const { offsetX, offsetY } = event.nativeEvent || event;

        const eraseWidth = 20; // Width of the eraser
        const eraseHeight = 20; // Height of the eraser

        // Erase the part of the canvas that the eraser covers
        ctx.clearRect(offsetX - eraseWidth / 2, offsetY - eraseHeight / 2, eraseWidth, eraseHeight);

        lastX = offsetX;
        lastY = offsetY;
      };

      const stopErasing = () => {
        drawing = false;
        ctx.closePath();
      };

      canvas.addEventListener("mousedown", startErasing);
      canvas.addEventListener("mousemove", erase);
      canvas.addEventListener("mouseup", stopErasing);
      canvas.addEventListener("mouseleave", stopErasing);

      return () => {
        canvas.removeEventListener("mousedown", startErasing);
        canvas.removeEventListener("mousemove", erase);
        canvas.removeEventListener("mouseup", stopErasing);
        canvas.removeEventListener("mouseleave", stopErasing);
      };
    }
  }, [isActive, canvasRef]);

  return (
    <div
      className={`tool ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faEraser} />
      <span>Eraser</span>
    </div>
  );
}

export default Eraser;
