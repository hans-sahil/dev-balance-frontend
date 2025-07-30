const convertMinutesToHoursAndMinutes = (totalMinutes : number) : string=> {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if(hours > 0){
    return `${hours} ${hours > 1 ? 'hrs' : 'hr'}  ${minutes} min`
  }
  return `${minutes} min`;
}

export default convertMinutesToHoursAndMinutes;