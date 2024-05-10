type Note = {
  header: string;
  value: string | null;
  hasNumberChoice?: true;
  navigationButtons: ButtonType[];
  stateItems?: StatItemType[];
};

type StatItemType = {
  title: string;
  value: string | number;
  onClick: (value: number) => void;
};
