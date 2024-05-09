"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { ChartComponent } from "@/components/chart";
const getData = () => {
  let tempdata = [];
  for (let i = 0; i < 20; i++) {
    tempdata.push({
      time: i,
      open: Math.random() * 11,
      high: Math.random() * 15,
      low: Math.random() * 5,
      close: Math.random() * 10,
    });
  }
  return tempdata;
};
const app = () => {
  let tempdata = [];
  for (let i = 0; i < 20; i++) {
    tempdata.push({
      time: i,
      open: Math.random() * 11,
      high: Math.random() * 15,
      low: Math.random() * 5,
      close: Math.random() * 10,
    });
  }
  // const [data, setData] = React.useState([]);
  // setData([...data, getData()]);
  return (
    <div className="flex flex-col grow overflow-hidden ">
      <div className="flex flex-col grow p-2 ">
        <ChartComponent data={tempdata} />
      </div>
    </div>
  );
};
export default app;
