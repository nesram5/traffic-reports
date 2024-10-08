import { fetchTrafficDataFromDB }  from '../handlerDB/fetch';
import { autoGetReport } from '../traffic-report/main';  
// Automatic execute functions
async function executeTwicePerHour() {
  await autoGetReport();
  console.log("Function executed at:", new Date().toLocaleTimeString());
}

async function executeEvery5Min() {
  fetchTrafficDataFromDB();
  console.log("Function executed at:", new Date().toLocaleTimeString());
}

function getTimeUntilNextExecution(hourlyMinutes: number) {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Calculate minutes remaining until the next target time (hourlyMinutes)
  const minutesRemaining = (60 + hourlyMinutes - minutes) % 60;
  const total = (minutesRemaining * 60 * 1000) - (seconds * 1000 + milliseconds);

  return total;
}

export function scheduleExecution() {
  const firstTargetMinutes = 16; // 9 minutes before :25
  const secondTargetMinutes = 46; // 9 minutes before :55

  // Schedule the first execution of the function 9 minutes before :25
  const timeUntilNextFirstExecution = getTimeUntilNextExecution(firstTargetMinutes);
  setTimeout(() => {
      executeTwicePerHour();
      setInterval(executeTwicePerHour, 60 * 60 * 1000); // Repeat every hour
  }, timeUntilNextFirstExecution);

  // Schedule the second execution of the function 9 minutes before :55
  const timeUntilNextSecondExecution = getTimeUntilNextExecution(secondTargetMinutes);
  setTimeout(() => {
      executeTwicePerHour();
      setInterval(executeTwicePerHour, 60 * 60 * 1000); // Repeat every hour
  }, timeUntilNextSecondExecution);

  // Schedule the 5-minute execution
  const timeUntilNext5MinExecution = getTimeUntilNextExecution(5);
  setTimeout(() => {
      executeEvery5Min();
      setInterval(executeEvery5Min, 5 * 60 * 1000); // Run every 5 minutes
  }, timeUntilNext5MinExecution);
}