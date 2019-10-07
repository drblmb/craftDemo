import styled, { css } from 'styled-components';
import colors from 'constants/colors';
import { darken } from 'polished';
import { themeProp, switchProp } from 'lib/componentUtils';

const Button = styled.button.attrs({
  type: 'button',
})`
  background-color: ${switchProp('primary', colors.Blue, colors.warningRed)};
  outline: none;
  cursor: ${switchProp('disabled', 'default', 'pointer')};
  border: none;
  color: ${props => (props.primary ? colors.trueWhite : themeProp('button.textColor'))};
  border-radius: ${themeProp('button.borderRadius')}px;
  padding: ${themeProp('button.padding')};
  font-size: ${themeProp('button.fontSize')}px;
  font-weight: ${themeProp('button.fontWeight')};
  margin: 20px;
  
  &:hover {
    background-color: ${switchProp('primary', darken(0.07, colors.Blue), darken(0.07, colors.GreyHover))};
  }
  
  &:active {
    background-color: ${switchProp('primary', darken(0.07, colors.Blue), darken(0.07, colors.GreyHover))};
    box-shadow: inset 0 2px 3px 0 ${switchProp('primary', darken(0.2, colors.Blue), darken(0.2, colors.GreyHover))};;
  }
  
  ${props => props.disabled && css`
    text-shadow: 0 1px 0 ${colors.trueWhite};
    background-color: ${colors.GreyLighter};
    color: ${colors.GreyHover};
    box-shadow: 0 0 0 0 ${colors.trueWhite};
    
    &:hover {
      background-color: ${colors.GreyHover};
    }
  `}
`;

Button.defaultProps = {
  theme: {
    button: {
      borderRadius: 6,
      padding: '10px 24px',
      fontSize: 14,
      fontWeight: 'normal',
      textColor: colors.trueWhite,
    },
  },
};

export default Button;
