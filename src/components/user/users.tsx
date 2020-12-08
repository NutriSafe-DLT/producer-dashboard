import { Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import productService from "../services/product-service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Check, Clear, Delete } from "@material-ui/icons";
import { AxiosResponse } from "axios";
import userManagementService from "../services/user-management-service";
import ConfirmDialog from "../goods/confirmation-dialog";

interface UsersResponse {
  usernames: string[];
}

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    userManagementService.getAllUsers().then((res) => {
      setUsers(res.data.usernames);
    });
    return () => setUsers([]);
  }, []);

  function handleDeleteUser(username: string): Promise<AxiosResponse<any>> {
    const promise = userManagementService.deleteUser(username);
    promise.then(() => {
      const filteredList = users.filter((user) => user != username);
      setUsers(filteredList);
    });
    return promise;
  }

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((username: string) => (
            <TableRow key={username}>
              <TableCell>{username}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <ConfirmDialog
                title={"Are your sure you want to delete " + username + "?"}
                handleClose={() => setDeleteDialogOpen(false)}
                handleSubmit={handleDeleteUser}
                open={deleteDialogOpen}
                productId={username}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
