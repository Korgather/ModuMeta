import React, { Dispatch, SetStateAction } from 'react';
import { loadPost, removeComment, removeReply, updateComment, updateReply } from '@actions/post';
import { IComment, IReply, TUpdateComment, TUpdateReply } from '@customTypes/comment';
import { useAppDispatch, useAppSelector } from '@store/hook';
import modal from 'antd/lib/modal';
import * as S from './style';
import { generateBetweenTime } from '@lib/generateBetweenTime';
import { useFormContext } from 'react-hook-form';

interface BtnAndDate {
  reply?: IReply;
  comment?: IComment;
  ToggleUpdateInput: () => void;
  ToggleReplyInput: () => void;
  updateInputState: boolean;
  setReplyInputState: Dispatch<SetStateAction<boolean>>;
}

const BtnAndDate: React.FC<BtnAndDate> = ({
  reply,
  comment,
  ToggleUpdateInput,
  ToggleReplyInput,
  updateInputState,
}) => {
  const me = useAppSelector((state) => state.userSlice.me);
  const postDetail = useAppSelector((state) => state.postSlice.postDetail);
  const dispatch = useAppDispatch();
  const { getValues } = useFormContext();

  const RemoveCommentAndReply = async () => {
    postDetail &&
      modal.confirm({
        title: '댓글을 삭제하시겠습니까?',
        onOk: async function () {
          comment
            ? await dispatch(removeComment(comment))
            : reply && (await dispatch(removeReply(reply.replyId)));
          await dispatch(loadPost(postDetail.id));
        },
      });
  };

  const UpdateCommentAndReply = async () => {
    const content = getValues('content');
    const commentdata: TUpdateComment = { content, commentId: comment?.commentId };
    const replydata: TUpdateReply = {
      replyId: reply?.replyId as number,
      content,
    };
    modal.confirm({
      title: '댓글을 수정하시겠습니까?',
      onOk: async function () {
        comment
          ? await dispatch(updateComment(commentdata))
          : reply && (await dispatch(updateReply(replydata)));
        postDetail && (await dispatch(loadPost(postDetail.id)));
        ToggleUpdateInput();
      },
    });
  };

  return (
    <S.ReplyBottom>
      <S.ReplyDate>
        {reply ? generateBetweenTime(reply) : comment && generateBetweenTime(comment)}
      </S.ReplyDate>
      <S.ReplyBtnWrapper>
        {me &&
          !updateInputState &&
          ((reply ? reply.userId === me.userId : comment ? comment.userId === me.userId : false) ? (
            <>
              <S.StyledBtn onClick={ToggleUpdateInput}>수정</S.StyledBtn>
              <S.StyledBtn onClick={RemoveCommentAndReply}>삭제</S.StyledBtn>
            </>
          ) : (
            <S.StyledBtn onClick={ToggleReplyInput}>답글 쓰기</S.StyledBtn>
          ))}

        {me &&
          updateInputState &&
          (reply ? reply.userId === me.userId : comment ? comment.userId === me.userId : false) && (
            <>
              <S.StyledBtn onClick={UpdateCommentAndReply} htmlType="button">
                수정
              </S.StyledBtn>
              <S.StyledBtn onClick={ToggleUpdateInput}>취소</S.StyledBtn>
            </>
          )}
      </S.ReplyBtnWrapper>
    </S.ReplyBottom>
  );
};

export default BtnAndDate;
