interface NoteValueProps {
  value: string | null;
  isVisible: boolean;
}
const NoteValue: React.FC<React.PropsWithChildren<NoteValueProps>> = ({
  value,
  isVisible,
}) => {
  if (!isVisible) return null;
  return <div className="font-normal text-gray-500">{value}</div>;
};
export default NoteValue;
