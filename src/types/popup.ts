export type PopupProps = {
  title?: string;
  isClose?: boolean;
  expanded: boolean;
  className?: string;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};
