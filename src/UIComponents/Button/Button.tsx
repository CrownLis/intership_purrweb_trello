import { ButtonHTMLAttributes, FC, HTMLProps, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

type ButtonType = PropsWithChildren<{
  buttonType?: 'primary' | 'cancel'
} & ButtonHTMLAttributes<HTMLButtonElement>>


const Button: FC<ButtonType> = ({ buttonType, children, ...props }) => {
  return (
    <Root buttonType={buttonType} {...props}>
      {children}
    </Root>
  )
}

export default Button

const Root = styled.button<ButtonType>`
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

  ${props => props.buttonType === 'primary' && css`
background-color:blue;
color:white;
`}

${props => props.buttonType === 'cancel' && css`
background-color:red,
color"white;
`}
`;