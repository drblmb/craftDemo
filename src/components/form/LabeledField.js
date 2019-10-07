import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Label from './Label';

const LabeledFieldWrapper = styled.div`
  margin-bottom: 8px;
  margin-left: 32px;
  flex: 1;
  display: flex;
  justify-content: space-between;

  & > label {
    ${props => props.labelWithMargin && 'margin-bottom: 8px;'}
  }
`;

export default function LabeledField(props) {
  const {
    required,
    label,
    name,
    component,
    validate,
    ...rest
  } = props;
  return (
    <LabeledFieldWrapper className={props.className} labelWithMargin={props.labelWithMargin}>
      <Label required={required}>{label}</Label>
      <Field
        name={name}
        component={component}
        validate={validate}
        {...rest}
      />
    </LabeledFieldWrapper>
  );
}

LabeledField.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
  className: PropTypes.string,
  labelWithMargin: PropTypes.bool,
};

LabeledField.defaultProps = {
  label: null,
  required: false,
  validate: () => {},
  className: null,
  labelWithMargin: false,
};
