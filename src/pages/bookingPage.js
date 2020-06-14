import React, { Fragment, useState, useEffect } from "react";
import { cBusFunction, loadCurrentBus } from "../store/hooks/useCurrentBus";
import useAlert from "../store/hooks/useAlert";
import { useHistory } from "react-router-dom";
const BookingPage = () => {
  const [bus, setBus] = useState({});
  const busId = localStorage.getItem("cBus");
  const jwt = localStorage.getItem("jwt");
  const [sSeats, setSSeat] = useState([]);
  const history = useHistory();
  const { setAlert, clearAlert, activeAlert } = useAlert();
  useEffect(() => {
    const loadCurrentBus = async () => {
      if (busId) {
        try {
          const response = await fetch(
            `https://q2qpt.sse.codesandbox.io/api/bus/${busId}`
          );
          const data = await response.json();
          console.log(data);
          setBus(data.bus);
        } catch (err) {
          console.error(err);
          history.push("/login");
        }
      }
    };
    loadCurrentBus();
  }, [sSeats, history, activeAlert, busId, bus]);

  const bookBus = () => {
    const data = {
      sSeats,
      busId
    };

    fetch("https://q2qpt.sse.codesandbox.io/api/bus/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: jwt
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          //console.log(data);
          setBus(data.data);
          setAlert({ message: "Happy Journey", type: "success" });
          setTimeout(clearAlert, 3000);
          history.push("/home");
        } else {
          alert(data.status);
        }
      });
  };

  const selectSeat = e => {
    const { id } = e.target;
    console.log(e.target);
    if (e.target.class === "fas fa-bus fa-5x notavailable") {
      alert("seat Booked");
    }
    if (sSeats.includes(id)) {
      const i = sSeats.indexOf(id);
      setSSeat(prevState => {
        prevState.splice(i, 1);
        return [...prevState];
      });
      e.target.style.color = "black";
    } else {
      e.target.style.color = "blue";
      e.target.style.background = "none";
      setSSeat(prevState => {
        return [...prevState, id];
      });
    }
  };
  return (
    <Fragment>
      <div className="box">
        <br />
        <div class="busTitle">
          <h2> Welcome to {bus.busName} travels</h2>
          <h4>Please select your Seat </h4>
        </div>

        <br />
        <br />
        {bus.busName &&
          bus.seats.map(seat => {
            return (
              <span
                onClick={
                  seat.available
                    ? selectSeat
                    : () => {
                        setAlert({
                          message: "Seat Already Booked",
                          type: "danger"
                        });
                        setTimeout(() => {
                          clearAlert();
                        }, 3000);
                      }
                }
              >
                <i
                  id={seat.sNumber}
                  class={`fas fa-bus fa-5x ${
                    seat.available ? "available" : "notavailable"
                  }`}
                />
              </span>
            );
          })}

        <br />
        <br />
        <br />
        {sSeats[0] && (
          <div className="bookBus">
            <h3> Selected Seats : {sSeats.map(seat => `${seat},`)} </h3>
            <button size="small" onClick={bookBus}>
              {" "}
              Book
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BookingPage;
