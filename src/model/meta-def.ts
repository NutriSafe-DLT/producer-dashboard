export class MetaDefinition {
  productNameToAttributesMap: any;
  unitList: string[];
  attributeToDataTypeMap: any;
}

// example:
// {
//   productNameToAttributesMap: {
//     milk: ["Quality", "Protein"],
//     cheese: ["Quality", "Protein", "Type"],
//     someOtherProduct: ["New_Attribute", "And_anotherone"],
//   },
//   unitList: ["Liters"],
//   attributeToDataTypeMap: {
//     Quality: "Integer",
//     Protein: "Integer",
//     Type: "String",
//   }
// }

export class ProductDefinition {
  productName: string;
  attributeList: string[];
}

export class AttributeDefinition {
  attributeName: string;
  attributeType: string;
}
