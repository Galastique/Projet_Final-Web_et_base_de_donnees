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
            </Card>
        </li>
	);
};

export default Stage;
