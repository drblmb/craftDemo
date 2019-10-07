import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'constants/colors';
import { themeProp, switchThemeProp } from 'lib/componentUtils';

const chbShadow = '0 3px 5px 0 #ededed';

const CheckboxOuter = styled.div.attrs({
  role: 'checkbox',
  tabIndex: 0,
})`
  border-radius: 4px;
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  vertical-align: bottom;
  width: ${themeProp('checkbox.size')}px;
  height: ${themeProp('checkbox.size')}px;
  min-width: ${themeProp('checkbox.size')}px;
  min-height: ${themeProp('checkbox.size')}px;
  box-shadow: ${themeProp('checkbox.shadow')};
  background-color: ${props => (props.checked ? themeProp('checkbox.selectedBgColor') : colors.trueWhite)};
  border: solid 1px ${switchThemeProp('checked', 'checkbox.selectedBgColor', 'checkbox.borderColor')};
`;

CheckboxOuter.defaultProps = {
  theme: {
    checkbox: {
      size: 18,
      borderColor: colors.Grey,
      selectedBgColor: colors.Blue,
      shadow: chbShadow,
    },
  },
};

const Icon = styled.span.attrs({
  className: 'icon-tablerow-check',
})`
  position: relative;
  color: ${themeProp('checkbox.iconColor')};
  ${themeProp('checkbox.iconPosition')}
  
`;

Icon.defaultProps = {
  theme: {
    checkbox: {
      iconColor: colors.trueWhite,
      iconPosition: `
        top: -8px;
        left: -9px;
        font-size: 25px;
      `,
    },
  },
};

function Checkbox(props) {
  return (
    <CheckboxOuter
      disabled={props.disabled}
      onClick={() => !props.disabled && props.onClick()}
      checked={props.checked}
    >
      {props.checked && <Icon />}
    </CheckboxOuter>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  checked: false,
  onClick: () => {},
  disabled: false,
};

export default Checkbox;
