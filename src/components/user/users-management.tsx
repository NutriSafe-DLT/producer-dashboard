import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Delete, Info } from "@material-ui/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ConfirmDialog, { ConfirmDialogObj } from "../base/ConfirmDialog";
import Controls from "../base/controls/Controls";
import userManagementService from "../services/user-management-service";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = () => {
    userManagementService.getAllUsers().then((res) => {
      setUsers(res.data.usernames);
    });
  };

  function handleDeleteUser(username: string) {
    userManagementService.deleteUser(username).then(() => updateUsers());
  }

  return (
    <>
      <TableContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Users:</Typography>
          <Link href="/users/create" passHref>
            <Controls.Button text="Create User"></Controls.Button>
          </Link>
        </div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((username: string) => (
              <TableRow key={username}>
                <TableCell>{username}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to delete the user '${username}'?`,
                        subtitle: "This action is irreversible",
                        onConfirm: () => handleDeleteUser(username),
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Link href="/users/" passHref>
                    <IconButton color="primary">
                      <Info />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
    </>
  );
};

export default UserManagement;
