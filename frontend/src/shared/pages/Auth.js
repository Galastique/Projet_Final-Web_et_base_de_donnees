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

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { error, sendRequest, clearError } = useHttpClient();

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
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
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
        // TODO REQUEST AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        const responseData = await sendRequest();

        console.log(responseData);
        auth.login(responseData.utilisateur.id);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        // TODO REQUEST AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        const responseData = await sendRequest();

        console.log(responseData);
        auth.login(responseData.utilisateur.id);
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
            <h2>Connexion requise</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
              {!isLoginMode && (
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Your Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name."
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
