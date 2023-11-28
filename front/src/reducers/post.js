import {
  createSlice,
  createAsyncThunk,
  miniSerializeError,
} from "@reduxjs/toolkit";
import { throttle } from "lodash";
import axios from "axios";
export const initialState = {
  mainPosts: [],
  imagePaths: [],
  // 분석 요청 보내는 state
  submitReportLoading: false,
  submitReportDone: false,
  submitReportError: null,
  // 분석 사진 업로드 state
  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
  // 게시글 전부 불러오는 state
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  // 나중에 데이터베이스에 넣을 state
  user_name: null,
  user_sex: null,
  user_age: null,
};
const dummyPost = [
  {
    id: 1,
    title: "평일 오전 기흥역 신갈천에서 뛰실 분 구합니다",
    content:
      "평일 6시에 정자역에서 모일 예정입니다. 인원은 5명 생각하고 있습니다.",
    User: {
      id: 1,
      nickname: "이규열",
    },
    Comments: [
      {
        id: 1,
        nickname: "김한얼",
        comment: "저 하고 싶습니다",
      },
    ],
  },
  {
    id: 2,
    title: "주말 오후에 뚝섬 한강 공원에서 러닝 하실 분 구합니다",
    content:
      "오후2시에 뚝섬역에서 모여서 뛸 예정입니다 인원은 10명 생각하고 있습니다",
    User: {
      id: 1,
      nickname: "정지헌",
    },
    Comments: [
      {
        id: 1,
        nickname: "이혜정",
        comment: "혹시 주말 중에 하루만 가능할까요?",
      },
    ],
  },
  {
    id: 1,
    title: "저와 같이 러닝하실 분 찾습니다",
    content:
      "월, 수, 금 아침 8시에 단국대 대운동장 모일 예정입니다. 인원은 최대 5명 생각하고 있습니다.",
    User: {
      id: 1,
      nickname: "김성현",
    },
    Comments: [
      {
        id: 1,
        nickname: "장승완",
        comment: "끝나고 삼겹살 회식하나요?",
      },
    ],
  },
];
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

export const loadPosts = createAsyncThunk(
  "/post/loadPosts",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const access = localStorage.getItem("access");
      console.log(access);
      // const response = await axios.get("/post/loadPosts", {
      //   headers: {
      //     "X-AUTH-TOKEN": access,
      //   },
      // });
      return fulfillWithValue();
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

// export const loadPosts = createAsyncThunk("/post/loadPosts", async () => {
//   const access = localStorage.getItem("access");
//   console.log(access);
//   const response = await axios.get("/post/loadPosts", {
//     headers: {
//       "X-AUTH-TOKEN": access,
//     },
//   });
//   return response.data;
// });

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
      .addCase(loadPosts.pending, (state, action) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        // 계속 게시글이 쌓이는걸 방지
        if (dummyPost.length !== state.mainPosts.length) {
          state.mainPosts = state.mainPosts.concat(dummyPost);
        }

        state.loadPostsLoading = false;
        state.loadPostsDone = true;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })

      .addDefaultCase((state) => state),
});
export default postSlice;
