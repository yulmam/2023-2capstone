import { combineReducers } from "redux";
// import axios from 'axios';
import userSlice from "./user";
import postSlice from "./post";
import diagnosisSlice from "./diagnosis";
import axios from "axios";
// credentials 처리와 나중에 백앤드 주소를 미들웨어로 처리하는 코드
// credentials는 백앤드에서 보내는 쿠키 정보를 허용하기위한 부분
axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.withCredentials = true;
// credentials를 true로 하면 백앤드에서 origin을 true또는 정확한 주소를 적어달라고 할 수 있다 오류가 나면 확인해보자

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
  diagnosis: diagnosisSlice.reducer,
});
export default rootReducer;
