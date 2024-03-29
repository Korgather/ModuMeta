import { media } from '@styles/theme';
import { Button, Menu } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';

export const NavLayout = styled.div`
  width: 100%;
  .ant-space-align-center {
    width: 100%;
  }
  ${media.mobile} {
    display: none;
  }
`;

export const AlramProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.mobile} {
    margin-right: 20px;
    margin-top: 10px;
  }
`;
export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${media.mobile} {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  margin: 30px 0 20px 20px;
  width: 1440px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100%;
  }
`;

export const LogoWrapper = styled.div`
  max-width: 450px;
  ${media.mobile} {
    width: 90%;
  }
`;

export const LogoImg = styled(Image)`
  max-width: 26rem;
  cursor: pointer;
  margin-right: auto;
`;
export const MobileLogoWrapper = styled.div`
  display: none;
  ${media.mobile} {
    display: block;
    flex: 5;
  }
`;

export const MenuWrapper = styled(Menu)`
  width: 70%;
  font-size: 1rem;
  font-weight: 700;
  ${media.mobile} {
    width: 100%;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      flex: 1;
      opacity: 1 !important;
    }
    .ant-menu-submenu-horizontal {
      display: none;
    }
  }
`;
export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 30%;
  ${media.mobile} {
    display: none;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  background-color: white;
  opacity: 1;
  border-bottom: 2px solid #f0f0f0;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 10px;
  z-index: 10;
  justify-content: center;
  width: 100%;
  position: sticky;
  ${media.mobile} {
    width: 100vw;
    position: fixed;
  }
`;

export const StyledBtn = styled(Button)`
  margin-left: auto;
  margin-right: 18px;
`;

export const MenuContainer = styled.div`
  width: 1440px;
  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
  ${media.mobile} {
    width: 100vw;
    justify-content: flex-start;
  }
  display: flex;
`;

export const StyledMenuItem = styled(Menu.Item)`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px 20px;
`;
