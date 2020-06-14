import React, { useState, Fragment, useEffect } from "react";
import useCurrentUser from "../store/hooks/useCurrentUser";
import { useHistory } from "react-router-dom";
import SimpleCard from "../components/BusCard";
import useAlert from "../store/hooks/useAlert";
const Home = () => {
  const jwt = localStorage.getItem("jwt");
  const [buses, setBuses] = useState([]);
  let [allBuses, setAllBuses] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [search, setSearch] = useState(false);
  const { loggedInUser, loggedInUserFunction, backendURL } = useCurrentUser();
  const { setAlert, clearAlert } = useAlert();
  const history = useHistory();
  if (!jwt) {
    history.push("/login");
  }

  const sourceChange = e => {
    const sSource = e.target.value;
    console.log(sSource);
    setSource(sSource);
  };

  const destinationChange = e => {
    const sDestination = e.target.value;
    console.log(sDestination);
    setDestination(sDestination);
  };
  useEffect(() => {
    console.log(buses);

    const fetchFunction = async () => {
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

        const busDataResponse = await fetch(
          `https://q2qpt.sse.codesandbox.io/api/bus`
        );
        const busData = await busDataResponse.json();
        setAllBuses(busData.buses);
        console.log(buses);
      } catch (e) {
        console.error(e);
        history.push("/login");
      }
    };
    fetchFunction();
  }, []);

  const searchFunction = () => {
    if (source === "" || destination === "") {
      setBuses([]);
      setAlert({
        message: "Enter both Source and Destination",
        type: "danger"
      });
      setTimeout(() => {
        clearAlert();
      }, 3000);
    } else if (source === destination) {
      setBuses([]);

      setAlert({
        message: "Source and Destination cannot be the same",
        type: "danger"
      });
      setTimeout(() => {
        clearAlert();
      }, 3000);
    } else {
      const filteredBuses = allBuses.filter(
        bus => bus.source === source && bus.destination === destination
      );
      console.log(filteredBuses);
      if (filteredBuses.length !== 0) {
        setBuses(filteredBuses);
        setSearch(true);
      } else {
        setBuses([]);
        setAlert({
          message: "sorry🙏 , we are yet to serve this Route",
          type: "failure"
        });
        setTimeout(() => {
          clearAlert();
        }, 3000);
      }
    }
  };

  return (
    <Fragment>
      <div className="searchArea">
        <img src="./HomeBG.jpg" alt="Travel" />
        <label htmlFor="cars">From</label>
        <select
          className="searchbox"
          name="source"
          id="source"
          value={source}
          onChange={sourceChange}
        >
          <option value="" selected />
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
          <option value="Coimbatore">Coimbatore</option>
        </select>

        <label htmlFor="destination">To</label>
        <select
          className="searchbox"
          name="destination"
          id="destination"
          value={destination}
          onChange={destinationChange}
        >
          <option value="" selected />
          <option value="Coimbatore">Coimbatore</option>
          <option value="Chennai">Chennai</option>
          <option value="Pune">Pune</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
        </select>
        <button onClick={searchFunction}> Search </button>
      </div>
      <div className="card">
        {buses.length > 0 &&
          buses.map(bus => {
            return (
              <div className="card">
                <SimpleCard bus={bus} />
                <br /> <br />
              </div>
            );
          })}
        {!buses[0] && search ? "No results" : "start travelling"}
      </div>

      <hr />

      {/* <h2> A list of all available buses </h2>
      <div className="card">
        {allBuses.length > 0 &&
          allBuses.map(bus => {
            return (
              <div className="card">
                <SimpleCard bus={bus} />
                <br /> <br />
              </div>
            );
          })}
      </div> */}
    </Fragment>
  );
};

export default Home;
