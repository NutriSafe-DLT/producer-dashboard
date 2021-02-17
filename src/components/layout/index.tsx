import React, { useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import OutboxIcon from "@material-ui/icons/Mail";
import { useStyles, useTheme } from "./styles";
import CreateIcon from "@material-ui/icons/Create";
import userService from "../services/user-service";
import ConnectionStateIcon from "../base/controls/ConnectionStateIcon";
import axiosMetricsInstance from "../../prometheusAxios";
import Link from "next/link";
import Controls from "../base/controls/Controls";

export default function MainLayout(props) {
  const SECONDS_TO_WAIT_BETWEEN_STATUSCHECKS = 5;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [isHyperledgerAvailable, setIsHyperledgerAvailable] = React.useState(
    false
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //This is a continual check so it triggers every X seconds (see constant) while the app is running
  useEffect(() => {
    axiosMetricsInstance
      .get("/api/v1/query", { params: { query: "fabric_version" } })
      .then((response) => {
        setIsHyperledgerAvailable(true);
      })
      .catch((reason) => {
        if (reason.response && reason.response.status) {
          //usually 4XX or 5XX errors, but that only means that there is an issue with prometheus, not necessarily with fabric itself
          setIsHyperledgerAvailable(true);
        } else {
          console.log("Endpoint query failed with status: " + reason);
          setIsHyperledgerAvailable(false);
        }
      });

    const timeout = setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, SECONDS_TO_WAIT_BETWEEN_STATUSCHECKS * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <Typography variant="h6" noWrap>
              NutriSafe Producer Dashboard
            </Typography>
          </Link>
          <div className={classes.grow} />
          <ConnectionStateIcon
            isOffline={userService.isInOfflineMode() && !isHyperledgerAvailable}
          />
          {userService.isLoggedIn() ? (
            <Link href="/login" passHref>
              <Controls.Button
                text="Logout"
                onClick={() => userService.logout()}
              />
            </Link>
          ) : (
            <Link href="/login" passHref>
              <Controls.Button text="Login" />
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Goods" />
          </ListItem>
          <Link href="/add-goods" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </ListItem>
          </Link>
          <Link href="/products/inbox" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </Link>
          <Link href="/products/stock" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Stock" />
            </ListItem>
          </Link>
          <Link href="/products/outbox" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <OutboxIcon />
              </ListItemIcon>
              <ListItemText primary="Outbox" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Access Management" />
          </ListItem>
          <Link href="/users" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>
          <Link href="/whitelists" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Whitelists" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Meta Information" />
          </ListItem>
          <Link href="/meta-info" passHref>
            <ListItem button component="a">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Manage" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
