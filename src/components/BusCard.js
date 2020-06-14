import React from "react";

import { useHistory, useLocation } from "react-router-dom";
import useCurrentBus from "../store/hooks/useCurrentBus";
import routes from "../Routes/routes";

export default function SimpleCard({ bus, seat = "" }) {
  const history = useHistory();
  const location = useLocation();
  const { cBus, cBusFunction } = useCurrentBus();
  const bookBus = e => {
    const { id } = e.target;
    //console.log(e.target);
    // console.log(e.target.id);

    cBusFunction(id);
    localStorage.setItem("cBus", id);
    history.push("/booking");
  };

  return (
    <div>
      <div className="container">
        <h2> {bus.busName} </h2>
        <h4>
          <b> source : {bus.source}</b>
        </h4>
        <h4>
          <b> Destination:{bus.destination}</b>
        </h4>
        <h4>
          <b> TIme:{bus.time}</b>
        </h4>
        {location.pathname === "/profile" ? (
          <h4>
            <b> Seat Number :{seat}</b>
          </h4>
        ) : (
          <button id={bus._id} size="small" onClick={bookBus}>
            {" "}
            Book
          </button>
        )}
      </div>
    </div>
  );
}
