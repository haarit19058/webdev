import React, { createContext, useContext, useRef } from "react";

const CanvasContext = createContext(null);

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    return (
        <CanvasContext.Provider value={canvasRef}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvas = () => useContext(CanvasContext);
