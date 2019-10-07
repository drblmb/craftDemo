import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components';
import { fieldInputPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 280px;
`;

const Label = styled.label`
  cursor: pointer;
  margin-left: 12px;
`;

export default function FormCheckbox(props) {
  const value = !!R.path(['input', 'value'], props);
  return (
    <Container onClick={() => props.input.onChange(!value)}>
      <Checkbox
        checked={value}
        {...props}
      />
      {props.label && <Label>{props.label}</Label>}
    </Container>
  );
}

FormCheckbox.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
};

FormCheckbox.defaultProps = {
  label: null,
};
