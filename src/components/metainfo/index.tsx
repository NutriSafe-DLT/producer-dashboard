import React from "react";
import { stringify } from "querystring";

const MetaInfo = (props) => {
  const [metaInfoState, setMetaInfoState] = React.useState<metaDef>({
    productNameToAttributesMap: { milk: ["Quality", "Protein"] },
    unitList: ["Liters"],
    attributeToDataTypeMap: {
      Quality: "Integer",
      Protein: "Integer",
      Quality1: "Integer",
    },
  });
  return <h1>{JSON.stringify(metaInfoState)}</h1>;
};

export default MetaInfo;
