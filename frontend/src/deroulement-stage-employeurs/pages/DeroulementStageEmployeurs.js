import React from "react";

const DeroulementStageEmployeurs = (props) => {
  return <div className="main_content">
        <h2 className="main_content-title">Édition 2023</h2>
        <h4 className="main_content-subtitle">Directives pour les employeurs</h4>
        <hr />
        <div className="main_content-content">
          <p>Formulaire d'inscription de milieu de stage</p>
          <p>Stages réguliers ayant lieu à la session hiver</p>
          <ul>
            <li>
            Les stages sont du 21 janvier au 3 mai 2019
            <ul>
              <li>
              (il est toutefois possible après entente avec le coordonnateur de débuter le stage un peu plus tôt)
              </li>
            </ul>
            </li>
          </ul>
          <p>Sur réception de ce formulaire, le coordonnateur des stages entrera en contact avec le responsable en entreprise pour discuter du stage.</p>
          <p>Veuillez vous référez à la page <a href="/profils-etudiants">Profil de sortie</a> pour connaître le profil de sortie et les compétences des étudiants.</p>
        </div>
    </div>;
};

export default DeroulementStageEmployeurs;
