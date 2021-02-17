import {
  Button,
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
import userManagementService from "../services/user-management-service";
import CreateWhitelistDialog from "./create-whitelist-dialog";

const WhitelistManagement = () => {
  const [whitelists, setWhitelists] = useState<string[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    updateItems();
  }, []);

  const updateItems = () => {
    userManagementService.getWhitelists().then((res) => {
      setWhitelists(Object.keys(res.data));
    });
  };

  const handleDeleteWhitelist = (whitlistName: string) => {
    userManagementService
      .deleteWhitelist(whitlistName)
      .then(() => updateItems());
  };

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
            {whitelists.map((whitelistName: string) => (
              <TableRow key={whitelistName}>
                <TableCell>{whitelistName}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to delete ${whitelistName}?`,
                        subtitle: "This action is irreversible",
                        onConfirm: () => handleDeleteWhitelist(whitelistName),
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Link href={`/whitelists/${whitelistName}`} passHref>
                    <IconButton color="primary">
                      <Info />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CreateWhitelistDialog
          open={createDialogOpen}
          handleClose={() => setCreateDialogOpen(false)}
          handleSubmit={userManagementService.createWhitelist}
          whitelists={whitelists}
        ></CreateWhitelistDialog>
      </TableContainer>
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
      />
    </>
  );
};

export default WhitelistManagement;
