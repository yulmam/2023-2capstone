import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setRefreshToken } from "../storage/Cookie";
import _ from "lodash";
import axios from "axios";
export const TOKEN_TIME_OUT = 600 * 1000;

export const initialState = {
  isLoggedIn: false,
  logInLoading: false, // 로그인 시도중
  logInError: null, // 로그인 에러
  logInDone: false, // 로그인 상태 체크

  logOutLoading: false, //로그아웃 시도중
  logOutError: null, // 로그아웃 에러

  signUpLoading: false, // 회원가입 시도중
  signUpError: null, // 회워가입 에러
  signUpDone: false, // 회원가입 상태 체크

  loginData: {},
  me: null,
  authenticated: false,
  accessToken: null,
  expireTime: null,
};
const dummyUser = (data) => ({
  ...data,
  nickname: "이규열",
  id: 1,
});
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

export const loginAction = createAsyncThunk(
  "user/login",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post("/user/login", data);
      console.log(response.data);
      await wait(1000);
      // loacalStorage를 사용해서 토큰을 저장하는 것
      const { success, code, msg, token } = response.data;
      console.log(token);
      localStorage.setItem("access", token);

      // // 이렇게 axios요청할때 해더에 기본으로 accessToken을 붙이게 설정 할 수 있다

      // 쿠키에 Refresh Token, store에 Access Token 저장
      //response에 받는 토큰 형식 확인
      // setRefreshToken(response.json.refresh_token);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
export const signUp = createAsyncThunk(
  "user/signup",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post("/user/signup", data);
      // response data안에config.data에 회원가입 정보들이 들어있다
      return fulfillWithValue(response.data);
    } catch (error) {
      //error.response.data 안에 send로 보낸 message가 들어있다
      throw rejectWithValue(error);
    }
  }
);
export const logoutAction = createAsyncThunk("user/logout", async (data) => {
  // const response = await axios.post("/user/logout");
  return data;
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  // 외부에서 action을 만든것은 extraReducers로 가져와서 사용한다 주로 createAsyncThunk로 action을 만들 때 사용한다
  extraReducers: (builder) =>
    builder
      .addCase(loginAction.pending, (state) => {
        state.logInLoading = true;
        state.logInDone = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log(action);
        state.logInLoading = false;
        state.logInDone = true;
        state.isLoggedIn = true;
        state.me = dummyUser(action.payload);
        state.loginData = action.payload;
        state.authenticated = true;
        state.accessToken = action.payload;
        state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
      })
      .addCase(loginAction.rejected, (state, action) => {
        console.log(action);
        state.logInLoading = false;
        state.logInError = action.payload.data;
      })
      .addCase(logoutAction.pending, (state) => {
        state.logOutLoading = true;
        state.logInDone = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.logOutLoading = false;
        state.logInDone = false;
        state.isLoggedIn = false;
        state.me = null;
        state.authenticated = false;
        state.accessToken = null;
        state.expireTime = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.logOutLoading = false;
        state.logOutError = action.payload;
      })
      //signUp 리듀서
      .addCase(signUp.pending, (state, action) => {
        state.signUpLoading = true;
        state.signUpDone = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpLoading = false;
        state.signUpDone = true;
        state.signUpData = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpError = action.payload;
      })
      .addDefaultCase((state) => state),
});
export default userSlice;
