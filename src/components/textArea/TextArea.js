import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { font } from 'constants/variables';
import colors from 'constants/colors';
import ValidationError from '../validationError/ValidationError';

const errorShadow = '0 0 4px rgba(255, 0, 0, 0.5)';

// TODO: Would probably like to make the textArea change size automatically
const TextField = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  border: solid 1px ${props => (props.error ? colors.warningRed : colors.Grey)};
  font-family: ${font};
  font-weight: normal;
  font-size: 14px;
  color: ${colors.Black};
  padding: 12px;
  outline: none;
  box-sizing: border-box;
  box-shadow: ${props => props.error && errorShadow};
  margin-bottom: ${props => props.error && '8px'};
  resize: none;
  
  &::placeholder {
    color: ${colors.Grey};
  }
  
  &:hover {
    border: ${props => !props.disabled && !props.error && `solid 2px ${colors.GreyHover}`};
    
    &::placeholder {
      color: ${props => !props.disabled && colors.GreyHover};
    }
  }
  
  &:focus {
    border: ${props => !props.disabled && !props.error && `solid 1px ${colors.Blue}`};
  }
  
  &:disabled {
    background-color: ${colors.GreyLighter};
  }
  
  ${props => props.width && css`
    width: ${props.width}px;
  `}
`;

export default function TextArea(props) {
  return (
    <div>
      <TextField {...props} />
      <ValidationError error={props.error} />
    </div>
  );
}

TextArea.propTypes = {
  error: PropTypes.string,
  width: PropTypes.number,
};

TextArea.defaultProps = {
  error: null,
  width: null,
};
