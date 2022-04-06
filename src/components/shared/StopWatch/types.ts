export interface ITimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  isNotValid: boolean;
  setIsNotValid: React.Dispatch<React.SetStateAction<boolean>>;
}
