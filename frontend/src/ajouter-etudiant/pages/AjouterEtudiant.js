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

const AjouterEtudiant = (props) => {
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
          numeroDA: formState.inputs.number.value,
          nom: formState.inputs.name.value,
          courriel: formState.inputs.email.value,
          profil: formState.inputs.profile.value,
        }),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
    } catch (err) {
      console.error(err);
    }
  }

  return(
    <div className="main_content">
      <h2 className="main_content-title">Édition 2023</h2>
      <h4 className="main_content-subtitle">Ajouter un étudiant</h4>
      <hr />
      <div className="main_content-content main_content-content_authentication">
      <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          <Card className="authentication">
            <form onSubmit={ajouter}>
              
                <Input
                  element="input"
                  id="number"
                  type="text"
                  label="Numéro de DA"
                  validators={[VALIDATOR_NUMBERDA()]}
                  errorText="Entrez un numéro valide. (7 Chiffres)"
                  onInput={inputHandler}
                />

                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Nom"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un nom."
                  onInput={inputHandler}
                />
              
              <Input
                element="input"
                id="email"
                type="email"
                label="Courriel"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide."
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="profile"
                type="text"
                label="Profil de sortie"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un profil de sortie."
                onInput={inputHandler}
              />
              <Button type="submit" disabled={!formState.isValid}>
                Ajouter
              </Button>
            </form>
          </Card>
        </React.Fragment>
      </div>
  </div>
  );
};

export default AjouterEtudiant;
