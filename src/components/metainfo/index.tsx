import React from "react";
import metainfoService from "../services/metainfo-service";
import { useEffect } from "react";
import MetaProducts from "./meta-products";
import { Button, Typography } from "@material-ui/core";
import MetaAttributes from "./meta-attributes";
import AddProductDefDialog from "./add-product-def-dialog";
import AddAttributeDefDialog from "./add-attribute-def-dialog";

const MetaInfo = () => {
  const [metaInfoState, setMetaInfoState] = React.useState<metaDef>();
  const [addProductDefDialogOpen, setAddProductDefDialogOpen] = React.useState<
    boolean
  >(false);
  const [
    addAttributeDefDialogOpen,
    setAddAttributeDefDialogOpen,
  ] = React.useState<boolean>(false);

  useEffect(() => {
    metainfoService.readMetaDef().then((res) => {
      setMetaInfoState(res.data);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flexGrow: 1, padding: "1em" }}>
        {metaInfoState !== undefined ? (
          <div>
            <Typography component="h2" variant="h5">
              Product Definitions
            </Typography>
            <MetaProducts
              productNameToAttributesMap={
                metaInfoState.productNameToAttributesMap
              }
              attributeToDataTypeMap={metaInfoState.attributeToDataTypeMap}
            ></MetaProducts>

            <div style={{ padding: "1em" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAddProductDefDialogOpen(true)}
              >
                Add Product
              </Button>
            </div>
            <AddProductDefDialog
              open={addProductDefDialogOpen}
              handleClose={() => setAddProductDefDialogOpen(false)}
              handleSubmit={metainfoService.createProductDef}
              attributes={Object.keys(metaInfoState.attributeToDataTypeMap)}
            ></AddProductDefDialog>
          </div>
        ) : (
          <br></br>
        )}
      </div>
      <div style={{ flexGrow: 1, padding: "1em" }}>
        {metaInfoState !== undefined ? (
          <div>
            <Typography component="h2" variant="h5">
              Attribute Definitions
            </Typography>
            <MetaAttributes
              attributeToDataTypeMap={metaInfoState.attributeToDataTypeMap}
            ></MetaAttributes>
            <div style={{ padding: "1em" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAddAttributeDefDialogOpen(true)}
              >
                Add Attribute
              </Button>
            </div>
            <AddAttributeDefDialog
              open={addAttributeDefDialogOpen}
              handleClose={() => setAddAttributeDefDialogOpen(false)}
              handleSubmit={metainfoService.createAttributeDef}
            ></AddAttributeDefDialog>
          </div>
        ) : (
          <br></br>
        )}
      </div>
    </div>
  );
};

export default MetaInfo;
