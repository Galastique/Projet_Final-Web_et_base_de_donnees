import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import Etudiant from "../components/Etudiant";

import "./ListeEtudiants.css";

const ListeEtudiants = (props) => {
	const [listeEtudiants, setListeEtudiants] = useState();
	const { error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchEtudiants = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "etudiants"
				);
				setListeEtudiants(responseData.etudiants.populate("stageAssocie"));
			} catch (err) {}
		};
		fetchEtudiants();
	}, [sendRequest]);

	let element = <ul className="main_content-liste_etudiants">
		{
			listeEtudiants ? (
				listeEtudiants.length === 0 ? (
					<Etudiant listeVide={true} />
				) : (
					listeEtudiants.map(etudiant => {
						return <Etudiant etudiant={etudiant} />
					})
				)
			) : (
				<Etudiant listeVide={true} />
			)
		}
	</ul>;

	return (
		<div className="main_content">
			<h2 className="main_content-title">Édition 2023</h2>
			<h4 className="main_content-subtitle">
				Liste des étudiants recherchant un stage
			</h4>
			<hr />
			<div className="main_content-content">
				<React.Fragment>
					<ErrorModal error={error} onClear={clearError} />
					{listeEtudiants && (
						element
					)}
				</React.Fragment>
			</div>
		</div>
	)
};

export default ListeEtudiants;
