import * as React from "react";
import MetaInfoService from "../services/metainfo-service";
import ProductService from "../services/product-service";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import BasicPorductForm from "./basic-product-info-form";
import {
  Container,
  Typography,
} from "@material-ui/core";
import DynamicProductInfo from "./dynamic-product-info";
import { useEffect } from "react";
import Product from "../../model/product";


interface metaDef {
  productNameToAttributesMap: any;
  unitList: string[];
  attributeToDataTypeMap: any;
}

interface IBasicProductInfo {
  amount?: number;
  unit?: string;
  product?: string;
  id?: string;
  pdc?: string;
  property?: string;
}

const AddGoods = () => {
  const [productsMetdaDefState, setProductsMetaDataState] = React.useState<metaDef>();

  const productList = () => productsMetdaDefState ? Object.keys(productsMetdaDefState.productNameToAttributesMap) : []

  const unitList = () => productsMetdaDefState ? productsMetdaDefState.unitList : [];
  
  const [attributeList, setAttributeList] = React.useState<string[]>();

  const [productSpecificJson, setProductSpecificJson] = React.useState({});

  const [basicProductInfo, setBasicProductInfo] = React.useState<IBasicProductInfo>({});

  useEffect(() => {
    MetaInfoService.readMetaDef().then((res) => {
        setProductsMetaDataState(res.data)
      });
      return () => setProductSpecificJson({})
  } 
  , 
  []
  );

  function handleProductChange(e) {
    let attributes: string[] =
      productsMetdaDefState.productNameToAttributesMap[e.target.value];
    setAttributeList(attributes);
    setProductSpecificJson({});
    setBasicProductInfo({
      ...basicProductInfo,
      product: e.target.value,
    });
  }

  function handleUnitChange(e) {
    setBasicProductInfo({
      ...basicProductInfo,
      unit: e.target.value,
    });
  }

  function changeHandler(e) {
    setBasicProductInfo({
      ...basicProductInfo,
      [e.target.id]: e.target.value,
    });
  }

  function changeHandlerSpecific(e) {
    setProductSpecificJson({
      ...productSpecificJson,
      [e.target.id]: e.target.value,
    });
  }

  function submit() {
    var result: Product = {
      amount: basicProductInfo.amount + "",
      unit: basicProductInfo.unit,
      product: basicProductInfo.product,
      id: basicProductInfo.id,
      pdc: basicProductInfo.pdc,
      attributes: [],
      attrValues: [],
    };

    for (var key in productSpecificJson) {
      if (productSpecificJson.hasOwnProperty(key)) {
        result.attributes.push(key);
        result.attrValues.push(productSpecificJson[key]);
      }
    }
    console.log(result);
    clearValues();
    // ProductService.createProduct(result)
    //   .then((res) =>{
    //     // reset form + success message
    //   })
    //   .catch((err) => {
    //     // show error message
    //   });
  }

  function clearValues() {
    for(var property in productSpecificJson)
      setProductSpecificJson({...productSpecificJson, property: ""})
    
    for(var property in basicProductInfo)
      setBasicProductInfo({...basicProductInfo, property: ""})
  }

  return (
    <div>
      <BasicPorductForm
        productList={productList()}
        unitList={unitList()}
        handleInputChange={changeHandler}
        handleProductChange={handleProductChange}
        handleUnitChange={handleUnitChange}
      ></BasicPorductForm>
      <Container component="main" maxWidth="xs" style={{ marginTop: "40px" }}>
        <Typography component="h1" variant="h5">
          Produkt-spezifische Informationen
        </Typography>
      </Container>
      <Container component="main" maxWidth="xs">
        <form>
          <DynamicProductInfo
            attributeList={attributeList ? attributeList : []}
            changeHandler={changeHandlerSpecific}
            values={productSpecificJson}
          />
        </form>
        <Button variant="contained" color="primary" onClick={submit} style={{marginTop: "3em"}}>
          Anlegen
        </Button>
      </Container>
    </div>
  );
};

export default AddGoods;
 
//<TextField variant="outlined" margin="normal" id={x} label={x} name={x} />