import styled from 'styled-components';
import theme from '../../constants/theme';

export const Button = styled.button`
  display: ${props => (props.inline ? 'inline' : 'block')};
  padding: 8px 13px;
  margin: 0 10px;
  width: fit-content;
  border-radius: .5em;
  min-width: 100px;
  color: white;
  font-size: 1em;
  cursor: pointer;
  color: ${theme.COLOR_WHITE};
  border: 1px solid ${theme.COLOR_WHITE};
  background-color: ${theme.BG_COLOR_3};
`;

export const BlueButton = styled(Button)`
  border: 1px solid ${theme.COLOR_BLUE};
  color: ${theme.COLOR_BLUE};
`;

export const GrayButton = styled(Button)`
  color: ${theme.COLOR_GRAY};
  border: 1px solid ${theme.COLOR_GRAY}
  background-color: ${theme.BG_COLOR_4};
`;

export const MiddleButton = styled(Button)`
  padding: 10px 15px;
  margin: 5px 10px;
  min-width: 150px;
`;

export const BigButton = styled(Button)`
  padding: 13px 15px;
  margin: 5px 10px;
  min-width: 250px;
`;

export const BigBlueFilledButton = styled(BigButton)`
  border: none;
  background-color: ${theme.COLOR_BLUE};
  color: ${theme.BG_COLOR_4};
`;
