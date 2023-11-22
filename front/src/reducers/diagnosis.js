import {
  createSlice,
  createAsyncThunk,
  miniSerializeError,
} from "@reduxjs/toolkit";
import { throttle } from "lodash";
import axios from "axios";
export const initialState = {
  // 메인서버 요청
  diagnosisLoading: false,
  diagnosisDone: false,
  diagnosisError: null,
  front: [],
  side: [],
  // 유저 몸상태 체크하는 state
  loadUserStateLoading: false,
  loadUserStateDone: false,
  loadUserStateError: null,
  tutleneckValue: [],
  time: [],
  imageURL: "",
};
//form데이터를 보내는 axios요청
export const submitForm = createAsyncThunk(
  "/diagnosis/submitForm",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(data);
      const access = localStorage.getItem("access");
      // console.log(access);
      // const response = await axios.post("/diagnosis/submitForm", data);

      const response = await axios.post("/diagnosis/submitForm", data, {
        headers: {
          "X-AUTH-TOKEN": access,
        },
      });

      console.log(response);
      return fulfillWithValue(response.data);
    } catch (error) {
      throw rejectWithValue(error.response);
    }
  }
);
export const loadUserState = createAsyncThunk(
  "/diagnosis/history",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const access = localStorage.getItem("access");
      console.log(access);
      console.log("hi");
      const response = await axios.get("/diagnosis/history", {
        headers: {
          "X-AUTH-TOKEN": access,
        },
      });
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
const diagnosisSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    dispatchImageURL(state, action) {
      state.imageURL = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(submitForm.pending, (state, action) => {
        state.submitFormLoading = true;
        state.submitFormDone = false;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.submitFormLoading = false;
        state.submitFormDone = true;
        state.front = action.payload.front;
        state.side = action.payload.side;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.submitFormLoading = false;
        state.submitFormError = action.error;
      })
      .addCase(loadUserState.pending, (state, action) => {
        state.loadUserStateLoading = true;
        state.loadUserStateDone = false;
        state.loadUserStateError = null;
      })
      .addCase(loadUserState.fulfilled, (state, action) => {
        console.log(action.payload.turtleneckValue);
        state.imagePaths = action.payload;
        state.tutleneckValue = action.payload.turtleneckValue;
        state.time = action.payload.time;
        state.loadUserStateLoading = false;
        state.loadUserStateDone = true;
      })
      .addCase(loadUserState.rejected, (state, action) => {
        state.loadUserStateLoading = false;
        state.loadUserStateError = action.error;
      })
      .addDefaultCase((state) => state),
});
export const { dispatchImageURL } = diagnosisSlice.actions;
export default diagnosisSlice;
