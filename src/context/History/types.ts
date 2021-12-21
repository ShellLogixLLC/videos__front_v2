export type HValidation = {
  history: string[];
  setHistory(data: string[]): void;
  back(): void;
};
export type HistoryProps = {
  children: React.ReactNode;
};
