import React,{ ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import styled from "styled-components";

type ButtonType = PropsWithChildren<{

} & ButtonHTMLAttributes<HTMLButtonElement>>


const Button: FC<ButtonType> = ({ children, ...props }) => {
  return (
    <Root {...props}>
      {children}
    </Root>
  );
};

export default Button;

const Root = styled.button`
  font-size: 16px;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  background: white;
  color: black;
  &:hover {
    box-shadow: 2px 2px 4px black;
  }
`;