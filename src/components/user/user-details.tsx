import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import * as React from "react";

const UserDetailsCard = ({ userDetails }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{userDetails.username}</Typography>
        <br />
        <Typography>Role: {userDetails.role}</Typography>
        <Divider />
        <Typography variant="h6">Whitelists:</Typography>
        <List>
          {userDetails.linkedToWhitelists.map((whitelist: string) => (
            <ListItem>{whitelist}</ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6">Allowed Functions:</Typography>
        <List>
          {userDetails.allowedFunctions.map((func: string) => (
            <ListItem>{func}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UserDetailsCard;
