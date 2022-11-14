import styled from 'styled-components';

type inputProps = {
  primary?: boolean;
  cancel?: boolean;
};

const Input = styled.input<inputProps>`
  font-size: 20px;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 2px;
  margin: 5px;
  background: ${(props) => (props.primary ? 'blue' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'blue')};
  outline: none;
`;

export { Input };
