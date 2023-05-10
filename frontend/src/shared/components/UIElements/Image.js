import React from "react";

import "./Image.css";

const Image = (props) => {
  return <img alt={props.alt} src={props.src}></img>;
};

export default Image;
