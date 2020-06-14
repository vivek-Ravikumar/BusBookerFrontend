import React, { Fragment } from "react";
import useAlert from "../store/hooks/useAlert";

const AlertComponent = () => {
  const { activeAlert } = useAlert();

  return (
    <Fragment>
      {activeAlert.length > 0 &&
        activeAlert.map(alert => {
          return (
            <div key={alert.id} className={`alert ${alert.type}`}>
              <i className="fas fa-info-circle" /> {alert.message}
            </div>
          );
        })}
    </Fragment>
  );
};

export default AlertComponent;
