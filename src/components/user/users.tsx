import { Button, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Check, Clear, Delete, Info } from "@material-ui/icons";
import { AxiosResponse } from "axios";
import userManagementService from "../services/user-management-service";
import ConfirmDialog from "../goods/confirmation-dialog";
import { useRouter } from "next/router";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [deleteDialogUsername, setDeleteDialogUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    userManagementService.getAllUsers().then((res) => {
      setUsers(res.data.usernames);
    });
    return () => setUsers([]);
  }, [deleteDialogUsername]);

  return (
    <TableContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Users:</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            router.push("/users/create", undefined, { shallow: false })
          }
        >
          Create User
        </Button>
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
                  onClick={() => setDeleteDialogUsername(username)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() =>
                    router.push("/users/" + username, undefined, {
                      shallow: false,
                    })
                  }
                >
                  <Info />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        title={"Are your sure you want to delete " + deleteDialogUsername + "?"}
        handleClose={() => setDeleteDialogUsername("")}
        handleSubmit={userManagementService.deleteUser}
        open={deleteDialogUsername !== ""}
        param={deleteDialogUsername}
      />
    </TableContainer>
  );
};

export default UserList;
