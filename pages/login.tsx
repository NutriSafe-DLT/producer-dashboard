import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../src/components/services/user-service";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginError: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "red",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
    errorLogin: false,
    loginSuccess: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    AuthService.login(loginState.username, loginState.password)
      .then(() => {
        setLoginState({
          ...loginState,
          username: "",
          password: "",
          errorLogin: false,
          loginSuccess: true,
        });
        router.push("/", undefined, { shallow: false });
      })
      .catch(() => {
        setLoginState({
          ...loginState,
          username: "",
          password: "",
          errorLogin: true,
          loginSuccess: false,
        });
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={loginState.username}
            onChange={(e) =>
              setLoginState({ ...loginState, username: e.target.value })
            }
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={loginState.password}
            onChange={(e) =>
              setLoginState({ ...loginState, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {loginState.errorLogin === true && (
          <Alert severity="error">Login failed - Try again.</Alert>
        )}
        {loginState.loginSuccess === true && (
          <Alert severity="success">Login success! Loading...</Alert>
        )}
      </div>
    </Container>
  );
}
