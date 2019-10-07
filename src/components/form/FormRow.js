import styled from 'styled-components';

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: 8px;
  
  & > * {
    margin-right: 8px;
  }
`;

export default FormRow;
