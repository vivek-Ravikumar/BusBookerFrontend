import { useContext } from "react";
import { currentBusContext } from "../currentBusProvider";

const useCurrentBus = () => {
  return useContext(currentBusContext);
};

export default useCurrentBus;
