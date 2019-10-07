import React from 'react';
import * as R from 'ramda';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import { TextArea } from 'components';

export default function FormTextArea(props) {
  const error = props.meta.touched && !R.isNil(props.meta.error) ? props.meta.error : null;

  return (
    <TextArea
      error={error}
      name={props.input.name}
      value={props.input.value}
      onChange={props.input.onChange}
      onBlur={props.input.onBlur}
      {...props}
    />
  );
}

FormTextArea.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};
