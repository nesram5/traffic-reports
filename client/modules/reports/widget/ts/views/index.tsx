import React from 'react';
import './css/global.scss';
import { useState } from 'react';
import { TrafficReportDropDown } from '../../../../list/drop-down-list';
import { GetReport } from '../../../../get/get-report';
import { Login } from '../../../../login/login';
import { ConfigurationPage } from '../../../../config/configPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link // Import the Link component
} from "react-router-dom";

export /*bundle*/
function View() {
  const [showGetReport, setShowGetReport] = useState(false); // State to control the visibility of GetReport

  return (
    <Router>
      <div className="parent">
        <div className="main-section">
          <Routes>
          <Route path="/config" element={<ConfigurationPage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <>
              {/* Link to the Login page */}
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/config" className="config-link">
                Configuration
              </Link>
                <div className="title-and-button"> 
                  <h1>Reportes de tráfico por hora</h1>
                  <button onClick={() => setShowGetReport(true)} className="generate-button">
                    Generar ahora
                  </button>
                  
                </div>
                {showGetReport && (
                  <div className="report-section">
                    <GetReport />
                  </div>
                )}
                <TrafficReportDropDown /> 
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default View;
