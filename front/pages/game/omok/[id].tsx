import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hook';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import LoginModalView from '@components/game/loginModal/LoginModalView';
import GameNav from '@components/game/gameNav';
import ProfileCard from '@components/game/gameNav/ProfileCard';
import GameChannelChange from '@components/game/GameChannelChange';
import { signInOmok } from '@actions/game';

const Zepmapia = () => {
  const [channelState, setChannelState] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  const [startCondition, setStartCondition] = useState(true);
  const [profileCardState, setProfileCardState] = useState(false);

  useEffect(() => {
    window.addEventListener('message', async (e: MessageEvent) => {
      if (e.data.event === 'JOINED_MAP') {
        if (me) {
          const iframe = document.querySelector('iframe');
          await dispatch(signInOmok('')).then((data) => {
            const { id, nickname, win, lose } = data.payload;
            (iframe as HTMLIFrameElement).contentWindow?.postMessage(
              {
                type: 'login',
                id,
                nickname,
                win,
                lose,
                zepMessage: true,
              },
              '*'
            );
          });
          return;
        }
        setStartCondition(() => false);
      }
    });
  }, []);
  const id = router.query.id;
  const onToggleChannel = useCallback(() => {
    setChannelState((state) => !state);
  }, [setChannelState]);
  return (
    <>
      <Head>
        <title>{`오목게임 - 젭 | 모두메타`}</title>
      </Head>
      {id && (
        <StyledIframe
          // ref={(data) => setFrame(data)}
          id="zepiframe"
          src={`https://zep.us/play/${id}?lang=ko&loadingImageURL=https://i.imgur.com/hVtwFXg.gif`}
          allow="camera *;microphone *"
          sandbox="allow-scripts allow-same-origin
      allow-storage-access-by-user-activation allow-forms"
        ></StyledIframe>
      )}
      <GameNav
        onToggleChannel={onToggleChannel}
        channelState={channelState}
        setProfileCardState={setProfileCardState}
        profileCardState={profileCardState}
      />
      <LoginModalView
        setStartCondition={setStartCondition}
        startCondition={startCondition}
      />
      <ProfileCard
        profileCardState={profileCardState}
        setProfileCardState={setProfileCardState}
        setStartCondition={setStartCondition}
      />

      {channelState && (
        <GameChannelChange
          channelState={channelState}
          setChannelState={setChannelState}
        />
      )}
    </>
  );
};

export default Zepmapia;

const StyledIframe = styled.iframe`
  display: block;
  border: none;
  height: 100vh;
  width: 100vw;
  position: relative;
`;
