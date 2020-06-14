import React, { createContext, useState } from "react";

const alerts = [];

export const AlertContext = createContext(alerts);

const { Provider } = AlertContext;

const AlertProvider = ({ children }) => {
  const [activeAlert, setActiveAlert] = useState(alerts);

  const setAlert = alert => {
    setActiveAlert(prevValue => {
      return [...prevValue, alert];
    });
    // setTimeout(setActiveAlert([]), 3000);
  };

  const clearAlert = () => {
    setActiveAlert([]);
  };

  return (
    <Provider
      value={{
        activeAlert,
        setAlert,
        clearAlert
      }}
    >
      {" "}
      {children}{" "}
    </Provider>
  );
};

export default AlertProvider;
