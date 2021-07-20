import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { MetaProductsProps } from "./meta-products.module";



const MetaProducts = ({
  productNameToAttributesMap,
  attributeToDataTypeMap,
}: MetaProductsProps) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Attributes</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {Object.keys(productNameToAttributesMap).map((key: string) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>
                <Table aria-label="simple table" size="small">
                  <tbody>
                    {productNameToAttributesMap[key].map(
                      (attribute: string) => (
                        <TableRow>
                          <TableCell>
                            {attribute}: {"  "}
                            {attributeToDataTypeMap[attribute]}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </tbody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default MetaProducts;
