import { Typography } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import Product from "../../model/product";
import Controls from "../base/controls/Controls";
import { Option } from "../base/controls/Option";
import { useForm } from "../base/useForm";
import MetaInfoService from "../services/metainfo-service";
import ProductService from "../services/product-service";
import BasicProductForm from "./basic-product-info-form";
import DynamicProductInfo from "./dynamic-product-info";

interface metaDef {
  productNameToAttributesMap: any;
  unitList: string[];
  attributeToDataTypeMap: any;
}

interface IBasicProductInfo {
  amount?: string;
  unit?: string;
  product?: string;
  id?: string;
  pdc?: string;
}
const initialBasicValues = {
  amount: "",
  unit: "",
  product: "",
  id: "",
  pdc: "",
};

const AddGoods = () => {
  const [productsMetdaDef, setProductsMetaData] = React.useState<metaDef>();
  const [unitOptions, setUnitOptions] = React.useState<Option[]>([]);
  const [productOptions, setProductOptions] = React.useState<Option[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<string>("");
  const [productSpecificJson, setProductSpecificJson] = React.useState({});

  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    if ("product" in fieldValues) {
      tempErrors.product = fieldValues.product ? "" : "This field is required.";
    }
    if ("unit" in fieldValues) {
      tempErrors.unit = fieldValues.unit ? "" : "This field is required.";
    }
    if ("amount" in fieldValues) {
      tempErrors.amount = fieldValues.amount ? "" : "This field is required.";
      tempErrors.amount = /^\d*$/.test(fieldValues.amount)
        ? ""
        : "This field must me numeric.";
    }
    if ("id" in fieldValues) {
      tempErrors.id = fieldValues.id ? "" : "This field is required.";
    }
    setErrors({
      ...tempErrors,
    });
    return Object.values(tempErrors).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm<IBasicProductInfo>(initialBasicValues, true, validate);

  useEffect(() => {
    MetaInfoService.readMetaDef().then((res) => {
      setProductsMetaData(res.data);
    });
    return () => setProductSpecificJson({});
  }, []);

  useEffect(() => {
    if (productsMetdaDef) {
      const productOptions: Option[] = [];
      Object.keys(
        productsMetdaDef.productNameToAttributesMap
      ).map((productName) =>
        productOptions.push({ id: productName, title: productName })
      );
      setProductOptions(productOptions);
      const unitOptions: Option[] = [];
      productsMetdaDef.unitList.map((unit) =>
        unitOptions.push({ id: unit, title: unit })
      );
      setUnitOptions(unitOptions);
    }
  }, [productsMetdaDef]);

  useEffect(() => {
    // create new empty json for product specific info, when selected product changes
    if (productsMetdaDef && selectedProduct) {
      let attributes: string[] =
        productsMetdaDef.productNameToAttributesMap[selectedProduct];
      let newProductSpecificJson = {};
      attributes.map(
        (attr) =>
          (newProductSpecificJson = { ...newProductSpecificJson, [attr]: "" })
      );
      setProductSpecificJson(newProductSpecificJson);
    }
  }, [selectedProduct]);

  function submit() {
    var result: Product = {
      amount: values.amount,
      unit: values.unit,
      product: values.product,
      id: values.id,
      pdc: values.pdc,
      attributes: [],
      attrValues: [],
    };

    for (var key in productSpecificJson) {
      if (productSpecificJson.hasOwnProperty(key)) {
        result.attributes.push(key);
        result.attrValues.push(productSpecificJson[key]);
      }
    }
    setSelectedProduct("");
    resetForm();
    setProductSpecificJson({});
    ProductService.createProduct(result)
      .then((res) => {})
      .catch((err) => {});
  }

  return (
    <>
      <BasicProductForm
        productOptions={productOptions}
        unitOptions={unitOptions}
        setSelectedProduct={setSelectedProduct}
        handleInputChange={handleInputChange}
        values={values}
        errors={errors}
      ></BasicProductForm>
      <Typography component="h1" variant="h5">
        Product specific Information
      </Typography>
      <DynamicProductInfo
        setValues={setProductSpecificJson}
        values={productSpecificJson}
      />
      <Controls.Button onClick={submit} text="Create" />
    </>
  );
};

export default AddGoods;
