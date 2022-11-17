import { FC, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';

type TextAreaType = {
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea: FC<TextAreaType> = ({...props}) => {
  return (
    <Root {...props}/>
  )
}

export default TextArea

const Root = styled.textarea<TextAreaType>`
  border: 0px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  resize: none;
  margin: 5px 10px;
  padding: 6px;
`;