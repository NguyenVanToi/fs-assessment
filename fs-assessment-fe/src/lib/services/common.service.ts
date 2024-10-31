import { TimerBakery } from "../interface";

export const convertBakeryTimer = (timer: TimerBakery): string => {
  if (typeof timer === 'number') {
    return convertTimer(timer);
  }

  let result: string = '';
  if (timer.from) result += `${convertTimer(timer.from)} to `;
  if (timer.to) result += convertTimer(timer.to);

  return result;
}

export const convertTimer = (value: number): string => {
  const hours = Math.floor(value / 60);
    const mins = value % 60;
    const hourText = hours === 1 ? `${hours} hr` : hours > 0 ? `${hours} hrs` : '';
    const minText = mins === 1 ? `${mins} mins` : mins > 0 ? `${mins} mins` : '';
    
    return `${hourText} ${minText}`.trim();
}