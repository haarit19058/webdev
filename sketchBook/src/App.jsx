import React from 'react';
import './App.css';
import ToolBox from './ToolBox';
import Playground from './Playground';
import { CanvasProvider } from './CanvasContext';
import { useState } from 'react';

function App() {
  const [selectedTool, setSelectedTool] = useState(null); 

  const handleToolChange = (tool) => {
    setSelectedTool(tool);  
  };

  return (
    <CanvasProvider>
      <div className="app-container">
          <ToolBox onToolChange={handleToolChange} />
          <Playground selectedTool={selectedTool} />

      </div>
    </CanvasProvider>
  );
}

export default App;
