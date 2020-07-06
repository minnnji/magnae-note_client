import styled from 'styled-components';

const Input = styled.input`
  display: block;
  margin: 1em 0;
  width: ${props => (props.short ? '260px' : '300px')};
  height: 40px;
  font-size: .9em;
  padding: 0 .5em;
`;

export default Input;
