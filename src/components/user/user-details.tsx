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
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import ConfirmDialog, { ConfirmDialogObj } from "../base/ConfirmDialog";
import userManagementService from "../services/user-management-service";
import AddWhitelistToUserDialog from "./add-whitelist-to-user-dialog";

const UserDetailsCard = ({ userDetails }) => {
  const [addWhitelistDialogOpen, setAddWhitelistDialogOpen] = React.useState(
    false
  );
  const [allWhiteLists, setAllWhitelists] = React.useState([]);
  const [confirmDialog, setConfirmDialog] = React.useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  React.useEffect(() => {
    updateWhitelists();
  }, []);

  const updateWhitelists = () => {
    userManagementService.getWhitelists().then((res) => {
      setAllWhitelists(Object.keys(res.data));
    });
  };

  const handleUnlink = ({ username, whitelistName }) => {
    userManagementService
      .unlinkUserFromWhitelist({ username, whitelistName })
      .then(() => updateWhitelists());
  };

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
              <TableRow key={whitelist}>
                <TableCell>{whitelist}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to remove ${whitelist} from ${userDetails.username}?`,
                        subtitle: "",
                        onConfirm: () =>
                          handleUnlink({
                            username: userDetails.username,
                            whitelistName: whitelist,
                          }),
                      });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider />
        <Typography variant="h6">Allowed Functions:</Typography>
        <List>
          {userDetails.allowedFunctions.map((functionName: string) => (
            <ListItem>{functionName}</ListItem>
          ))}
        </List>
      </CardContent>
      <AddWhitelistToUserDialog
        open={addWhitelistDialogOpen}
        handleClose={() => setAddWhitelistDialogOpen(false)}
        handleSubmit={userManagementService.linkUserToWhitelist}
        username={userDetails.username}
        userWhitelists={userDetails.linkedToWhitelists}
        allWhitelists={allWhiteLists}
      />
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
    </Card>
  );
};

export default UserDetailsCard;
