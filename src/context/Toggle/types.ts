export interface IToggleContext {
  expanded: boolean;
  toggleExpanded: (nextValue?: boolean) => void;
}
