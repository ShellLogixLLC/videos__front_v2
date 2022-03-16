export type HeaderBurgerProps = {
  isOpen: boolean;
  expanded: boolean;
  setExpanded: (argument: boolean) => void;
  closeHandler: () => void;
};
