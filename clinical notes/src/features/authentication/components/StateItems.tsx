import styled from "styled-components";
import StateItem from "./StateItem";

export interface StateItemsProps {
  items: any[];
}

const StateItems: React.FC<React.PropsWithChildren<StateItemsProps>> = ({
  items,
}) => {
  return (
    <StateItemsWrapper>
      {items.map((item) => {
        const { title, value, onClick } = item;
        return (
          <StateItem
            key={`${title}`}
            title={title}
            value={value}
            onClick={onClick}
          />
        );
      })}
    </StateItemsWrapper>
  );
};

const StateItemsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default StateItems;
