import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Button from "../../shared/components/FormElements/Button";

import Stage from "../components/Stage";

import "./ListeStages.css";
import Card from "../../shared/components/UIElements/Card";

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

	let element;
	if (listeStages) {
		if (listeStages.length !== 0) {
			let listeStagesDev = listeStages.filter(stage => stage.typeStage.includes("applications"));
			let listeStagesRes = listeStages.filter(stage => stage.typeStage.includes("sécurité"));
			let listeStagesDevRes = listeStages.filter(stage => stage.typeStage.includes("applications")).filter(stage => stage.typeStage.includes("sécurité"));
			
			if (boolDev && boolRes) {
				if (listeStagesDevRes.length !== 0) {
					element = listeStagesDevRes.map(stage => {
						return <Stage stage={stage} />
					});
				} else {
					<Stage listeVide={true} />
				}
			} else if (boolDev) {
				if (listeStagesDev.length !== 0) {
					element = listeStagesDev.map(stage => {
						return <Stage stage={stage} />
					});
				} else {
					<Stage listeVide={true} />
				}
			} else if (boolRes) {
				if (listeStagesRes.length !== 0) {
					element = listeStagesRes.map(stage => {
						return <Stage stage={stage} />
					});
				} else {
					<Stage listeVide={true} />
				}
			} else {
				element = listeStages.map(stage => {
					return <Stage stage={stage} />
				})
			}
		} else {
			<Stage listeVide={true} />
		}
	} else {
		<Stage listeVide={true} />
	}

	function toggleBoolDev(event) {
		setBoolDev(!boolDev);
		
		if (boolDev) {
			event.target.classList.remove("button--enabled");
		} else {
			event.target.classList.add("button--enabled");
		}
	}

	function toggleBoolRes(event) {
		setBoolRes(!boolRes);
		
		if (boolRes) {
			event.target.classList.remove("button--enabled");
		} else {
			event.target.classList.add("button--enabled");
		}
	}

	return (
		<div className="main_content">
			<h2 className="main_content-title">Édition 2023</h2>
			<h4 className="main_content-subtitle">
				Liste des stages disponibles
			</h4>
			<hr />
			<div className="main_content-content">
				<div className="main_content-liste_stages-boutons">
					<Card className="main_content-liste_stages-boutons_card">
						<h4>Filtrer par:</h4>
						<Button onClick={toggleBoolDev}>
								Développement
						</Button>
						<Button onClick={toggleBoolRes}>
								Réseaux
						</Button>
					</Card>
				</div>
				<React.Fragment>
					<ErrorModal error={error} onClear={clearError} />
					<ul className="main_content-liste_stages">
						{listeStages && (
							element
						)}
					</ul>
				</React.Fragment>
			</div>
		</div>
	)
};

export default ListeStages;
