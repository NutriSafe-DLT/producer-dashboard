import instance from "../../axios";
import {
  AttributeDefinition,
  MetaDefinition,
  ProductDefinition,
} from "../../model/meta-def";
import authHeader from "./auth-header";

class MetaInfoService {
  readMetaDef(): Promise<MetaDefinition> {
    return instance.get("/get?function=META_readMetaDef", {
      headers: authHeader(),
    });
  }

  createProductDef(productDefinition: ProductDefinition) {
    return instance.post(
      "/submit?function=META_addProductDefinition",
      {
        product: productDefinition.productName,
        attributes: productDefinition.attributeList,
      },
      {
        headers: authHeader(),
      }
    );
  }
  createAttributeDef(attributeDefinition: AttributeDefinition) {
    return instance.post(
      "/submit?function=META_addAttributeDefinition",
      {
        attribute: attributeDefinition.attributeName,
        attrValue: attributeDefinition.attributeType,
      },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new MetaInfoService();
