import React from "react";

const Accueil = (props) => {
  return (
    <div className="main_content">
      <h2 className="main_content-title">Édition 2023</h2>
      <h4 className="main_content-subtitle">
        Bienvenue sur le site des stages de fin d'études des techniques de
        l'informatique du Collège Montmorency!
      </h4>
      <hr />
      <div className="main_content-content">
        <p>
          À la fin de leurs études, les étudiants sont appelés à mettre en
          pratique les compétences acquises durant le programme. Cela se fait
          grâce à la participation d'entreprises de la région qui les
          accueillent afin de finaliser leurs formations.
        </p>
        <p>
          Le Collège Montmorency offre ainsi aux employeurs l'occasion d'obtenir
          une main-d'œuvre compétente, tout en leur permettant de participer à
          la formation finale des étudiants.
        </p>
        <p>
          Le stage de fin d'études est une expérience concrète permettant
          d'acquérir une expérience professionnelle formatrice.
        </p>
        <p>
          Les étudiants terminent la portion académique de leurs études en
          informatique selon une des deux voies de sortie du programme: Réseaux
          et sécurité informatique Développement d'applications informatiques
        </p>
      </div>
    </div>
  );
};

export default Accueil;
