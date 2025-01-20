import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useCanvas } from "./CanvasContext";

function Text({ isActive, onClick }) {
  const canvasRef = useCanvas();
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleActivate = () => {
    if (!isActive) return;
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

    const handleClick = (event) => {
      const { offsetX, offsetY } = event.nativeEvent || event;
      setPosition({ x: offsetX, y: offsetY });
      setIsEditing(true);
    };

    const handleTextInputChange = (event) => {
      setText(event.target.value);
    };

    const handleTextSubmit = () => {
      if (text.trim() !== "") {
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(text, position.x, position.y);
        setText("");  
      }
      setIsEditing(false); 
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  };

  useEffect(() => {
    if (isActive) {
      handleActivate();
    }
  }, [isActive]);

  return (
    <div className={`tool ${isActive ? "active" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={faComment} />
      <span>Text</span>

      {isEditing && (
        <input
          type="text"
          value={text}
          onChange={handleTextInputChange}
          onBlur={handleTextSubmit}  
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleTextSubmit(); 
            }
          }}
          style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            zIndex: 10,
            fontSize: "20px",
          }}
        />
      )}
    </div>
  );
}

export default Text;
