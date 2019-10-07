import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from 'constants/colors';
import { font } from 'constants/variables';

const errorIcon = 'icon-pp-validation-alert-11x12';

const Error = styled.div`
  font-family: ${font};
  color: ${colors.warningRed};
  font-size: 12px;
  font-weight: 300;
`;

const ErrorIcon = styled.span`
  margin-left: 0;
  margin-right: 8px;
`;

function ValidationError(props) {
  if (props.error) {
    return (
      <Error>
        <ErrorIcon className={errorIcon} />
        {props.error}
      </Error>
    );
  }

  return null;
}

ValidationError.propTypes = {
  error: PropTypes.string,
};

ValidationError.defaultProps = {
  error: null,
};

export default ValidationError;
