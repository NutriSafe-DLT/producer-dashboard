import { makeStyles, Typography} from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent} from "@material-ui/core";
import React from "react";
import Controls from "../../base/controls/Controls";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
  },
  dialogTitle: {
      paddingRight: '0px'
  }
}));

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#f73378',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });


export default function Popup(props){

const {title, children, openPopup, setPopup} = props;
const classes = useStyles();

    return(
        <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                   <Typography variant="h4" component="div" style={{flexGrow:1}}>
                       {title}
                   </Typography>
                   <ThemeProvider theme={theme}>
                        <Controls.Button
                            text="X"
                            color="secondary"
                            onClick={() => setPopup(false)}>
                        </Controls.Button>
                    </ThemeProvider>
                </div>
            </DialogTitle>
            <DialogContent dividers>
             {children}
            </DialogContent>
        </Dialog>

    )


}