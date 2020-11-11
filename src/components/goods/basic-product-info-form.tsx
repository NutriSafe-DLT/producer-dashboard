import * as React from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  FormGroup,
} from "@material-ui/core";

interface BasicPorductFormProps {
  productList: string[],
  unitList: string[],
  handleInputChange,
  handleProductChange,
  handleUnitChange,
}

const BasicPorductForm = ({
  productList,
  unitList,
  handleInputChange,
  handleProductChange,
  handleUnitChange,
}: BasicPorductFormProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Basisinformationen
      </Typography>
      <form>
        <TextField
          id="product"
          variant="outlined"
          margin="normal"
          fullWidth
          select
          label="Product"
          onChange={handleProductChange}
          required
        >
          {productList.map((option) => (
            <MenuItem key={option + "id"} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="id"
          label="ID"
          type="text"
          id="id"
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="pdc"
          label="Predeccessor"
          type="text"
          id="pdc"
          fullWidth
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormGroup row style={{ width: "100%" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="amount"
            label="Amount"
            type="number"
            id="amount"
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            style={{ flexGrow: 1 }}
          />
          <TextField
            id="unit"
            name="unit"
            variant="outlined"
            margin="normal"
            select
            label="Unit"
            onChange={handleUnitChange}
          >
            {unitList.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </FormGroup>
      </form>
    </Container>
  );
};

export default BasicPorductForm;
