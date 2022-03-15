import React, { Dispatch, SetStateAction, useState } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { openModal } from '@lib/ModalUtil';
import faker from 'faker';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import { getDataForModal } from '@slices/postSlice';
interface PostzoneProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
  mainPosts: IPost[];
}

const Postzone: React.FunctionComponent<PostzoneProps> = ({ setDetailModalState, mainPosts }) => {
  const dispatch = useAppDispatch();
  const getPostId = (data: IPost) => {
    dispatch(getDataForModal(data));
  };
  return (
    <div>
      <Row
        justify="start"
        gutter={[
          { xs: 4, sm: 18, md: 16, lg: 24 },
          { xs: 4, sm: 8, md: 16, lg: 24 },
        ]}
      >
        {mainPosts &&
          mainPosts.map((post, i) => (
            <Col key={'PostCard' + i} xs={24} md={12} lg={8} xl={6} style={{}}>
              <PostImg
                onClick={() => {
                  post && getPostId(post);
                  openModal(setDetailModalState);
                }}
                src={post.Images && post.Images[0].src}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Postzone;

const PostImg = styled.img`
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  width: 340px;
  cursor: pointer;
  border-radius: 10px;
  @media screen and (max-width: 1650px) {
    width: 17vw;
  }
  @media screen and (max-width: 1200px) {
    width: 22vw;
  }
  @media screen and (max-width: 992px) {
    width: 32vw;
  }
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
  :hover {
    transform: scale(1.1);
  }
`;
