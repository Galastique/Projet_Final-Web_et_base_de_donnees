import React, { useReducer, useEffect } from "react";

import "./RadioButton.css";

/* 
props:
- id
- group
- value
- label
- onInput
- checked
*/

const RadioButton = (props) => {
  const changeHandler = (event) => {
    props.formState.inputs.type.value = event.target.value;
  };

  const element = props.checked ? (
    <input
      type="radio"
      onChange={changeHandler}
      name={props.group}
      value={props.value}
      checked
    />
  ) : (
    <input
      type="radio"
      onChange={changeHandler}
      name={props.group}
      value={props.value}
    />
  );

  if (props.checked) {
    props.setCheckedOnce(false);
  }

  return (
    <label>
      {element}
      {props.label}
    </label>
  );
};

export default RadioButton;
