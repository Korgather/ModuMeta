import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Row } from 'antd';
import { useAppSelector } from '@store/hook';
import MyPagination from './MyPagination';
import * as S from './style';
import MyPostFactory from './MyPostFactory';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { removeHtml } from '@lib/removeHtml';
import { HeartFilled } from '@ant-design/icons';
import shortid from 'shortid';
import { motion } from 'framer-motion';
import { media } from '@styles/theme';
interface MyPostProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}

const MyPagePostsComponent: React.FC<MyPostProps> = ({ setDetailModalState, pathname }) => {
  const router = useRouter();
  const myPosts = useAppSelector((state) => state.userSlice.myPosts);
  const FilterIsLiked = router.query.filter === 'liked';
  const CategoryIsMetaverse = router.query.category !== 'COMMUNITY';
  const CategoryIsCommunity = router.query.category === 'COMMUNITY';
  const category = router.query.category || 'METAVERSE';
  const showMyPosts = () => {
    if (!FilterIsLiked) return;
    router.push({
      pathname,
      query: {
        category,
      },
    });
  };
  const showLikedPosts = () => {
    if (FilterIsLiked) return;
    router.push({
      pathname,
      query: {
        category,
        filter: 'liked',
      },
    });
  };
  const gotoMyMetaversePosts = () => {
    router.push({
      pathname: pathname,
      query: { category: 'METAVERSE' },
    });
  };
  const gotoMyCommunityPosts = () => {
    router.push({
      pathname: pathname,
      query: { category: 'COMMUNITY' },
    });
  };
  const gotoDetail = (id: number) => {
    router.push(`/community/post/${id}`);
  };

  return (
    <>
      <S.MyPostWrapper>
        <S.ButtonWrapper>
          <S.StyledBtn onClick={showMyPosts} htmlType="button" isactive={String(!FilterIsLiked)}>
            내가 쓴 글
          </S.StyledBtn>
          <S.StyledBtn onClick={showLikedPosts} htmlType="button" isactive={String(FilterIsLiked)}>
            좋아요 누른 글
          </S.StyledBtn>
        </S.ButtonWrapper>
        <ContentWrapper>
          <MenuWrapper>
            <Menu isActive={CategoryIsMetaverse} onClick={gotoMyMetaversePosts}>
              메타버스
            </Menu>
            <Menu isActive={CategoryIsCommunity} onClick={gotoMyCommunityPosts}>
              커뮤니티
            </Menu>
          </MenuWrapper>
          {CategoryIsMetaverse ? (
            <StyledRow
              justify="start"
              gutter={[
                { xs: 4, sm: 18, md: 16, lg: 24 },
                { xs: 4, sm: 8, md: 16, lg: 24 },
              ]}
            >
              <MyPostFactory Posts={myPosts} setDetailModalState={setDetailModalState} />
            </StyledRow>
          ) : (
            <ComWrapper>
              {myPosts?.map((post) => (
                <BoardListContainer key={shortid.generate()} onClick={() => gotoDetail(post.id)}>
                  <FirstContainer>
                    <Title>{post?.title}</Title>
                    <Content>{removeHtml(post?.content as string)}</Content>
                    <NameAndTime>
                      {post.postUser.username} · {post.createdDate.slice(0, 10)}
                    </NameAndTime>
                  </FirstContainer>
                  <SecondContainer>
                    <CommentBox>
                      <div>{post.postCommentList.length}</div>
                      <div>댓글</div>
                    </CommentBox>
                    <LikedBox>
                      <HeartFilled style={{ fontSize: '1rem', color: '#eb3f96' }} />
                      <span>{Object.keys(post.likeUserList).length}</span>
                    </LikedBox>
                  </SecondContainer>
                </BoardListContainer>
              ))}
            </ComWrapper>
          )}
          <BlankBox />
        </ContentWrapper>
      </S.MyPostWrapper>
      <MyPagination />
    </>
  );
};

export default MyPagePostsComponent;

interface isActive {
  isActive: boolean;
}

const StyledRow = styled(Row)`
  flex: 8;
`;

const ComWrapper = styled.div`
  flex: 8;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  ${media.mobile} {
    flex-direction: column;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${media.mobile} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 1000px) {
    flex: 1.5;
  }
  @media screen and (max-width: 1550px) {
    flex: 1.3;
  }
`;

const Menu = styled.div<isActive>`
  margin-top: 10px;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 5px 15px;
  border-radius: 7px;
  width: 90%;
  text-align: center;
  cursor: pointer;
  + div {
    margin-top: 20px;
  }
  :hover {
    color: #c6daf7;
  }
  ${(props) =>
    props.isActive &&
    css`
      color: #4490f8;
      :hover {
        color: #4490f8;
      }
    `}
  @media screen and (max-width: 1550px) {
    font-size: 1rem;
  }
  ${media.mobile} {
    margin: 0;
    + div {
      margin: 0;
    }
    font-size: 1.2rem;
  }
`;

const BlankBox = styled.div`
  flex: 2;
  @media screen and (max-width: 1650px) {
    flex: 1;
  }
  @media screen and (max-width: 1450px) {
    display: none;
  }
`;

const BoardListContainer = styled(motion.div)`
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1.5px solid #c9cccf;
  padding: 30px 0;
  :first-child {
    padding: 0px 0px 30px 0px;
  }
  width: 100%;

  word-break: break-all;
  cursor: pointer;
  :hover {
    background-color: #f6f6f6d4;
  }
`;
const FirstContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const SecondContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const CommentBox = styled.div`
  border: 1px solid #c9cccf;
  border-radius: 100px;
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;
const LikedBox = styled.div`
  margin-top: 10px;
  span {
    margin-left: 5px;
    font-weight: 700;
  }
`;
const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 1.8;
  overflow: hidden;
`;
const Content = styled.p`
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.8;
  overflow: hidden;
`;

const NameAndTime = styled.div`
  color: #575757;
  font-size: 0.9rem;
  margin-top: 15px;
`;
