import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import routes from "../Routes/routes";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useCurrentUser from "../store/hooks/useCurrentUser";
import useAlert from "../store/hooks/useAlert";
const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  // const { isLoggedIn, loginFunction } = useLoginProvider();
  const { activeAlert, setAlert, clearAlert } = useAlert();

  const { loggedInUser, loggedInUserFunction, backendURL } = useCurrentUser();
  const classes = useStyles();
  const [action, setAction] = useState("log In");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPwd] = useState("");
  const [cPwd, setCPwd] = useState("");
  const history = useHistory();

  const enterEmail = event => setEmail(event.target.value);
  const enterPwd = event => setPwd(event.target.value);
  const enterCPwd = event => setCPwd(event.target.value);
  const enterName = event => setName(event.target.value);

  const signup = () => {
    setAction("sign Up");
  };

  const onSubmit = event => {
    event.preventDefault();

    if (email === "" || password === "") {
      setAlert({
        message: "please enter all required fields",
        type: "danger"
      });
      setTimeout(() => {
        clearAlert();
      }, 3000);
    } else {
      const userData = {
        name,
        email,
        password
      };
      if (action === "log In") {
        try {
          // console.log(userData);
          fetch(`${backendURL}user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/JSON"
            },
            body: JSON.stringify(userData)
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === "success") {
                setAlert({
                  message: "LogIn success",
                  type: "success"
                });
                localStorage.setItem("jwt", data.token);
                loggedInUserFunction(data.user);
                console.log(data.user);
                setTimeout(() => {
                  clearAlert();
                }, 2000);
                history.push(routes.home);
              } else {
                setAlert({ message: data.status, type: "danger" });
                setTimeout(() => {
                  clearAlert();
                }, 3000);
              }
            });
        } catch (e) {
          console.error(e);
          setAlert({ message: "something went wrong" });
          setTimeout(() => {
            clearAlert();
          }, 3000);
        }
      } else if (action === "sign Up") {
        if (name === "") {
          setAlert({ message: "please enter Name" });
          setTimeout(() => {
            clearAlert();
          }, 3000);
        } else if (password !== cPwd) {
          setAlert({ message: "passwords dont match" });
          setTimeout(() => {
            clearAlert();
          }, 3000);
        } else {
          try {
            // console.log(userData);
            fetch(`${backendURL}user/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/JSON"
              },
              body: JSON.stringify(userData)
            })
              .then(response => response.json())
              .then(data => {
                //console.log(data);
                if (data.status === "success") {
                  loggedInUserFunction(data.user);
                  setAlert({
                    message: "signup success",
                    type: "success"
                  });
                  setTimeout(() => {
                    clearAlert();
                  }, 3000);
                  history.push(routes.home);
                } else {
                  setAlert({
                    message: data.status,
                    type: "danger"
                  });
                  setTimeout(() => {
                    clearAlert();
                  }, 3000);
                }
              });
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  };

  return (
    <div className="loginPage">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {action.to}
          </Typography>
          <form className={classes.form}>
            {action === "sign Up" && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={enterName}
              />
            )}
            <TextField
              className="inputField"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={enterEmail}
            />
            <TextField
              className="inputField"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={enterPwd}
            />

            {action === "sign Up" && (
              <TextField
                className="inputField"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={cPwd}
                onChange={enterCPwd}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              {action}
            </Button>
            <Grid container>
              {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <Link onClick={signup} variant="body2">
                  {action === "log In" && "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
