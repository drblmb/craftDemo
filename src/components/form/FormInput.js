import React from 'react';
import * as R from 'ramda';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import { Input } from 'components';

export default function FormInput(props) {
  const error = props.meta.touched && !R.isNil(props.meta.error) ? props.meta.error : null;

  return (
    <Input
      type={props.type}
      error={error}
      name={props.input.name}
      value={props.input.value}
      onChange={props.input.onChange}
      onBlur={props.input.onBlur}
      {...props}
    />
  );
}

FormInput.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  type: PropTypes.string,
};

FormInput.defaultProps = {
  type: 'text',
};
