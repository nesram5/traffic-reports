import { fetchTrafficDataFromDB }  from '../handlerDB/fetch';
import { autoGetReport } from '../traffic-report/main';  

//Automatic execute functions
async function executeEvery30Min() {
    await autoGetReport();    
    console.log("Function executed at:", new Date());
}

async function executeEvery5Min() {
  fetchTrafficDataFromDB();
  console.log("Function executed at:", new Date());
}

function getTimeUntilNextExecution(interval: number) {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();    
  const minutesRemaining = interval - (minutes % interval);
  let total = (minutesRemaining * 60 * 1000) - (seconds * 1000 + milliseconds)
  
  total = total - 300000;
  
  // Calculate the time in milliseconds until the next execution
  return (total)
}

export function scheduleExecution() {
  const timeUntilNext30MinExecution = getTimeUntilNextExecution(30);
  const timeUntilNext5MinExecution = getTimeUntilNextExecution(5);
  
  // Schedule the first execution of the 30-minute function
  setTimeout(() => {
      executeEvery30Min();
      setInterval(executeEvery30Min, 30 * 60 * 1000); // Run every 30 minutes
  }, timeUntilNext30MinExecution);

  // Schedule the first execution of the 15-minute function
  setTimeout(() => {
      executeEvery5Min();
      setInterval(executeEvery5Min, 5 * 60 * 1000); // Run every 15 minutes
  }, timeUntilNext5MinExecution);
}