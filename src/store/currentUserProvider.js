import React, { createContext, useState } from "react";

const currentUser = {};

export const currentUserContext = createContext(currentUser);

const { Provider } = currentUserContext;

const CurrentUserProvider = ({ children }) => {


   const [loggedInUser, setLoggedinUser] = useState(currentUser);
  const backendURL = "https://q2qpt.sse.codesandbox.io/api/";
  const loggedInUserFunction = user => {
    setLoggedinUser(user);
  };

  return (
    <Provider
      value={{
        loggedInUser,
        loggedInUserFunction,
        backendURL
      }}
    >
      {" "}
      {children}{" "}
    </Provider>
  );
};
export default CurrentUserProvider;
