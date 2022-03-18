export type HeaderBurgerProps = {
  isOpen: boolean;
  expanded: boolean;
  toggleExpanded: (nextValue?: boolean) => void;
  closeHandler: () => void;
};
