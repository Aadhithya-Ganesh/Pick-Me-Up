import { createContext } from "react";
import { useState } from "react";

export const ModeSwitchContext = createContext();

const ModeSwitchContextProvider = ({ children }) => {
  const [mode, setMode] = useState("R");

  return (
    <ModeSwitchContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeSwitchContext.Provider>
  );
};

export default ModeSwitchContextProvider;
