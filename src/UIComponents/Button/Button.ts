import styled from 'styled-components';

const Button = styled.button`
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
const PrimaryButton = styled(Button)`
  background: #0ac2ff;
  color: white;
`;
const CancelButton = styled(Button)`
  background: red;
  color: white;
`;

export { Button, PrimaryButton, CancelButton };
