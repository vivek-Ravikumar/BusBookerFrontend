import { useContext } from "react";
import { currentUserContext } from "../currentUserProvider";

const useCurrentUser = () => {
  return useContext(currentUserContext);
};

export default useCurrentUser;
