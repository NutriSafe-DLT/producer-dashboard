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
import CreateWhitelistDialog from "./create-whitelist-dialog";

const WhitelistList = () => {
  const [whitelists, setWhitelists] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    userManagementService.getWhitelists().then((res) => {
      setWhitelists(Object.keys(res.data));
    });
    return () => setWhitelists([]);
  }, [deleteDialogOpen, createDialogOpen]);

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
          onClick={() => setCreateDialogOpen(true)}
        >
          Create Whitelist
        </Button>
        <CreateWhitelistDialog
          open={createDialogOpen}
          handleClose={() => setCreateDialogOpen(false)}
          handleSubmit={userManagementService.createWhitelist}
          whitelists={whitelists}
        />
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
                  onClick={() => setDeleteDialogOpen(whitelist)}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        title={"Are your sure you want to delete this whitelist?"}
        handleClose={() => setDeleteDialogOpen("")}
        handleSubmit={userManagementService.deleteWhitelist}
        open={deleteDialogOpen !== ""}
        param={deleteDialogOpen}
      />
    </TableContainer>
  );
};

export default WhitelistList;
