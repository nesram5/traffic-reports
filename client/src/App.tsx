import './css/global.scss';
import { useState } from 'react';
import { TrafficReportDropDown } from './modules/reports/list/drop-down-list';
import { GetReport } from './modules/reports/get/get-report';

function App() {
  const [showGetReport, setShowGetReport] = useState(false);
  document.title = "Traffic Reports Netcom";
  return (
      <main className="parent">
        <section className="main-section">
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
        </section>
      </main>
   
  );
}

export default App;
