export type HistoryValidation = {
  history: string[];
  setHistory(data: string[]): void;
  back: () => void;
};

export type HistoryProps = {
  children: React.ReactNode;
};
