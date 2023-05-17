import React from "react";

import Modal from "./Modal.js";
import Button from "../FormElements/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Une erreur est survenue"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>OK</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
