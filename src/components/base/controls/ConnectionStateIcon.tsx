import React from "react";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircle";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

export interface ConnectionStateProps {
    isOffline: boolean;
}
export default function ConnectionStateIcon(props: ConnectionStateProps) {
    const offlineTooltipText = "Currently working offline";
    const onlineTooltipText = "Currently working online";
    let tooltipText = props.isOffline ? offlineTooltipText : onlineTooltipText;
    return(      
        <Tooltip title={tooltipText}>
            <IconButton
              aria-label="API status"
              color="inherit"
            >
                {props.isOffline ? (
                    <CancelOutlinedIcon />
                 ) : (
                    <CheckCircleRoundedIcon />
                 )
                }
            </IconButton>
          </Tooltip>
    );
}