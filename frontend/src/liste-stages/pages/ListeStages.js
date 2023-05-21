import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import Stage from "../components/Stage";

import "./ListeStages.css";

const ListeStages = (props) => {
  const [listeStages, setListeStages] = useState();
	const { error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchStages = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "stages"
				);
				setListeStages(responseData.stages);
			} catch (err) {}
		};
		fetchStages();
	}, [sendRequest]);

	let element = <ul className="main_content-liste_stages">
		{
			listeStages ? (
				listeStages.length === 0 ? (
					<Stage listeVide={true} />
				) : (
					listeStages.map(stage => {
						return <Stage stage={stage} />
					})
				)
			) : (
				<Stage listeVide={true} />
			)
		}
	</ul>;

	return (
		<div className="main_content">
			<h2 className="main_content-title">Édition 2023</h2>
			<h4 className="main_content-subtitle">
				Liste des stages disponibles
			</h4>
			<hr />
			<div className="main_content-content">
				<React.Fragment>
					<ErrorModal error={error} onClear={clearError} />
					{listeStages && (
						element
					)}
				</React.Fragment>
			</div>
		</div>
	)
};

export default ListeStages;
