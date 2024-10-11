import React, { useState } from 'react';
import { Link } from 'pragmate-ui/components';
import { TrafficReportDropDown } from './components/drop-down-list';
import { GetReport } from './components/get-reports';
import { Button } from 'pragmate-ui/components';

export /*bundle*/ function View(): JSX.Element {
	const [showGetReport, setShowGetReport] = useState(false);
  
	return (
		<main className="parent">
			<div className="main-section">
				<nav className="content-links">
					<Link href="/login" className="login-link">
						Login
					</Link>
					<Link href="/config" className="config-link">
						Configuration
					</Link>
				</nav>
				<section className="title-and-button"> 
					<h1>Reportes de tráfico por hora</h1>
					<Button variant="secondary" onClick={() => setShowGetReport(true)} className="generate-button">
						Generar ahora
					</Button>
				</section>
				{showGetReport && (
					<div className="report-section">
						<GetReport />
					</div>
				)}
				<TrafficReportDropDown /> 			  
			</div>
		</main>
	);
  }
  
  
