import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import useCurrentUser from "../store/hooks/useCurrentUser";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import routes from "../Routes/routes";
import HomeIcon from "@material-ui/icons/Home";

import { useHistory, useLocation } from "react-router-dom";

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [headerName, setHeaderName] = useState("LogOff");
  const { loggedInUser, loggedInUserFunction } = useCurrentUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLoggedIn(true);
    }
  }, [location]);
  const logOff = () => {
    //clear token
    loggedInUserFunction({});
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    history.push(routes.login);
    setHeaderName("");
    setIsLoggedIn(false);
  };
  const homeButton = () => {
    history.push(routes.home);
  };

  const myAccount = () => {
    history.push(routes.profile);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={homeButton}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <div>Travellers Space</div>
          </Typography>
          {isLoggedIn && (
            <Fragment>
              {" "}
              <AccountCircleIcon onClick={myAccount} />
              <Button color="inherit" onClick={logOff}>
                LogOff
              </Button>{" "}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
