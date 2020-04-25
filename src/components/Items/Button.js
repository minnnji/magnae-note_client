import styled from 'styled-components';
import theme from '../../constants/theme';

const Button = styled.button`
  border-radius: .5em;
  padding: 5px;
  min-width: 120px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  color: ${props => (props.blueText ? `${theme.COLOR_BLUE}` : `${theme.COLOR_WHITE}`)};
  border: 1px solid ${props => (props.blueLine ? `${theme.COLOR_BLUE}` : `${theme.COLOR_WHITE}`)};
  background-color: ${props => (props.gray ? `${theme.BG_COLOR_4}` : `${theme.BG_COLOR_3}`)};
`;

export default Button;
