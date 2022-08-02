export type PopupProps = {
  isClose?: boolean;
  expanded: boolean;
  className?: string;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};
