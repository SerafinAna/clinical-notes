import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NoteItem from "../components/Note/NoteItem";

const NotesScreen: React.FC = () => {
  const [noteItems, setNoteItems] = useState<Note[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const createNotesItems = () => {
      const navButtons: ButtonType[] = [
        {
          subLabel: "Elaborate",
          children: <span>{"\u21B3"}</span>,
          title: "enter",
          onClick: handleExpand,
        },
        {
          subLabel: "Next",
          children: <span>{"\u2193"}</span>,
          onClick: onNextButtonPress,
        },
        {
          subLabel: "Previous",
          children: <span>{"\u2191"}</span>,
          onClick: onPreviousButtonPress,
        },
        {
          title: "/",
          subLabel: "N/A",
        },
      ];

      const numberButtons: ButtonType[] = [
        {
          title: "1",
          subLabel: "1",
        },
        {
          title: "9",
          subLabel: "9",
        },
      ];
      const notes: Note[] = [
        {
          header: "Owner concerns",
          value: "None",
          navigationButtons: [navButtons[0], navButtons[1], navButtons[3]],
          stateItems: [
            {
              title: "Bright,Alert & Responsive",
              value: 1,
              onClick: onStateButtonPress,
            },
            {
              title: "Moderately depressed & inactive",
              value: 2,
              onClick: onStateButtonPress,
            },
            {
              title: "Very depressed & inactive",
              value: 3,
              onClick: onStateButtonPress,
            },
            {
              title: "Other",
              value: 0,
              onClick: onStateButtonPress,
            },
          ],
        },
        {
          header: "Mentation",
          value: "BAR",
          hasNumberChoice: true,
          navigationButtons: [
            ...numberButtons,
            navButtons[1],
            navButtons[2],
            navButtons[3],
          ],
        },
        {
          header: "BCS",
          value: "-",
          hasNumberChoice: true,
          navigationButtons: [
            ...numberButtons,
            navButtons[1],
            navButtons[2],
            navButtons[3],
          ],
        },
        {
          header: "Posture",
          value: "Normal",
          navigationButtons: navButtons,
        },
        {
          header: "Hydration",
          value: "Adequate",
          navigationButtons: navButtons,
        },
        { header: "C/S", value: "None", navigationButtons: navButtons },
        { header: "V/D", value: "None", navigationButtons: navButtons },
        { header: "DUDE", value: "Normal", navigationButtons: navButtons },
        { header: "Eyes", value: "OK", navigationButtons: navButtons },
        { header: "Ears", value: "OK", navigationButtons: navButtons },
        {
          header: "Nose",
          value: "OK",
          navigationButtons: [navButtons[0], navButtons[2], navButtons[3]],
        },
      ];
      setNoteItems(notes);
    };

    if (noteItems.length === 0) createNotesItems();
  }, []);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onNextButtonPress = () => {
    setActiveIndex(activeIndex + 1);
  };

  const onPreviousButtonPress = () => {
    setActiveIndex(activeIndex - 1);
  };

  const onStateButtonPress = (value: number) => {
    if (value === 0) {
      setIsEditMode(true);
      return;
    }
    const keyNumber = Number(value);
    updateStateItemValue(keyNumber - 1);
    setIsExpanded(false);
  };

  const updateStateItemValue = (index: number) => {
    const { stateItems = [] } = noteItems[activeIndex];
    if (!stateItems?.length || stateItems.length < index) return;
    noteItems[activeIndex] = {
      ...noteItems[activeIndex],
      value: stateItems[index].title,
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;

    switch (key) {
      case "ArrowDown": {
        !isExpanded &&
          setActiveIndex((activeIndex) =>
            activeIndex === noteItems.length - 1 || isExpanded
              ? activeIndex
              : activeIndex + 1
          );
        break;
      }
      case "ArrowUp": {
        !isExpanded &&
          setActiveIndex((activeIndex) =>
            activeIndex === 0 ? 0 : activeIndex - 1
          );
        break;
      }
      case "Enter": {
        if (!isExpanded === false) {
          setIsEditMode(false);
          setActiveIndex(activeIndex + 1);
        }
        setIsExpanded(!isExpanded);
        break;
      }
      case "Escape": {
        setIsExpanded(false);
        setIsEditMode(false);
        break;
      }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        const keyNumber = Number(key);
        const { stateItems = [], hasNumberChoice = false } =
          noteItems[activeIndex];

        if (!stateItems?.length && hasNumberChoice) {
          noteItems[activeIndex] = {
            ...noteItems[activeIndex],
            value: keyNumber.toString(),
          };

          setActiveIndex(activeIndex + 1);
          return;
        }
        if (isExpanded && !isEditMode) {
          updateStateItemValue(keyNumber - 1);
          setIsExpanded(false);
          setActiveIndex(activeIndex + 1);
        }

        break;
      }
      case "0": {
        const { stateItems = [], hasNumberChoice = false } =
          noteItems[activeIndex];
        if (!stateItems?.length && hasNumberChoice) return;
        setIsEditMode(true);
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setActiveIndex, handleKeyDown]);

  const handleSaveValue = (value: string | null, index: number) => {
    noteItems[index].value = value;
  };

  const handleToggleExpanded = (value: boolean) => {
    setIsExpanded(value);
  };

  return (
    <Border>
      {noteItems.map((item, index) => {
        const { header, value, navigationButtons, stateItems } = item;

        return (
          <NoteItem
            key={`${header}`}
            index={index}
            header={header}
            value={value}
            stateItems={stateItems}
            isInFocus={activeIndex === index}
            isInEditMode={isEditMode && activeIndex === index}
            isExpanded={isExpanded && activeIndex === index}
            isLast={index === noteItems.length - 1}
            navigationButtons={navigationButtons}
            onSaveValue={handleSaveValue}
            onToggleExpand={handleToggleExpanded}
          />
        );
      })}
    </Border>
  );
};

const Border = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px !important;
`;

export default NotesScreen;
