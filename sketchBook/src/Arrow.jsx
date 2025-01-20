import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Arrow({ isActive, onClick, color }) {
  const canvasRef = useCanvas();

  useEffect(() => {
    if (isActive) {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Canvas not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      let startX, startY, endX, endY;

      const getMousePos = (e) => {
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      };

      const drawArrow = (startX, startY, endX, endY) => {
        const arrowLength = 20;
        const arrowWidth = Math.PI / 6;

        const angle = Math.atan2(endY - startY, endX - startX);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - arrowLength * Math.cos(angle - arrowWidth), endY - arrowLength * Math.sin(angle - arrowWidth));
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - arrowLength * Math.cos(angle + arrowWidth), endY - arrowLength * Math.sin(angle + arrowWidth));
        ctx.stroke();
      };

      const startDrawing = (e) => {
        const { x, y } = getMousePos(e);
        startX = x;
        startY = y;
      };

      const stopDrawing = (e) => {
        const { x, y } = getMousePos(e);
        endX = x;
        endY = y;
        drawArrow(startX, startY, endX, endY);
      };

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseleave", stopDrawing);
      };
    }
  }, [isActive, canvasRef, color]);

  return (
    <div className={`tool ${isActive ? "active" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowRight} />
      <span>Arrow</span>
    </div>
  );
}

export default Arrow;
