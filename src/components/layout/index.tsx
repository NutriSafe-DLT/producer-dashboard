import React, { useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles, useTheme } from "./styles";
import userService from "../services/user-service";
import ConnectionStateIcon from "../base/controls/ConnectionStateIcon";
import useCurrentMetrics from "../base/useCurrentMetrics";
import Link from "next/link";
import Controls from "../base/controls/Controls";
import BurgerNavigation from "../base/BurgerNavigation";


export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //This is a continual check so it triggers every X seconds (see constant) while the app is running
  
  const isHyperledgerAvailable = useCurrentMetrics();
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
        <BurgerNavigation/>
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
