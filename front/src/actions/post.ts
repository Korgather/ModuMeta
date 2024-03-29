import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IComment, TUpdateComment, TUpdateReply, TAddComment } from '@customTypes/comment';
import { AddPost, IPostState } from '@customTypes/post';
import { IUserState } from '@customTypes/user';
import {
  getPrevPostData,
  getSearchTotalPage,
  getTotalPage,
  ToggleWriteModalState,
} from '@slices/postSlice';
import { ServerError } from '@customTypes/common';

interface IloadPosts {
  pageNum: string;
  category: string;
  keyword: string;
  sort?: string;
}

export const addPost = createAsyncThunk('post/add', async (data: AddPost, thunkAPI) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data);
    thunkAPI.dispatch(ToggleWriteModalState(false));
    thunkAPI.dispatch(getPrevPostData(null));
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const removePost = createAsyncThunk('post/remove', async (postId: number, thunkAPI) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const updatePost = createAsyncThunk('post/update', async (data: AddPost, thunkAPI) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`, data);
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const loadPost = createAsyncThunk('post/load', async (postId: number, thunkAPI) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const loadPosts = createAsyncThunk('posts/load', async (data: IloadPosts, thunkAPI) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      params: {
        category: data.category,
        keyword: data.keyword ? data.keyword : '',
        size: 8,
        page: data.pageNum ? Number(data.pageNum) - 1 : 0,
        sort: data.sort ? data.sort : '',
      },
    });
    thunkAPI.dispatch(getTotalPage(res.data.totalPages));
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const searchPosts = createAsyncThunk('posts/search', async (data, thunkAPI?) => {
  const {
    postSlice: { searchPageNum, searchKeyword },
  } = thunkAPI.getState() as { postSlice: IPostState };

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      params: {
        keyword: searchKeyword,
        size: 8,
        page: searchPageNum - 1,
        category: 'METAVERSE',
      },
    });
    const payload = res.data;
    thunkAPI.dispatch(getSearchTotalPage(payload.totalPages));
    return payload;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

interface searchKeywords {
  searchValue: string;
  category: string;
}

export const searchKeywords = createAsyncThunk(
  'posts/searchkeywords',
  async (data: searchKeywords, thunkAPI?) => {
    const {
      postSlice: { searchPageNum },
    } = thunkAPI.getState() as { postSlice: IPostState };
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        params: {
          keyword: data.searchValue,
          size: 8,
          page: searchPageNum - 1,
          category: data.category ? data.category : 'METAVERSE',
        },
      });
      const payload = res.data;
      thunkAPI.dispatch(getSearchTotalPage(payload.totalPages));
      return payload;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const heartPost = createAsyncThunk('heart/post', async (postId: number, thunkAPI) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/like/${postId}`, '');
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const viewPost = createAsyncThunk('view/post', async (postId: number, thunkAPI) => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/view/${postId}`);
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const addComment = createAsyncThunk('comment/add', async (data: TAddComment, thunkAPI) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.postid}/comments`, {
      content: data.content,
    });
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const removeComment = createAsyncThunk(
  'comment/remove',
  async (data: IComment | undefined, thunkAPI) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${data?.commentId}`);
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const updateComment = createAsyncThunk(
  'comment/update',
  async (data: TUpdateComment | undefined, thunkAPI) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/comments/${data?.commentId}`, {
        content: data?.content,
      });
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const addReply = createAsyncThunk('reply/add', async (data: TUpdateComment, thunkAPI) => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments/${data.commentId}`, {
      content: data.content,
    });
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }

  return data;
});
export const removeReply = createAsyncThunk('reply/remove', async (replyId: number, thunkAPI) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/replies/${replyId}`);
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const updateReply = createAsyncThunk(
  'reply/update',
  async (data: TUpdateReply, thunkAPI) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/replies/${data?.replyId}`, {
        content: data?.content,
      });
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const deleteAlram = createAsyncThunk('alram/delete', async (alramId: string, thunkAPI) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notification/${alramId}`);
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const addFeedBack = createAsyncThunk(
  'add/feedback',
  async (data: { content: string }, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, data);
      alert('피드백을 남겨주셔서 감사합니다');
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);
