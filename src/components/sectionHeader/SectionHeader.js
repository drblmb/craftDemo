import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'constants/colors';
import { childrenPropType } from 'constants/propTypes';

const Header = styled.div`
  border-bottom: 1px solid ${colors.Grey};
  height: 48px;
  display: flex;
  align-items: center;
  background-color: ${colors.BlueLighter};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled.h2`
  color: ${colors.Black};
  font-weight: 600;
  font-size: 24px;
  margin-left: 16px;
  padding: 0;
`;

export default function SectionHeader(props) {
  return (
    <Header className={props.className}>
      <Title>{props.title}</Title>
      <Actions>
        {props.children}
      </Actions>
    </Header>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string,
  children: childrenPropType,
  className: PropTypes.string,
};

SectionHeader.defaultProps = {
  title: null,
  children: null,
  className: null,
};
