import React from 'react';
import styled from 'styled-components';

const ScrollBox = ({ children }) => (
    <Wrapper>
      {children}
    </Wrapper>
  );

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 0 5px;
`;

export default ScrollBox;
