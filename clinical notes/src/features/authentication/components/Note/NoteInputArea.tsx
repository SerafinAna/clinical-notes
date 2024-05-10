import { useEffect, useRef } from "react";
import styled from "styled-components";
import Buttons from "../Buttons";

interface NoteInputAreaProps {
  isVisible: boolean;
  placeholder?: string;
  buttons: ButtonType[];
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  refNote?: React.LegacyRef<HTMLTextAreaElement>;
}
const NoteInputArea: React.FC<React.PropsWithChildren<NoteInputAreaProps>> = ({
  isVisible,
  refNote,
  placeholder,
  value,
  onChange,
  onKeyDown,
  buttons,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current === null) return;
    const textInput = textAreaRef.current;
    const len = value ? value.length : 0;

    if (textInput) textInput.setSelectionRange(len, len);
  }, []);

  if (!isVisible) return null;
  return (
    <TextareaWrapper>
      <textarea
        ref={refNote}
        id="message"
        autoFocus={true}
        rows={5}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
      <SaveButtonsWrapper>
        <Buttons buttons={buttons} isVisible={true} />
      </SaveButtonsWrapper>
    </TextareaWrapper>
  );
};

const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SaveButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 25%;
`;

export default NoteInputArea;
