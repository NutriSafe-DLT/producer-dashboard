import React from "react";
import {
  Button as MuiButton,
  ButtonBaseProps,
  CircularProgress,
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
  text: string;
  size?: "medium" | "large" | "small";
  color?: PropTypes.Color;
  variant?: "text" | "outlined" | "contained";
  onClick: () => Promise<any>;
}

export default function WaitingButton(props: ButtonProps & ButtonBaseProps) {
  const { text, size, color, variant, onClick, ...other } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={() => onClick().finally(() => setLoading(false))}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {loading ? <CircularProgress color="primary" size={20} /> : text}
    </MuiButton>
  );
}
