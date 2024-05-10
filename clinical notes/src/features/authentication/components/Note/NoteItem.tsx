import { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { Buttons } from "../idex";
import NoteHeader from "./NoteHeader";
import NoteValue from "./NoteValue";
import NoteExpandedArea from "./NoteExpandedArea";

interface NoteItemProps {
  index: number;
  header: string;
  value: string | null;
  isInFocus: boolean;
  isLast: boolean;
  isInEditMode: boolean;
  isExpanded: boolean;
  navigationButtons: ButtonType[];
  stateItems?: any[];
  onSaveValue: (value: string | null, index: number) => void;
  onToggleExpand: (isExpanded: boolean) => void;
}

const NoteItem: React.FC<React.PropsWithChildren<NoteItemProps>> = ({
  index,
  header,
  value,
  isInFocus,
  isInEditMode,
  isExpanded,
  isLast,
  navigationButtons,
  stateItems,
  onSaveValue,
  onToggleExpand,
}) => {
  const [inputValue, setInputValue] = useState<string | null>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleUndoValue = () => {
    onToggleExpand(!isExpanded);
    setInputValue(value);
  };

  const handleExpand = () => {
    onToggleExpand(!isExpanded);
  };

  const saveButtons: ButtonType[] = useMemo(() => {
    return [
      {
        subLabel: "Save & continue",
        children: <span>{"\u21B3"}</span>,
        title: "enter",
        onClick: handleExpand,
      },
      {
        subLabel: "Cancel",
        title: "esc",
        onClick: handleUndoValue,
      },
    ];
  }, []);

  useEffect(() => {
    !isInFocus && onToggleExpand(false);
  }, [isInFocus]);

  useEffect(() => {
    onToggleExpand(isInEditMode);
  }, [isInEditMode]);

  useEffect(() => {
    if (textAreaRef.current === null) return;
    const textInput = textAreaRef.current;
    const len = inputValue ? inputValue.length : 0;

    if (textInput) textInput.setSelectionRange(len, len);
  }, [isExpanded]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleTextOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { key } = e;
    switch (key) {
      case "Escape": {
        return handleUndoValue();
      }
      case "Enter": {
        return onSaveValue(inputValue, index);
      }
    }
  };

  return (
    <MainWrapper
      $isSelected={isInFocus}
      $isLast={isLast}
      $isFirst={index === 0}
    >
      <Wrapper>
        <NoteDetails>
          <NoteHeader value={header} />
          <NoteValue isVisible={!isExpanded} value={inputValue} />
          <NoteExpandedArea
            isVisible={isExpanded}
            isInputAreaVisible={isInEditMode || !stateItems?.length}
            placeholder={value ?? ""}
            buttons={saveButtons}
            value={inputValue ?? ""}
            onChange={handleTextOnChange}
            onKeyDown={handleOnKeyDown}
            stateItems={stateItems}
            refNote={textAreaRef}
          />
        </NoteDetails>
        <NoteNavigationButtonsWrapper>
          <Buttons
            buttons={navigationButtons}
            isVisible={isInFocus && !isExpanded}
          />
        </NoteNavigationButtonsWrapper>
      </Wrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div<{
  $isSelected: boolean;
  $isLast: boolean;
  $isFirst: boolean;
}>`
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#ebe5f5" : "white")};
  border-bottom-width: ${({ $isLast }) => ($isLast ? 0 : 1)}px;
  border-bottom-color: ${({ $isSelected }) =>
    $isSelected ? "#b19cd9" : "lightGray"};
  border-bottom-right-radius: ${({ $isLast }) => ($isLast ? 10 : 0)}px;
  border-bottom-left-radius: ${({ $isLast }) => ($isLast ? 10 : 0)}px;
  border-top-right-radius: ${({ $isFirst }) => ($isFirst ? 10 : 0)}px;
  border-top-left-radius: ${({ $isFirst }) => ($isFirst ? 10 : 0)}px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const NoteDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
`;

const NoteNavigationButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 40%;
`;

export default NoteItem;
