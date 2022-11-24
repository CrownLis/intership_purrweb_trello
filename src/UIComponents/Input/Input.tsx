import React, { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';


const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <Root {...props}/>
  );
};

const Root = styled.input`
  font-size: 20px;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 2px;
  margin: 5px;
  outline: none;
`;

export default Input ;
