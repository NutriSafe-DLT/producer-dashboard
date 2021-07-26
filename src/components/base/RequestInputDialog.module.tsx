import React from "react";

export interface RequestInputDialogProps {
    requestInputData: RequestInputObj;
    setInputData;
  }
  
  export interface RequestInputObj {
    title: string;
    subtitle: string;
    isOpen: boolean;
    companyName: string;
    onConfirm?: () => void;
  }