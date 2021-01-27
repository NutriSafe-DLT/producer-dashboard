import * as React from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import userManagementService from "../services/user-management-service";
import { useRouter } from "next/router";
interface CreateUserProps {
  existingUsernames: string[];
}

export const CreateUser = ({ existingUsernames }: CreateUserProps) => {
  const [newUser, setNewUser] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = React.useState("");
  const router = useRouter();

  const validateUsername = (username: string) => {
    if (existingUsernames.includes(username)) {
      setError("This username is already in use! Choose a different one");
    } else {
      setError("");
    }
  };

  const validatePasswordConfirm = (confirmPassword: string) => {
    if (newUser.password != confirmPassword) {
      setError("Please repeat the password to confirm!");
    } else {
      setError("");
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setError("Passwords must be at least 8 characters long");
    } else {
      setError("");
    }
  };

  const clearInputs = () => {
    setNewUser({
      ...newUser,
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const submitUser = () => {
    if (!error) {
      userManagementService
        .createUser(newUser.username, newUser.password)
        .then((res) => {
          clearInputs();
          router.push("/users", undefined, { shallow: false });
        });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Create new User
      </Typography>
      {error === "" ? <div /> : <Alert severity="error">{error}</Alert>}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        value={newUser.username}
        onChange={(e) => {
          setNewUser({ ...newUser, username: e.target.value });
          validateUsername(e.target.value);
        }}
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
        value={newUser.password}
        onChange={(e) => {
          setNewUser({ ...newUser, password: e.target.value });
          validatePassword(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="Confirm password"
        label="Confirm Password"
        type="password"
        id="Confirm_password"
        value={newUser.confirmPassword}
        onChange={(e) => {
          setNewUser({ ...newUser, confirmPassword: e.target.value });
          validatePasswordConfirm(e.target.value);
        }}
      />
      <Button color="primary" variant="contained" onClick={submitUser}>
        Create User
      </Button>
    </Container>
  );
};
