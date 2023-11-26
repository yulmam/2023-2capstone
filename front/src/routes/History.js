import React, { useState, useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";

import { Button, Checkbox, Form, Input } from "antd";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loadUserState } from "../reducers/diagnosis";
import "./History.css";
const History = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone } = useSelector((state) => state.user);
  const { tutleneckValue, time } = useSelector((state) => state.diagnosis);
  const { tutleneck, setTutlenect } = useState([]);
  const { timeArray, setTtimeArray } = useState([]);
  const { me } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (me && me.id) {
      navigate("/");
    }
  }, [me, navigate]);

  useEffect(() => {
    if (signUpDone) {
      navigate("/");
    }
  }, [navigate, signUpDone]);
  useEffect(() => {
    console.log("hi");
    dispatch(loadUserState());
    console.log(tutleneckValue);
  }, [dispatch, tutleneckValue]);

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: [1, 2, 3, 5, 10],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [1, 10, 100, 200, 300],
        type: "line",
      },
    ],
    autoResize: true,
  });
  // useEffect(() => {
  //   setOptions((prevState) => ({
  //     ...prevState,
  //     xAxis: {
  //       ...prevState.xAxis,
  //       data: time,
  //     },
  //     series: [
  //       {
  //         ...prevState.series,
  //         data: tutleneckValue,
  //       },
  //     ],
  //   }));
  // }, [time, tutleneckValue]);
  useEffect(() => {
    console.log(options);

    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      chart.setOption(options);
    }
  }, [chartRef, options]);

  return (
    <div>
      <AppLayout>
        <div class="History-container">
          <h2>내 몸의 과거정보</h2>
          <div
            ref={chartRef}
            style={{
              width: "100%",
              height: "300px", // Set the desired height here
            }}
          />
        </div>
      </AppLayout>
    </div>
  );
};
export default History;
