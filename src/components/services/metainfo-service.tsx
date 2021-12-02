import instance from "../../axios";
import authHeader from "./auth-header";

class MetaInfoService {
  readMetaDef() {
    return instance.get("/get?function=META_readMetaDef", {
      headers: authHeader(),
    });
    // return {
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
    //   },
    // };
  }

  createProductDef(productName: string, attributeList: string[]) {
    return instance.post(
      "/submit?function=META_addProductDefinition",
      {
        product: productName,
        attributes: attributeList,
      },
      {
        headers: authHeader(),
      }
    );
  }
  createAttributeDef(attributeName: string, attributeType: string) {
    return instance.post(
      "/submit?function=META_addAttributeDefinition",
      {
        attribute: attributeName,
        attrValue: attributeType,
      },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new MetaInfoService();
