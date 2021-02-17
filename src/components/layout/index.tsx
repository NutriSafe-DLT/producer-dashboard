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
import AuthService from "../services/user-service";
import { useRouter } from "next/router";
import { useStyles, useTheme } from "./styles";
import CreateIcon from "@material-ui/icons/Create";
import userService from "../services/user-service";
import ConnectionStateIcon from "../base/controls/ConnectionStateIcon";
import useCurrentMetrics from "../base/useCurrentMetrics";

export default function MainLayout(props) {
  const SECONDS_TO_WAIT_BETWEEN_STATUSCHECKS = 5;
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [isHyperledgerAvailable, setIsHyperledgerAvailable] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //This is a continual check so it triggers every X seconds (see constant) while the app is running
  useCurrentMetrics();

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
          <Typography
            variant="h6"
            noWrap
            onClick={() => router.push("/", undefined, { shallow: false })}
            style={{ cursor: "pointer" }}
          >
            NutriSafe Producer Dashboard
          </Typography>
          <div className={classes.grow} />
          <ConnectionStateIcon isOffline={userService.isInOfflineMode() && !isHyperledgerAvailable} />  
          {userService.isLoggedIn() ? (
            <Button
              color="inherit"
              href="/login"
              onClick={() => {
                AuthService.logout();
                router.push("/login", undefined, { shallow: false });
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/login">
              Login
            </Button>
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
          <ListItem
            button
            onClick={() => {
              router.push("/products/inbox", undefined, { shallow: false });
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push("/products/stock", undefined, { shallow: false });
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push("/products/outbox", undefined, { shallow: false });
            }}
          >
            <ListItemIcon>
              <OutboxIcon />
            </ListItemIcon>
            <ListItemText primary="Outbox" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Access Management" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push("/users", undefined, { shallow: false });
            }}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push("/whitelists", undefined, { shallow: false });
            }}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Whitelists" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Meta Information" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push("/meta-info", undefined, { shallow: false });
            }}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Manage" />
          </ListItem>
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
