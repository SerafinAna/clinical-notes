interface NoteHeaderProps {
  value: string;
}

const NoteHeader: React.FC<React.PropsWithChildren<NoteHeaderProps>> = ({
  value,
}) => {
  return <div className="text-base font-semibold">{value}</div>;
};

export default NoteHeader;
