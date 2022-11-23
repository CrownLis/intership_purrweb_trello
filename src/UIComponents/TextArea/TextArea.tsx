import React, { FC, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({...props}) => {
  return (
    <Root {...props}/>
  );
};

export default TextArea;

const Root = styled.textarea`
  border: 0px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  resize: none;
  margin: 5px 10px;
  padding: 6px;
  outline:none;
  border:1px solid transparent;
  &:hover {
    border:1px solid var(--light-color)
  }
`;