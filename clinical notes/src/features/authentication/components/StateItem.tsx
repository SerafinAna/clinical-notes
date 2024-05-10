import styled from "styled-components";
import Button from "./Button";

export interface StateItemProps {
  title: string;
  value: number;
  onClick: (value: number) => void;
}

const StateItem: React.FC<React.PropsWithChildren<StateItemProps>> = ({
  title,
  value,
  onClick,
}) => {
  const handleOnClick = () => {
    return onClick(value);
  };

  return (
    <StateItemWrapper>
      <TitleWrapper className="text-xs text-gray-500">{title}</TitleWrapper>
      <Button title={value} onClick={handleOnClick} />
    </StateItemWrapper>
  );
};

const StateItemWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin-bottom: 5px;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export default StateItem;
