import React from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBERDA,
} from "../../shared/util/validators.js";

import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const AjouterStage = (props) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
      {
        number: {
          value: "",
          isValid: false,
        },
        name: {
          value: "",
          isValid: false,
        },
        email: {
          value: "",
          isValid: false,
        },
        profile: {
          value: "",
          isValid: false,
        },
      },
      false
    );

    const ajouter = async (event) => {
    event.preventDefault()
    try {
      const responseData = await sendRequest(
        //"http://localhost:3000/??", TODO
        //"POST",
        JSON.stringify({
          nomPersonneContact: formState.inputs.nameContact.value,
          courrielPersonneContact: formState.inputs.email.value,
          telephonePersonneContact: formState.inputs.telephone.value,
          nomEntreprise: formState.inputs.enterprise.value,
          typeStage: formState.inputs.stage.value,
          nbrPostesDisponibles: formState.inputs.spots.value,
          descriptionStage: formState.inputs.description.value,
          renumeration: formState.inputs.renumeration.value,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
    } catch (err) {
      console.error(err);
    }
    }

  return (
    <div className="main_content">
      <h2 className="main_content-title">Édition 2023</h2>
      <h4 className="main_content-subtitle">Ajouter un stage</h4>
      <hr />

      
    </div>
  );
};

export default AjouterStage;
