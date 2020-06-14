import React, { useEffect } from "react";
import useCurrentUser from "../store/hooks/useCurrentUser";
import BusCard from "../components/BusCard";
import { useHistory } from "react-router-dom";
const jwt = localStorage.getItem("jwt");

const Profile = () => {
  const { loggedInUser, loggedInUserFunction } = useCurrentUser();
  const history = useHistory();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUserResponse = await fetch(
          `https://q2qpt.sse.codesandbox.io/api/user`,
          {
            headers: {
              "Content-Type": "application/JSON",
              Authorization: jwt
            }
          }
        );
        const currentUserData = await currentUserResponse.json();

        loggedInUserFunction(currentUserData.user);
        console.log(loggedInUser);
      } catch (err) {
        console.error(err);
        history.push("/home");
      }
    };

    loadUser();
  }, [loggedInUser, loggedInUserFunction]);

  return (
    <div>
      <h2> Hello {loggedInUser.name} ,Your Tickets </h2>
      {loggedInUser.tickets.map(ticket => {
        return (
          <div className="card">
            <BusCard bus={ticket.busId} seat={ticket.sSeats[0]} />
          </div>
        );
      })}
      <h2> have a happy journey! </h2>
    </div>
  );
};

export default Profile;
