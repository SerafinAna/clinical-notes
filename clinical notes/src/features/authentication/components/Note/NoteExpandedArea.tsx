import StateItems from "../StateItems";
import NoteInputArea from "./NoteInputArea";
import styled from "styled-components";

interface NoteExpandedAreaProps {
  isVisible: boolean;
  isInputAreaVisible: boolean;
  placeholder?: string;
  buttons: ButtonType[];
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  refNote: React.LegacyRef<HTMLTextAreaElement>;
  stateItems?: any[];
}
const NoteExpandedArea: React.FC<
  React.PropsWithChildren<NoteExpandedAreaProps>
> = ({
  isVisible,
  isInputAreaVisible,
  refNote,
  placeholder,
  value,
  onChange,
  onKeyDown,
  buttons,
  stateItems,
}) => {
  if (!isVisible) return null;
  return (
    <ExpandedWrapper>
      <NoteInputArea
        isVisible={isInputAreaVisible}
        refNote={refNote}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        buttons={buttons}
      />

      {!!stateItems && !isInputAreaVisible && <StateItems items={stateItems} />}
    </ExpandedWrapper>
  );
};
const ExpandedWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default NoteExpandedArea;
