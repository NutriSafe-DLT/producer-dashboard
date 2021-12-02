import React from "react";

export interface ConfirmDialogProps {
    confirmDialog: ConfirmDialogObj;
    setConfirmDialog;
  }
  
  export interface ConfirmDialogObj {
    title: string;
    subtitle: string;
    isOpen: boolean;
    onConfirm?: () => void;
  }