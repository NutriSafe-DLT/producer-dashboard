import { List, ListItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Clear } from "@material-ui/icons";
import React, { useEffect } from "react";
import Controls from "../base/controls/Controls";
import { Option } from "../base/controls/Option";

export interface AddProductDefProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: Function;
  attributes: string[];
}

export default function AddProductDefDialog({
  open,
  handleClose,
  handleSubmit,
  attributes,
}: AddProductDefProps) {
  const [productName, setProductName] = React.useState("");
  const [selectedAttributes, setSelectedAttributes] = React.useState([]);
  const [attributeOptions, setAttributeOptions] = React.useState<Option[]>([]);

  useEffect(() => {
    // on change of selected attributes, update attribute options
    const options: Option[] = [];
    attributes
      .filter((attr) => !selectedAttributes.includes(attr))
      .map((option) => {
        options.push({ id: option, title: option });
      });
    setAttributeOptions(options);
  }, [selectedAttributes]);

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Create new Product Definition</DialogTitle>
      <DialogContent>
        <Controls.Input
          name="name"
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {selectedAttributes.map((attribute) => {
          return (
            <List>
              <ListItem>
                {attribute}
                <Controls.Button
                  color="secondary"
                  onClick={() =>
                    setSelectedAttributes([
                      ...selectedAttributes.filter((attr) => attr != attribute),
                    ])
                  }
                >
                  <Clear />
                </Controls.Button>
              </ListItem>
            </List>
          );
        })}
        <Controls.Select
          name="newAttribute"
          label="Attribute"
          options={attributeOptions}
          onChange={(e) =>
            setSelectedAttributes([...selectedAttributes, e.target.value])
          }
          value=""
          error=""
        />
      </DialogContent>
      <DialogActions>
        <Controls.Button onClick={() => handleClose()} text="Cancel" />
        <Controls.WaitingButton
          onClick={() => handleSubmit(productName, selectedAttributes)}
          text="Create"
        />
      </DialogActions>
    </Dialog>
  );
}
