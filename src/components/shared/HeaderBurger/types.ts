export type IHeaderBurgerProps = {
  isOpen: boolean;
  expanded: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleExpanded: (nextValue?: boolean) => void;
};
