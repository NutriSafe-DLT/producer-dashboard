import * as React from "react";
import MyTextField from "./my-text-field";

const DynamicProductInfo = (props) => {
  return (
    <div>
      {props.attributeList.map((x) => (
        <MyTextField
          x={x}
          changeHandler={props.changeHandler}
          value={props.values[x]}
        ></MyTextField>
      ))}
    </div>
  );
};

export default DynamicProductInfo;
