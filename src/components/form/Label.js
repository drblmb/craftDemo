import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'constants/colors';

const LabelBase = styled.label`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 4px;
  display: inline-block;
  
  & span.required {
    color: ${colors.warningRed};
    display: inline-block;
    margin-left: 4px;
  }
`;

export default function Label(props) {
  return (
    <LabelBase>
      {props.children}{props.required && <span className="required">*</span>}
    </LabelBase>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
};

Label.defaultProps = {
  required: false,
};
