import React from "react";

import Card from "../../shared/components/UIElements/Card";

import "./Stage.css";

const Stage = (props) => {
    if (props.listeVide) {
        return (
            <li className="main_content-liste_stages-stage">
                <Card className="stage vide">
                    Il n'y a pas de stages...
                </Card>
            </li>
        );
    }

	return (
        <li className="main_content-liste_stages-stage">
            <Card className="stage">
                <h4>Stage</h4>
                <ul className="main_content-content-normal_list">
                    <li>Nom de la personne contact: {props.stage.nomPersonneContact}</li>
                    <li>Courriel de la personne contact: {props.stage.courrielPersonneContact}</li>
                    <li>Téléphone de la personne contact: {props.stage.telephonePersonneContact}</li>
                    <li>Nom de l'entreprise: {props.stage.nomEntreprise}</li>
                    <li>Adresse de l'entreprise: {props.stage.adresseEntreprise}</li>
                    <li>Type de stage: {props.stage.typeStage}</li>
                    <li>Nombre de postes disponibles: {props.stage.nbrPostesDisponibles}</li>
                    <li>Description du stage: {props.stage.descriptionStage}</li>
                    <li>Rénumération: {props.stage.renumeration}</li>
                    <li>Étudiants inscrits: {props.stage.etudiantsInscrits}</li>
                </ul>
            </Card>
        </li>
	);
};

export default Stage;
