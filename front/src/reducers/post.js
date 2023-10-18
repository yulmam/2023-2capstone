import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { throttle } from "lodash";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  submitReportLoading: false,
  submitReportDone: false,
  submitReportError: null,
  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
  // 나중에 데이터베이스에 넣을 state
  user_name: null,
  user_sex: null,
  user_age: null,
};
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

// 비동기 요청을 넣어야하는데 프론트로만 할 떄는 가짜 비동기 요청을 만들어야해서 setTimeout으로 해결
const fetchDataFromServer = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000); // Simulate async fetch with a delay of 1 second
  });
};

const throttledFetchData = throttle(fetchDataFromServer, 1000);

// 정보 주 action
export const submitReport = createAsyncThunk(
  "/post/submitReport",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      // formdata로 만든 data는 백앤드로 넘겨줄때 multer를 사용해야한다 일반적인 방법으로 열 수 없다
      // for (let key of data.keys()) {
      //   console.log(key);
      // }
      // for (let value of data.values()) {
      //   console.log(value);
      // }
      // console.log(data.get("name"));
      // console.log(data.get("image"));
      // const response = await axios.post("/post/sumitreport")
      await wait(1000);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
export const addImage = createAsyncThunk(
  "/post/addImage",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(data);
      await wait(1000);
      // const response = await axios.post("/post/addimage")
      console.log("addImage");
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(submitReport.pending, (state, action) => {
        state.submitReportLoading = true;
        state.submitReportDone = false;
        state.submitReportError = null;
      })
      .addCase(submitReport.fulfilled, (state, action) => {
        // dispatch로 넘겨준 데이터는 action.payload에 저장된다
        // 임시로 만들어준 코드 데이터베이스에 저장되어야하는 state가 맞다
        state.user_name = action.payload.name;
        state.user_sex = action.payload.sex;
        state.user_age = action.payload.age;
        state.submitReportLoading = false;
        state.submitReportDone = true;
      })
      .addCase(submitReport.rejected, (state, action) => {
        state.submitReportLoading = false;
        state.submitReportError = action.error;
      })
      .addCase(addImage.pending, (state, action) => {
        state.addImageLoading = true;
        state.addImageDone = false;
        state.addImageError = null;
      })
      .addCase(addImage.fulfilled, (state, action) => {
        console.log(action);
        state.imagePaths = action.payload;
        state.addImageLoading = false;
        state.addImageDone = true;
      })
      .addCase(addImage.rejected, (state, action) => {
        state.addImageLoading = false;
        state.addImageError = action.error;
      })
      .addDefaultCase((state) => state),
});
export default postSlice;
