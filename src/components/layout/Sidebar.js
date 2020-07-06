import React from 'react';
import styled from 'styled-components';

const Sidebar = ({ topContent, children }) => {
  return (
    <nav>
      <TopContent>
        {topContent}
      </TopContent>
      <BottomContent>
        {children}
      </BottomContent>
    </nav>
  )
}

export default Sidebar;

const TopContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  margin: 1.5em 0;
  text-align: center;
`;

const BottomContent = styled.div`
  margin: 1em 1.5em;
  height: 27em;
  float: right;
`;
