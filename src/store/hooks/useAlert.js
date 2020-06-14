import { useContext } from "react";
import { AlertContext } from "../alertProvider";

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
