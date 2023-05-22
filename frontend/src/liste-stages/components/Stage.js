import React, { useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import emailjs from '@emailjs/browser';
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./Stage.css";

const Stage = (props) => {
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();

    if (props.listeVide) {
        return (
            <li className="main_content-liste_stages-stage">
                <Card className="stage vide">
                    Il n'y a pas de stages...
                </Card>
            </li>
        );
    }

    async function postulerStage() {
        /*
        try {
            console.log(auth.userId);

            //WE NEED TO GET A LIST OF EVERY STUDENT TO BE ABLE TO FIND A SINGLE STUDENT WITH THEIR ID
            let DA = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/etudiants`
            );
            console.log(DA);
            
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/etudiants/${props.etudiant.numeroDA}/inscrire`,
                "PATCH",
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
            
        } catch (err) {
            console.error(err);
        }

        */
        emailjs.send("service_54jl5rh", "template_sep84pen", {courrielEmployeur: "COURRIELEMPLOYEUR", nomEmployeur: "NOMEMPLOYEUR", stageId: "STAGEID", nomEtudiant: "NOMETUDIANT" }, "fRUoFLAtGiFtdiQUe");
    }

    async function modifierStage() {

    }

    async function stageAppartientAEmployeur() {

    }

	return (
        <li className="main_content-liste_stages-stage">
            <Card className="stage">
                <h4>Stage : {props.stage.nomEntreprise}</h4>
                <ul className="main_content-content-normal_list">
                    <li>Personne contact:
                        <ul className="main_content-content-normal_list">
                            <li>Nom: {props.stage.nomPersonneContact}</li>
                            <li>Courriel: {props.stage.courrielPersonneContact}</li>
                            <li>Téléphone: {props.stage.telephonePersonneContact}</li>
                        </ul>
                    </li>
                    <li>Entreprise:
                        <ul className="main_content-content-normal_list">
                            <li>Nom: {props.stage.nomEntreprise}</li>
                            <li>Adresse: {props.stage.adresseEntreprise}</li>
                        </ul>
                    </li>
                    <li>Stage:
                        <ul className="main_content-content-normal_list">
                            <li>Description: {props.stage.descriptionStage}</li>
                            <li>Type: {props.stage.typeStage}</li>
                            <li>Nombre de postes disponibles: {props.stage.nbrPostesDisponibles}</li>
                            <li>Rénumération: {props.stage.remuneration}</li>
                            {props.stage.etudiantsInscrits.length !== 0 ? (
                                <li>Étudiants inscrits:
                                    <ul className="main_content-content-normal_list">
                                        <li>{props.stage.etudiantsInscrits.map(etudiant => {
                                            return etudiant.numeroDA + " - " + etudiant.nomComplet
                                        })}</li>
                                    </ul>
                                </li>
                            ) : null}
                        </ul>
                    </li>
                </ul>
                {auth.isLoggedIn && auth.userType === "etudiant" && (
                    <Button onClick={function () { postulerStage() }}>Postuler</Button>
                )}
                {auth.isLoggedIn && auth.userType === "employeur" && stageAppartientAEmployeur() && (
                    <Button onClick={function () { modifierStage() }}>Modifier</Button>
                )}
            </Card>
        </li>
	);
};

export default Stage;
