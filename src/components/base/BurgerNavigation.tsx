import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import OutboxIcon from "@material-ui/icons/Mail";
import Link from "next/link";
import Divider from "@material-ui/core/Divider";
import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";

export default function BurgerNavigation(props) {

return(
    <>
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
        </List></>);
        }