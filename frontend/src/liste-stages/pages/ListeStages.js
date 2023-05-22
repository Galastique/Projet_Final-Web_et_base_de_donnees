import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import Stage from "../components/Stage";

import "./ListeStages.css";
import Button from "../../shared/components/FormElements/Button";

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

	const [boolDev, setBoolDev] = useState(false);
	const [boolRes, setBoolRes] = useState(false);

	let element = <ul className="main_content-liste_stages">
		{
			listeStages ? (
				listeStages.length === 0 ? (
					<Stage listeVide={true} />
				) : (
					boolDev ? (
						listeStages.filter(stage => stage.typeStage.includes("applications")).map(stage => {
							return <Stage stage={stage} />
						})
					) : (
						boolRes ? (
							listeStages.stagesRes.filter(stage => stage.typeStage.includes("sécurité")).map(stage => {
								return <Stage stage={stage} />
							})
						) : (
							listeStages.map(stage => {
								return <Stage stage={stage} />
							})
						)
					)
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
				<Button onClick={function () {setBoolDev(true); setBoolRes(false);}}>
						Développement
				</Button>
				<Button onClick={function () {setBoolDev(false); setBoolRes(true)}}>
						Réseaux
				</Button>
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
