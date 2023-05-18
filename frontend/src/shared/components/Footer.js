import React from "react";

import "./Footer.css";

const MainNavigation = (props) => {
  return (
    <footer className="main_footer">
      <p>
        Coordonnateur des stages: Sylvain Labranche
        (<a href="mailto:sylvain.labranche@cmontmorency.qc.ca">sylvain.labranche@cmontmorency.qc.ca</a>)
      </p>
      <p>Dernière modification: [Insérer la date ici]</p>
    </footer>
  );
};

export default MainNavigation;
