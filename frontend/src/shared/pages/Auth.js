import React, { useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators.js";

import Card from "../components/UIElements/Card";
import ErrorModal from "../components/UIElements/ErrorModal";
import Input from "../components/FormElements/Input";
import Button from "../components/FormElements/Button";
import RadioButton from "../components/FormElements/RadioButton";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();

  const [checkedOnce, setCheckedOnce] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setCheckedOnce(false);
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          type: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setCheckedOnce(true);
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          type: {
            value: "etudiant",
            isValid: true,
          },
        },
        false
      );
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/auth/connexion",
          "POST",
          JSON.stringify({
            courriel: formState.inputs.email.value,
            motDePasse: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
        auth.login(responseData.utilisateur.id, responseData.utilisateur.type);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/auth/inscription",
          "POST",
          JSON.stringify({
            nom: formState.inputs.name.value,
            courriel: formState.inputs.email.value,
            motDePasse: formState.inputs.password.value,
            type: formState.inputs.type.value,
          }),
          { "Content-Type": "application/json" }
        );
        console.log(responseData);
        auth.login(responseData.utilisateur.id, responseData.utilisateur.type);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="main_content">
      <h2 className="main_content-title">Édition 2023</h2>
      <h4 className="main_content-subtitle">
        Bienvenue sur le site des stages de fin d'études des techniques de
        l'informatique du Collège Montmorency!
      </h4>
      <hr />
      <div className="main_content-content main_content-content_authentication">
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          <Card className="authentication">
            <form onSubmit={authSubmitHandler}>
              {!isLoginMode && (
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Nom"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Entrez un nom."
                  onInput={inputHandler}
                />
              )}
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
                id="password"
                type="password"
                label="Mot de passe"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Entrez un mot de passe valide, au moins 5 caractères."
                onInput={inputHandler}
              />
              {!isLoginMode && (
                <div className="form-radio-group">
                  <RadioButton
                    group="type"
                    value="etudiant"
                    label="Étudiant"
                    checked={checkedOnce}
                    setCheckedOnce={setCheckedOnce}
                    formState={formState}
                  />
                  <RadioButton
                    group="type"
                    value="coordonateur"
                    label="Coordonateur"
                    formState={formState}
                  />
                  <RadioButton
                    group="type"
                    value="employeur"
                    label="Employeur"
                    formState={formState}
                  />
                </div>
              )}
              <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? "Connexion" : "Inscription"}
              </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
              Changer pour {isLoginMode ? "Inscription" : "Connexion"}
            </Button>
          </Card>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Auth;
