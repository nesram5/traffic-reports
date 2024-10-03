import { fetchTrafficDataFromDatabase }  from '../handlerDB/handler';
import { autoGetReport } from '../../modules/trafficReport/main';  

//Automatic execute functions
async function executeEvery30Min() {
    await autoGetReport();    
    fetchTrafficDataFromDatabase();
    console.log("Function executed at:", new Date());
}

async function executeEvery15Min() {
  console.log("Function executed at:", new Date());
}
  
function getTimeUntilNextExecution(interval: number) {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();    
  const minutesRemaining = interval - (minutes % interval);
  
  // Calculate the time in milliseconds until the next execution
  return (minutesRemaining * 60 * 1000) - (seconds * 1000 + milliseconds);
}

export function scheduleExecution() {
  const timeUntilNext30MinExecution = getTimeUntilNextExecution(30);
  const timeUntilNext15MinExecution = getTimeUntilNextExecution(15);
  
  // Schedule the first execution of the 30-minute function
  setTimeout(() => {
      executeEvery30Min();
      setInterval(executeEvery30Min, 30 * 60 * 1000); // Run every 30 minutes
  }, timeUntilNext30MinExecution);

  /*// Schedule the first execution of the 15-minute function
  setTimeout(() => {
      executeEvery15Min();
      setInterval(executeEvery15Min, 15 * 60 * 1000); // Run every 15 minutes
  }, timeUntilNext15MinExecution);*/
}