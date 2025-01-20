import React from 'react';
import { useCanvas } from './CanvasContext';

function ClearBtn() {
    const canvasRef = useCanvas();
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context not available");
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <button onClick={handleClear} className="clearbtn">
      Clear
    </button>
  );
}

export default ClearBtn;
