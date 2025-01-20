import React from 'react';
import { useCanvas } from './CanvasContext';
import html2canvas from "html2canvas";

function SaveBtn() {
const canvasRef = useCanvas();
const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    html2canvas(canvas).then((canvasRendered) => {
      
      const imageUrl = canvasRendered.toDataURL("image/jpeg");

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "canvas-image.jpg";
    }).catch((error) => {
      console.error("Error capturing canvas:", error);
    });
  };

  return (
    <button class = "savebtn" onClick={handleSave}>Save as JPG</button>
  );
}

export default SaveBtn;
