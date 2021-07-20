import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { MetaAttributesProps } from "./meta-attribute.module";



const MetaAttributes = ({ attributeToDataTypeMap }: MetaAttributesProps) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Attribute</TableCell>
            <TableCell>Datatype</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {Object.keys(attributeToDataTypeMap).map((key: string) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{attributeToDataTypeMap[key]}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default MetaAttributes;
