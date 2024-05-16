import Button from "./Button";
import styled from "styled-components";

interface ButtonsProps {
  buttons?: ButtonType[];
  isVisible: boolean;
}

const Buttons: React.FC<React.PropsWithChildren<ButtonsProps>> = ({
  buttons,
  isVisible,
}) => {
  if (!isVisible || !buttons) return null;
  return (
    <ButtonsWrapper>
      {buttons.map((button) => {
        const { title, subLabel, onClick, children } = button;
        return (
          <ButtonWrapper key={`${subLabel}`}>
            <Button title={title} subLabel={subLabel} onClick={onClick}>
              {children}
            </Button>
          </ButtonWrapper>
        );
      })}
    </ButtonsWrapper>
  );
};

export default Buttons;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin-right: 5px;
`;
