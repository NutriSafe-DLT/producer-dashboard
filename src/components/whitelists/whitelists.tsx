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

const WhitelistList = () => {
  const [whitelists, setWhitelists] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    userManagementService.getWhitelists().then((res) => {
      setWhitelists(Object.keys(res.data));
    });
    return () => setWhitelists([]);
  }, []);

  function handleDeleteWhitelist(
    whitelist: string
  ): Promise<AxiosResponse<any>> {
    const promise = userManagementService.deleteUser(whitelist);
    promise.then(() => {
      const filteredList = whitelists.filter((wl) => wl != whitelist);
      setWhitelists(filteredList);
    });
    return promise;
  }

  return (
    <TableContainer>
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
          onClick={() =>
            router.push("/whitelists/create", undefined, { shallow: false })
          }
        >
          Create Whitelist
        </Button>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Whitelist</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {whitelists.map((whitelist: string) => (
            <TableRow key={whitelist}>
              <TableCell>{whitelist}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() =>
                    router.push("/whitelists/" + whitelist, undefined, {
                      shallow: false,
                    })
                  }
                >
                  <Info />
                </IconButton>
              </TableCell>
              <ConfirmDialog
                title={"Are your sure you want to delete " + whitelist + "?"}
                handleClose={() => setDeleteDialogOpen(false)}
                handleSubmit={handleDeleteWhitelist}
                open={deleteDialogOpen}
                param={whitelist}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WhitelistList;
