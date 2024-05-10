import styled from "styled-components";

export interface ButtonProps {
  title?: string | number;
  subLabel?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  title,
  subLabel,
  children,
  onClick,
}) => {
  return (
    <ButtonWrapper>
      <button
        onClick={onClick}
        type="button"
        className="text-gray-900 justify-center bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-2 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 h-10 w-10"
      >
        <Content>
          {children} {title}
        </Content>
      </button>
      {!!subLabel && (
        <div
          style={{ display: "flex", flex: 1 }}
          className="text-xs text-gray-500"
        >
          {subLabel}
        </div>
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Button;
