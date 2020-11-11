import * as React from "react";
import { TextField } from "@material-ui/core";

const MyTextField = ({ x, changeHandler, value }) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      id={x}
      label={x}
      name={x}
      InputLabelProps={{ shrink: true }}
      onChange={changeHandler}
      value={value}
      fullWidth
    />
  );
};

export default MyTextField;
