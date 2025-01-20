import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Marker({ isActive, onClick,color }) {
  const canvasRef = useCanvas();
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const handleActivate = () => {
    if (!isActive) return;

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

    
    const startDrawing = (event) => {
      setDrawing(true);
      const { offsetX, offsetY } = event.nativeEvent || event;
      setLastX(offsetX);
      setLastY(offsetY);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
    };

    
    const draw = (event) => {
      if (!drawing) return;

      const { offsetX, offsetY } = event.nativeEvent || event;
      ctx.lineWidth = 6;  
      ctx.lineCap = "round";  
      ctx.lineJoin = "round"; 
      ctx.strokeStyle = color;  

      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();

      setLastX(offsetX);
      setLastY(offsetY);
    };

    
    const stopDrawing = () => {
      setDrawing(false);
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
  };

  
  useEffect(() => {
    if (isActive) {
      handleActivate();
    }
  }, [isActive]);

  return (
    <div className={`tool ${isActive ? "active" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={faMarker} />
      <span>Marker</span>
    </div>
  );
}

export default Marker;
