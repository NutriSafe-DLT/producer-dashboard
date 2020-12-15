import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../goods/confirmation-dialog";
import userManagementService from "../services/user-management-service";
import AddWhitelistToUser from "./add-whitelist-to-user-dialog";

const UserDetailsCard = ({ userDetails }) => {
  const [removeWhitelistOpen, setRemoveWhitelistOpen] = React.useState(false);
  const [addWhitelistDialogOpen, setAddWhitelistDialogOpen] = React.useState(
    false
  );
  const [allWhiteLists, setAllWhitelists] = React.useState([]);

  React.useEffect(() => {
    userManagementService.getWhitelists().then((res) => {
      setAllWhitelists(Object.keys(res.data));
    });
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{userDetails.username}</Typography>
        <br />
        <Typography>Role: {userDetails.role}</Typography>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Whitelists:</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddWhitelistDialogOpen(true)}
          >
            Add Whitelist
          </Button>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetails.linkedToWhitelists.map((whitelist: string) => (
              <TableRow>
                <TableCell>{whitelist}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setRemoveWhitelistOpen(true)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <ConfirmDialog
                  open={removeWhitelistOpen}
                  title={
                    "Are you sure you want to remove " +
                    whitelist +
                    " from " +
                    userDetails.username +
                    "?"
                  }
                  handleClose={() => setRemoveWhitelistOpen(false)}
                  handleSubmit={userManagementService.unlinkUserFromWhitelist}
                  param={{ username: userDetails.username, whitelist }}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <Typography variant="h6">Allowed Functions:</Typography>
        <List>
          {userDetails.allowedFunctions.map((func: string) => (
            <ListItem>{func}</ListItem>
          ))}
        </List>
      </CardContent>
      <AddWhitelistToUser
        open={addWhitelistDialogOpen}
        handleClose={() => setAddWhitelistDialogOpen(false)}
        handleSubmit={userManagementService.linkUserToWhitelist}
        username={userDetails.username}
        userWhitelists={userDetails.linkedToWhitelists}
        allWhitelists={allWhiteLists}
      />
    </Card>
  );
};

export default UserDetailsCard;
