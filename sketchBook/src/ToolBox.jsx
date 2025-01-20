import React, { useState } from "react";
import Pencil from "./Pencil";
import Marker from "./Marker";
import Eraser from "./Eraser";
import Brush from "./Brush";
import Circle from "./Circle";
import Rectangle from "./Rectangle";
import Arrow from "./Arrow";
import Text from "./Text";
import SaveBtn from "./SaveBtn";
import ClearBtn from "./ClearBtn";

import "./ToolBox.css";

const ToolBox = ({ setTool }) => {
  const [activeTool, setActiveTool] = useState(null);
  const [color, setColor] = useState("#000000");
  const [showShapes, setShowShapes] = useState(false);

  const handleToolClick = (toolName) => {
    setActiveTool(toolName);
    setTool(toolName); 
  };

  const handleColorChange = (event) => {
    setColor(event.target.value); 
  };

  const toggleShapesMenu = () => {
    setShowShapes((prevShowShapes) => !prevShowShapes); 
  };

  return (
    <div className="toolbox">
      <Pencil
        isActive={activeTool === "Pencil"}
        onClick={() => handleToolClick("Pencil")}
        color={color} 
      />
      <Brush
        isActive={activeTool === "Brush"}
        onClick={() => handleToolClick("Brush")}
        color={color} 
      />
      
      {/* Expandable Shapes Menu */}
      <div className="shapes-menu">
        <button className="expand-btn" onClick={toggleShapesMenu}>
          {showShapes ? "Hide Shapes" : "Show Shapes"}
        </button>
        {showShapes && (
          <div className="shapes-options">
            <Rectangle
              isActive={activeTool === "Rectangle"}
              onClick={() => handleToolClick("Rectangle")}
            />
            <Arrow
              isActive={activeTool === "Arrow"}
              onClick={() => handleToolClick("Arrow")}
            />
            <Circle
              isActive={activeTool === "Circle"}
              onClick={() => handleToolClick("Circle")}
            />
          </div>
        )}
      </div>

      <Eraser
        isActive={activeTool === "Eraser"}
        onClick={() => handleToolClick("Eraser")}
      />
      
      <Text
        isActive={activeTool === "Text"}
        onClick={() => handleToolClick("Text")}
      />

      <div className="color-picker">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          aria-label="Choose a color"
        />
      </div>

      <SaveBtn />
      <ClearBtn />
    </div>
  );
};

export default ToolBox;
