export type StopWatch = {
  isPaused?: boolean;
};

export interface ITimer {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  isNotValid: boolean;
  setIsNotValid: React.Dispatch<React.SetStateAction<boolean>>;
}
