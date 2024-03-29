import React, { useEffect } from 'react';
import SetNickname from '@components/redirect/SetNickname';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useCookies } from 'react-cookie';
import { saveAccessToken } from '@slices/userSlice';
import { useRouter } from 'next/router';
import { loadMyInfo } from '@actions/user';
import { Triangle } from 'react-loader-spinner';
import axios from 'axios';
import Head from 'next/head';

function Redirect() {
  const router = useRouter();
  const setCookie = useCookies(['Token'])[1];
  const dispatch = useAppDispatch();
  const token = router.query.token;
  const userNameModifiedYn = useAppSelector(
    (state) => state.userSlice.me?.userNameModifiedYn
  );
  useEffect(() => {
    (async () => {
      if (token) {
        setCookie('Token', token, { path: '/' });
        dispatch(saveAccessToken(token));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await dispatch(loadMyInfo());
        if (res.payload.userNameModifiedYn === 'Y') {
          if (router.query.aspath?.includes('omok')) {
            const path = router.query.aspath;
            router.push(path as string);
            return;
          }
          router.push('/');
        }
      }
    })();
  }, [token]);
  if (userNameModifiedYn === 'N')
    return (
      <>
        <Head>
          <title>모두메타 - 모두의 메타버스</title>
        </Head>
        <Layout>
          <SetNickname token={token} />
        </Layout>
      </>
    );
  return (
    <>
      <Head>
        <title>로그인중 - 모두메타</title>
      </Head>
      <LoadingWrapper>
        <Triangle color="#1890ff" />
      </LoadingWrapper>
    </>
  );
}

export default Redirect;
const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
