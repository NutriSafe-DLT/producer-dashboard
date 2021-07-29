export interface MetaProductsProps {
    productNameToAttributesMap: any;
    attributeToDataTypeMap: any;
    // we cannot define anything here, since the products come as an object:
    // {
    //     "milk": [
    //         "Quality"
    //     ],
    //     "delivery": [
    //         "barcode",
    //         "lotid",
    //         "bestbeforedate",
    //         "state"
    //     ]
    // }
  }