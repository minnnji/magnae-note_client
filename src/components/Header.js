import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../constants/theme';
import { GrayButton } from './Items/Button';

const Header = props => {
  const { isLogin, name, handleLogout } = props;

  return (
    <header>
      { !isLogin
        ? <Title>Magnae-Note</Title>
        : <>
            <Link to="/"><Title>Magnae-Note</Title></Link>
              <HeaderRight>
                <HeaderSubText>
                  <p>
                    {name}
                    {' '}
                    님
                  </p>
                </HeaderSubText>
                <GrayButton
                  grayLine
                  grayText
                  inline
                  onClick={handleLogout}
                >
                  Logout
                </GrayButton>
              </HeaderRight>
          </>
      }
    </header>
  );
};

const Title = styled.h1`
  display: inline;
  line-height: 1.6em;
  margin: 0 .5em;
`;

const HeaderRight = styled.div`
  float: right;
  margin: .5em;
`;

const HeaderSubText = styled.span`
  display: inline-block;
  color: ${theme.COLOR_WHITE};
`;

export default Header;
