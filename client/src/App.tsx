import './css/global.scss';
import { useState } from 'react';
import { TrafficReportDropDown } from './modules/reports/test';
import { GetReport } from './modules/reports/get/get-report';

function App() {
  const [showGetReport, setShowGetReport] = useState(false); // State to control the visibility of GetReport

  return (
    <div className="parent">
      <div className="main-section">
      {showGetReport && (
          <div className="report-section">
            <GetReport />
          </div>
        )}
        <div className="title-and-button"> 
        <h1>Reportes de tráfico por hora</h1>
               

          <button onClick={() => setShowGetReport(true)} className="generate-button">
            Generar ahora
          </button>
        </div>
        <TrafficReportDropDown /> 
      </div>
    </div>
  );
}

export default App;