import * as R from 'ramda';
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { font } from 'constants/variables';
import colors from 'constants/colors';
import ValidationError from '../validationError/ValidationError';

const errorShadow = '0 0 4px rgba(255, 0, 0, 0.5)';

const hasError = R.propSatisfies(R.complement(R.isNil), 'error');

const InputField = styled.input`
  width: ${props => (props.width ? props.width : 200)}px;
  height: 40px;
  border-radius: 4px;
  background-color: ${colors.trueWhite};
  border: solid 1px ${props => (hasError(props) ? colors.warningRed : colors.Grey)};
  font-family: ${font};
  font-weight: normal;
  font-size: 14px;
  color: ${colors.Black};
  padding: 12px;
  outline: none;
  box-sizing: border-box;
  box-shadow: ${props => hasError(props) && errorShadow};
  margin-bottom: ${props => props.error && '8px'};
  
  &::placeholder {
    color: ${colors.Grey};
  }
  
  &:hover {
    border: ${props => !props.disabled && !hasError(props) && `solid 2px ${colors.GreyHover}`};
    
    &::placeholder {
      color: ${props => !props.disabled && colors.GreyHover};
    }
  }
  
  &:focus {
    border: ${props => !props.disabled && !hasError(props) && `solid 1px ${colors.Blue}`};
  }
  
  &:disabled {
    background-color: ${colors.GreyLighter};
  }
  
  ${props => props.fullSize && 'width: 100%;'}
  
  ${({ micro }) => micro && css`
    font-size: 11px;
    line-height: 11px;
    width: 108px;
    height: 24px;
    padding: 6px;
  `}
`;

const InputWrapper = styled.div`
  ${({ micro }) => micro && css`
    width: 108px;
  `}  
`;

function Input(props) {
  return (
    <InputWrapper micro={props.micro}>
      <InputField {...props} />
      <ValidationError error={props.error} />
    </InputWrapper>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  fullSize: PropTypes.bool,
  micro: PropTypes.bool,
  width: PropTypes.number,
};

Input.defaultProps = {
  className: null,
  error: null,
  fullSize: false,
  micro: false,
  width: null,
};

export default Input;
