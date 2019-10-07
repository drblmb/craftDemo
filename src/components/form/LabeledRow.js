import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { childrenPropType } from 'constants/propTypes';

const Row = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  margin-top: 8px;
  margin-left: 32px;
  font-size: 20px;
`;

const ChildDiv = styled.div`
  margin-right: 195px;
`;

const Label = styled.label`
  font-weight: bold;
  width: 192px;
  margin-right: 8px;
`;

export default function LabeledRow(props) {
  return (
    <Row className={props.className}>
      <Label>{props.label}</Label>
      <ChildDiv>{props.children}</ChildDiv>
    </Row>
  );
}

LabeledRow.propTypes = {
  label: PropTypes.string,
  children: childrenPropType,
  className: PropTypes.string,
};

LabeledRow.defaultProps = {
  label: null,
  children: null,
  className: null,
};
