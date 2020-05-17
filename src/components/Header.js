import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../constants/theme';
import { GrayButton } from './Items/Button';

const Header = props => {
  const { handleLogout, dispatch, user, history } = props;

  return (
    <header>
      { user && user.isLogin ? <Link to="/"><Title>Magnae-Note</Title></Link> : <Title>Magnae-Note</Title>}
      { user && user.isLogin
        && (
          <HeaderRight>
            <HeaderSubText>
              <p>
                {user.name}
                {' '}
                님
              </p>
            </HeaderSubText>
            <GrayButton
              grayLine
              grayText
              inline
              onClick={() => {
                const isLogout = window.confirm('로그아웃 하시겠습니까?');
                if (isLogout) {
                  history.push('/login');
                  handleLogout(dispatch);
                }
              }}
            >
              Logout
            </GrayButton>
          </HeaderRight>
        )}
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

export default memo(Header);
