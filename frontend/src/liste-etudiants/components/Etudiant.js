import React from "react";

import Card from "../../shared/components/UIElements/Card";

import "./Etudiant.css";

const Etudiant = (props) => {
    if (props.listeVide) {
        return (
            <li className="main_content-liste_etudiants-etudiant">
                <Card className="etudiant vide">
                    Il n'y a pas d'étudiants...
                </Card>
            </li>
        );
    }

	return (
        <li className="main_content-liste_etudiants-etudiant">
            <Card className="etudiant">
                <h4>Étudiant : {props.etudiant.nomComplet}</h4>
                <ul className="main_content-content-normal_list">
                    <li>Numéro de DA: {props.etudiant.numeroDA}</li>
                    <li>Nom complet: {props.etudiant.nomComplet}</li>
                    <li>Courriel de contact: {props.etudiant.courrielContact}</li>
                    <li>Profil de sortie: {props.etudiant.profilSortie}</li>
                    <li>Stage de l'étudiant: {props.etudiant.stageAssocie}</li>
                </ul>
            </Card>
        </li>
	);
};

export default Etudiant;
