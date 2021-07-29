import Controls from "../base/controls/Controls";
import Container from '@material-ui/core/Container';
import React, { useState } from "react";
import { Grid, makeStyles, TableBody, Typography } from "@material-ui/core";
import useTable from "../base/useTable";
import Calendar from "react-calendar";


const useStyles = makeStyles((theme) => ({
    Container: {
        paddingTop: "35px",
    },
    CalendarBox: {
        marginTop: "20px",
    border: "1px solid #9e9e9e",
    borderRadius: "5px",
    },
}))

interface ProductInfo {
    id: string;
    key: string;
    date: string;
    typeOfAction: string;
    details: string;
    alert: boolean;
  }


const TraceTransaction = () => {

const classes = useStyles();
const [productState, setProductState] = useState<ProductInfo[]>([]);
const [date, setDate] = useState(new Date());

const onChange = date => {
    setDate(date);
  }

const headCells = [
    { id: "productID", label: "Product ID"},
    { id: "date", label: "Date" },
    { id: "typeOfAction", label: "Type of action"},
    { id: "details", label: "Details"},
  ];

  const {
    TblContainer,
    TblHead,
    TblPagination,
  } = useTable(productState, headCells, ["id", "key", "typeOfAction", "date"],);

return(
    <>
    <Grid container spacing={2}>
        <Grid item xs={3}>
            <Typography component="h1" variant="h5" >Product ID</Typography>
            <Controls.Input/>
        </Grid>
        <Grid item xs={3}>
            <Container className={classes.Container}>
                <Controls.Button
                    text="Submit"
                    size="large"
                    onClick={()=>{}}/>
            </Container>
        </Grid>
        <Grid item xs={3}>
            <Typography component="h2" variant="h5" >Date time - Start</Typography>
            <Controls.Input value={date.toLocaleString()}/>
            <div className={classes.CalendarBox}>
                <Calendar onChange={onChange} value={date}/>
            </div>
        </Grid>    
        <Grid item xs={3}>
            <Typography component="h2" variant="h5" >Date time - End</Typography>
            <Controls.Input value={date.toLocaleString()}/>
            <div className={classes.CalendarBox}>
                <Calendar onChange={onChange} value={date}/>
            </div>
        </Grid>    
    </Grid>  
    <div>
    <TblContainer>
        <TblHead />
        <TableBody>
         
        </TableBody>
      </TblContainer>
      <TblPagination />
    </div>
    </>
)

}

export default TraceTransaction;