import React from "react";
import {
  Button as MuiButton,
  ButtonBaseProps,
  makeStyles,
  PropTypes,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export interface ButtonProps {
  text?: string;
  size?: "medium" | "large" | "small";
  color?: PropTypes.Color;
  variant?: "text" | "outlined" | "contained";
  onClick?: (event: React.UIEvent) => void;
}

export default function Button(props: ButtonProps & ButtonBaseProps) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}
