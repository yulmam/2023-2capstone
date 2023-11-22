import React, { useState, useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";

import { Button, Checkbox, Form, Input } from "antd";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loadUserState } from "../reducers/diagnosis";

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
  }, [dispatch]);

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: [0, 1, 2, 3, 4, 5],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [0, 1, 2, 3, 4, 5],
        type: "line",
      },
    ],
  });
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      xAxis: {
        ...prevState.xAxis,
        data: time,
      },
      series: [
        {
          ...prevState.series,
          data: tutleneckValue,
        },
      ],
    }));
    console.log(options);
  }, [time, tutleneckValue]);
  useEffect(() => {
    console.log(options);
    console.log(time);
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      chart.setOption(options);
    }
  }, [options, chartRef]);

  return (
    <div>
      <AppLayout>
        <div
          ref={chartRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </AppLayout>
    </div>
  );
};
export default History;
