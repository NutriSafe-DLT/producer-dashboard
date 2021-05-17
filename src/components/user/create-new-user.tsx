import { Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import * as React from "react";
import Controls from "../base/controls/Controls";
import { Form, useForm } from "../base/useForm";
import userManagementService from "../services/user-management-service";
interface CreateUserProps {
  existingUsernames: string[];
}

interface NewUser {
  username: string;
  password: string;
  confirmPassword: string;
}

const initialValues: NewUser = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const CreateUser = ({ existingUsernames }: CreateUserProps) => {
  const router = useRouter();
  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    if ("username" in fieldValues) {
      if (fieldValues.username === "")
        tempErrors.username = "This field is required.";
      //Using map to get exact check because Array.includes does NOT check for exact matches but uses beginswith-logic
      var matchArray = existingUsernames.map((item) => {
        return item === fieldValues.username;
      });
      if (matchArray.includes(true)) {
        tempErrors.username =
          "This username is already in use. Choose a different one";
        } else {
          tempErrors.username = "";
        }
    }
    if ("password" in fieldValues) {
      if (fieldValues.password === "")
        tempErrors.password = "This field is required.";
      // if doesnt match password guidelines, error
    }
    if ("confirmPassword" in fieldValues) {
      if (fieldValues.confirmPassword !== values.password) {
        tempErrors.confirmPassword = "Please repeat the password correctly";
      } else {
        tempErrors.confirmPassword = "";
      }
    }
    setErrors({
      ...tempErrors,
    });
    return Object.values(tempErrors).every((x) => x == "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );

  const submitUser = () => {
    if (!errors) {
      userManagementService
        .createUser(values.username, values.password)
        .then((res) => {
          resetForm();
          router.push("/users", undefined, { shallow: false });
        });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">
        Create new User
      </Typography>
      <Form onSubmit={submitUser}>
        <Controls.Input
          name="username"
          label="Username"
          value={values.username}
          onChange={handleInputChange}
          error={errors.username}
        />
        <Controls.Input
          name="password"
          label="Password"
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <Controls.Input
          name="confirmPassword"
          label="Confirm password"
          value={values.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
        />
        <Controls.Button type="submit" text="Create User" />
      </Form>
    </Container>
  );
};
