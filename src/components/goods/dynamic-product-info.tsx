import * as React from "react";
import Controls from "../base/controls/Controls";
import { Form } from "../base/useForm";

const DynamicProductInfo = (props) => {
  return (
    <Form>
      {Object.keys(props.values).map((x) => (
        <Controls.Input
          key={x + "key"}
          id={x}
          name={x}
          label={x}
          onChange={(e) => {
            props.setValues({ ...props.values, [e.target.id]: e.target.value });
          }}
          value={props.values[x]}
        />
      ))}
    </Form>
  );
};

export default DynamicProductInfo;
