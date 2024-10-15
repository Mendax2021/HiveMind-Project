export function pastTimeCalc(date: string): string {
  const currentTime = new Date();
  const dateToCalc = new Date(date);

  const delta: number = currentTime.getTime() - dateToCalc.getTime();

  const msInMinutes = 1000 * 60;
  const msInHour = msInMinutes * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;
  if (delta < msInHour) {
    const minutes = Math.floor(delta / msInMinutes);
    return `${minutes}m fa`;
  } else if (delta < msInDay) {
    const hours = Math.floor(delta / msInHour);
    return `${hours}h fa`;
  } else if (delta < msInWeek) {
    const days = Math.floor(delta / msInDay);
    return `${days}g fa`;
  } else {
    const weeks = Math.floor(delta / msInWeek);
    return `${weeks}sett. fa`;
  }
}
