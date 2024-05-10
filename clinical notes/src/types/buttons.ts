type ButtonType = {
  title?: string;
  subLabel?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

type ButtonsType = { buttons: ButtonType[] };
