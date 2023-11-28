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
  const discChartRef = useRef(null);
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone } = useSelector((state) => state.user);
  const { turtleneckList, discList, time } = useSelector(
    (state) => state.diagnosis
  );
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
    console.log("hi");
    dispatch(loadUserState());
  }, [dispatch]);

  const [turtleoptions, setTutleOptions] = useState({
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

  useEffect(() => {
    setTutleOptions((prevState) => ({
      ...prevState,
      xAxis: {
        ...prevState.xAxis,
        data: time,
      },
      series: [
        {
          ...prevState.series,
          data: turtleneckList,
        },
      ],
    }));
  }, [time, turtleneckList]);
  // 거북목 진단
  useEffect(() => {
    console.log(turtleoptions);

    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      chart.setOption(turtleoptions);
    }
  }, [chartRef, turtleoptions]);

  //디스크 진단

  const [discoptions, setDiscOptions] = useState({
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

  useEffect(() => {
    setDiscOptions((prevState) => ({
      ...prevState,
      xAxis: {
        ...prevState.xAxis,
        data: time,
      },
      series: [
        {
          ...prevState.series,
          data: discList,
        },
      ],
    }));
  }, [time, discList]);
  // 거북목 진단
  useEffect(() => {
    console.log(discoptions);

    if (discChartRef.current) {
      const chart = echarts.init(discChartRef.current);

      chart.setOption(discoptions);
    }
  }, [discChartRef, discoptions]);

  return (
    <div>
      <AppLayout>
        <div class="History-container">
          <h2>내 몸의 거북목 거리</h2>
          <div
            ref={chartRef}
            style={{
              width: "100%",
              height: "300px", // Set the desired height here
            }}
          />
        </div>
        <div class="History-container">
          <h2>내 몸의 디스크 각도</h2>
          <div
            ref={discChartRef}
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
