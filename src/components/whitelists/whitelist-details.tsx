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
import { Delete } from "@material-ui/icons";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import ConfirmDialog, { ConfirmDialogObj } from "../base/ConfirmDialog";
import userManagementService from "../services/user-management-service";
import AddFunctionToWhitelist from "./add-function-to-whitelist-dialog";

interface WhitelistDetailsProps {
  whitelistName: string;
  whitelistAPIFunctions: string[];
}

export const WhitelistDetails = ({
  whitelistName,
  whitelistAPIFunctions,
}: WhitelistDetailsProps) => {
  const [functionNames, setFunctionNames] = useState<string[]>([]);
  const [addFunctionDialogOpen, setAddFunctionDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogObj>({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    setFunctionNames(whitelistAPIFunctions);
  }, []);

  function handleRemoveFunctionFromWhitelist(
    functionName: string
  ): Promise<AxiosResponse<any>> {
    const promise = userManagementService.unlinkFunctionFromWhitelist({
      whitelistName: whitelistName,
      functionName,
    });
    promise.then(() => {
      const filteredList = functionNames.filter((f) => f != functionName);
      setFunctionNames(filteredList);
    });
    return promise;
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
            {functionNames.map((functionName: string) => (
              <TableRow key={functionName}>
                <TableCell>{functionName}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Are your sure you want to remove ${functionName}?`,
                        subtitle: "",
                        onConfirm: () =>
                          handleRemoveFunctionFromWhitelist(functionName),
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
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
