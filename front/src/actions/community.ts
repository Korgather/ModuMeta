import { ServerError } from '@customTypes/common';
import { IUserState } from '@customTypes/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IloadComPosts {
  pageNum: string;
  category: string;
  keyword: string;
}

export interface IAddComPost {
  content: string;
  title: string;
  category: string;
  id?: number;
}

interface IComSearch {
  keyword: string;
  category: string;
  pageNum: string;
}

export const loadComPosts = createAsyncThunk(
  'comPosts/load',
  async (data: IloadComPosts, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        params: {
          category: data.category,
          keyword: data.keyword ? data.keyword : '',
          size: 5,
          page: data.pageNum ? Number(data.pageNum) - 1 : 0,
        },
      });
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const addComPost = createAsyncThunk('comPost/add', async (data: IAddComPost, thunkAPI) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data);
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const updateComPost = createAsyncThunk(
  'comPost/update',
  async (data: IAddComPost, thunkAPI) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`, data);
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);

      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const searchComPosts = createAsyncThunk(
  'comPosts/search',
  async (data: IComSearch, thunkAPI) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        params: {
          keyword: data.keyword,
          size: 5,
          page: data.pageNum,
          category: data.category,
        },
      });
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const loadComPost = createAsyncThunk('comPost/load', async (postId: number, thunkAPI) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});
