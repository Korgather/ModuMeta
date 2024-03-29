import { DownOutlined, SelectOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Bookmark } from 'src/svg';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { media } from '@styles/theme';
interface IModal {
  commentState: boolean;
}
export const Date = styled.div`
  margin-left: 10px;
  font-size: 0.8rem;
`;
export const StyledScroll = css`
  ::-webkit-scrollbar {
    width: 7px;
    background-color: #d7d7d7;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #929292;
  }
`;

export const Dim = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  position: fixed;
`;

export const ModalContainer = styled.div`
  position: fixed;
`;

export const ModalWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 300;
`;

export const Modal = styled(motion.div)<IModal>`
  z-index: 500;
  background-color: white;
  width: 35vw;
  height: 78vh;
  border-radius: 10px;

  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 700px;
  max-width: 500px;
  min-width: 325px;
  transition: right 100ms linear;
  display: flex;
  flex-direction: column;
  ${media.mobile} {
    height: 85vh;
    transition: none;
  }
`;

export const Content = styled.div`
  font-size: 1rem;
  line-height: 1.1;
  word-break: break-all;
`;

export const TagsWrapper = styled.div`
  padding: 15px 30px;
  height: 10%;
  width: 100%;
  font-size: 0.9rem;
  font-weight: 700;
  span {
    + span {
      margin-left: 10px;
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 8%;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 200px;
  cursor: pointer;
`;

export const NickName = styled.div`
  vertical-align: middle;
  margin-left: 10px;
  font-weight: 600;
`;

export const StyledDownOutlined = styled(DownOutlined)`
  width: 18px;
  svg {
    width: 10px;
  }
`;

export const StyledA = styled.a`
  z-index: 900;
  display: flex;
  width: 100%;
`;

export const EntnerButton = styled(Button)`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 4px;
  padding-top: 5px;
  transition: all ease-in-out 300ms;
  ${media.mobile} {
    font-size: 1.3rem;
    padding-top: 6px;
  }
`;

export const HeartAndMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5%;
  align-items: center;
  padding: 20px 15px;
`;

export const StyledSpan = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: auto;
  margin-left: 8px;
  padding-bottom: 1px;
`;

export const SlideWrapper = styled.section`
  margin-top: 10px;
  padding: 0;
  position: relative;
  width: 100%;

  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-next {
    position: absolute;
    right: 0px;
    z-index: 900;
  }
  .slick-prev {
    left: 0px;
    z-index: 900;
  }
`;

export const StyledImages = styled.div`
  position: relative;
  display: block;
  img {
    aspect-ratio: 3/1.8;
    object-fit: cover;
  }
  .ant-image {
    display: block !important;
  }
`;

export const CommentImg = styled.img`
  margin-left: auto;
  width: 1.5rem;
  cursor: pointer;
`;

export const StyledBookmark = styled(Bookmark)`
  margin-left: auto;
`;

export const Title = styled.h2`
  padding: 0px 0px 10px 0px;
  border-bottom: 1px solid #c1c1c199;
`;

export const ContentBox = styled.div`
  padding: 15px 30px;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  ${StyledScroll}
`;

export const StyledShareIcon = styled.img`
  width: 1.7rem;
  transform: translateX(180deg);
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
  transition: opacity 0.2s ease-in;
  :hover {
    opacity: 0.8;
  }
`;

export const RightWrapper = styled.div``;

export const CloseModalBtn = styled.div`
  margin-left: auto;
  background-color: #dfdada;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 15px;
  transition: opacity 0.2s ease-in;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const StyledSelectOutlined = styled(SelectOutlined)`
  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
  margin-right: 20px;
  margin-top: 2px;
  transition: opacity 0.2s ease-in;
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;
