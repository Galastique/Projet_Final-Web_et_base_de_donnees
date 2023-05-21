import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const PagePersonnelleEtudiant = (props) => {
    const numeroDA = useParams().numeroDA;

    return (
        <div>TODO PagePersonnelleEtudiant de {numeroDA}
            <p>TODO TROUVER COMMENT LIER UN ÉTUDIANT À UN COMPTE, ETC.</p>
        </div>
    );
};

export default PagePersonnelleEtudiant;
