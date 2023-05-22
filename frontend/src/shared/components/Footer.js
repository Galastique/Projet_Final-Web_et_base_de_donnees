import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Footer.css";

const Footer = (props) => {
  const [date, setDate] = useState();
	// eslint-disable-next-line no-unused-vars
	const { error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
		const fetchModifications = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "modifications"
				);
				setDate(responseData.modifications[0].date);
			} catch (err) {}
		};
		fetchModifications();
	}, [sendRequest]);

  return (
    <footer className="main_footer">
      <p className="main_footer-coordinator">
        Coordonnateur des stages: Sylvain Labranche (
        <a
          href="mailto:sylvain.labranche@cmontmorency.qc.ca"
          className="main_footer-coordinator_link"
        >
          sylvain.labranche@cmontmorency.qc.ca
        </a>
        )
      </p>
      <p className="main_footer-changes">
        Dernière modification: {date}
      </p>
    </footer>
  );
};

export default Footer;
