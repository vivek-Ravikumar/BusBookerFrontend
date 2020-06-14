import React, { createContext, useState } from "react";

const currentBus = "";

export const currentBusContext = createContext(currentBus);

const { Provider } = currentBusContext;

const CurrentBusProvider = ({ children }) => {
  const [cBus, setCBus] = useState(currentBus);

  const cBusFunction = bus => {
    setCBus(bus);
  };

 
  return (
    <Provider
      value={{
        cBus,
        cBusFunction
      }}
    >
      {" "}
      {children}{" "}
    </Provider>
  );
};
export default CurrentBusProvider;
