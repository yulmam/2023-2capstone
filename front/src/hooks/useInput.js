/* eslint-disable import/no-anonymous-default-export */
import { useState, useCallback } from "react";

export default (initalValue = null) => {
  const [value, setValue] = useState(initalValue);
  // 컴포넌트에 props로 넘겨주는 함수는 useCallback을 써준다
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
