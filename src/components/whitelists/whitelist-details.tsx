import {
  Button,
  IconButton,
  TableContainer,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { AxiosResponse } from "axios";
import userManagementService from "../services/user-management-service";
import ConfirmDialog from "../goods/confirmation-dialog";
import AddFunctionToWhitelist from "./add-function-to-whitelist-dialog";

interface WhitelistDetailsProps {
  whitelistName: string;
  whitelistAPIFunctions: string[];
}

export const WhitelistDetails = ({
  whitelistName,
  whitelistAPIFunctions,
}: WhitelistDetailsProps) => {
  const [funcs, setFuncs] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addFunctionDialogOpen, setAddFunctionDialogOpen] = useState(false);

  useEffect(() => {
    setFuncs(whitelistAPIFunctions);
  }, []);

  function handleRemoveFuncFromWhitelist(
    func: string
  ): Promise<AxiosResponse<any>> {
    const promise = userManagementService.unlinkFunctionFromWhitelist({
      whitelistName: whitelistName,
      func,
    });
    promise.then(() => {
      const filteredList = funcs.filter((f) => f != func);
      setFuncs(filteredList);
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
        <Typography variant="h6">Functions:</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddFunctionDialogOpen(true)}
        >
          Add Function
        </Button>
        <AddFunctionToWhitelist
          open={addFunctionDialogOpen}
          handleClose={() => setAddFunctionDialogOpen(false)}
          handleSubmit={userManagementService.linkFunctionToWhitelist}
          whitelist={whitelistName}
          funcs={funcs}
        />
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Function</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funcs.map((func: string) => (
            <TableRow key={func}>
              <TableCell>{func}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
              <ConfirmDialog
                title={"Are your sure you want to remove " + func + "?"}
                handleClose={() => setDeleteDialogOpen(false)}
                handleSubmit={handleRemoveFuncFromWhitelist}
                open={deleteDialogOpen}
                param={func}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
