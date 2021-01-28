import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useForm<T>(
  initialFormValues: T,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState<T>(initialFormValues);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFormValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyles();
  const { children, handleSubmit, ...other } = props;
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
}
