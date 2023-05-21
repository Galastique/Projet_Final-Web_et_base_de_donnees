import React from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_TELEPHONE,
  VALIDATOR_NUMBERSONLY,
  VALIDATOR_MONETARY,
} from "../../shared/util/validators.js";

import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const AjouterStage = (props) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
      {
        nameContact: {
          value: "",
          isValid: false,
        },
        email: {
          value: "",
          isValid: false,
        },
        telephone: {
          value: "",
          isValid: false,
        },
        enterprise: {
          value: "",
          isValid: false,
        },
        address: {
          value: "",
          isValid: false,
        },
        stage: {
          value: "",
          isValid: false,
        },
        spots: {
          value: "",
          isValid: false,
        },
        description: {
          value: "",
          isValid: false,
        },
        remuneration: {
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
          adresseEntreprise: formState.inputs.address.value,
          typeStage: formState.inputs.stage.value,
          nbrPostesDisponibles: formState.inputs.spots.value,
          descriptionStage: formState.inputs.description.value,
          remuneration: formState.inputs.remuneration.value,
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

      <div className="main_content-content main_content-content_authentication">
      <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          <Card className="authentication">
            <form onSubmit={ajouter}>
              
                <Input
                  element="input"
                  id="nameContact"
                  type="text"
                  label="Nom de la personne de contact"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un nom."
                  onInput={inputHandler}
                />
              
              <Input
                element="input"
                id="email"
                type="email"
                label="Courriel du contact"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Entrez un courriel valide."
                onInput={inputHandler}
              />

              <Input
                  element="input"
                  id="telephone"
                  type="text"
                  label="Téléphone du contact"
                  validators={[VALIDATOR_TELEPHONE()]}
                  errorText="Veuillez respecter le format. (123-123-1234)"
                  onInput={inputHandler}
                />

              <Input
                element="input"
                id="enterprise"
                type="text"
                label="Nom de l'entreprise"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez un nom d'enterprise."
                onInput={inputHandler}
              />

              <Input
                element="input"
                id="address"
                type="text"
                label="Adresse de l'entreprise"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez l'adresse de l'enterprise."
                onInput={inputHandler}
              />

              <Input
                element="input"
                id="stage"
                type="text"
                label="Type de stage"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez le type de stage."
                onInput={inputHandler}
              />

              <Input
                element="input"
                id="spots"
                type="text"
                label="Nombre de places disponibles"
                validators={[VALIDATOR_NUMBERSONLY()]}
                errorText="Entrez le nombre de places disponibles."
                onInput={inputHandler}
              />
                            
              <Input
                element="input"
                id="description"
                type="text"
                label="Description du stage"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Entrez le nombre de places disponibles."
                onInput={inputHandler}
              />

              <Input
                element="input"
                id="remuneration"
                type="text"
                label="Rémunération"
                validators={[VALIDATOR_MONETARY()]}
                errorText="Entrez le montant de rémunération."
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

export default AjouterStage;
