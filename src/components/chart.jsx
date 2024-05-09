"use client";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { LineStyle } from "lightweight-charts";
const generateCandleStickData = () => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      time: i,
      open: Math.random() * 10,
      high: Math.random() * 10,
      low: Math.random() * 10,
      close: Math.random() * 10,
    });
  }
  console.log(data);
  return data;
};
export const ChartComponent = ({ data }) => {
  const colors = {
    backgroundColor: "black",
    lineColor: "#2962FF",
    textColor: "white",
    areaTopColor: "#2962FF",
    areaBottomColor: "rgba(41, 98, 255, 0.28)",
  };
  // data = generateCandleStickData();
  const candleData = [
    { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
    { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
    { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
    { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
    { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
    { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
  ];
  const markers = [
    {
      time: 1642427876,
      position: "belowBar",
      color: "white",
      shape: "arrowUp",
      text: "real",
      size: 1,
    },
  ];

  const chartContainerRef = useRef();
  const tooltipRef = useRef();
  const [currentTime, setCurrentTime] = React.useState(null);
  const [candlePrice, setCandlePrice] = React.useState(null);
  const [tooltipHover, setTooltipHover] = React.useState(false);
  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartContainerRef.current?.currentWidth,
      height: chartContainerRef.current?.currentHeight,
      localization: {
        locale: "TR-tr",
      },
      priceFormatter: (price) => {
        const pricee = new Intl.NumberFormat("TR-tr", {
          style: "currency",
          currency: "TRY",
        }).format(price);
        console.log(pricee);
        return pricee;
      },
    });
    // const newSeries = chart.addAreaSeries({
    //   lineColor,
    //   topColor: areaTopColor,
    //   bottomColor: areaBottomColor,
    // });
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    chart.priceScale("right").applyOptions({
      visible: true,
      borderColor: "#71649C",
      invertScale: true,
    });

    chart.timeScale().applyOptions({
      borderColor: "#71649C",
      timeVisible: true,
    });
    chart.applyOptions({
      crosshair: {
        vertLine: {
          color: "#C3BCDB44",
          style: LineStyle.Solid,
          labelBackgroundColor: "#9B7DFF",
        },

        horzLine: {
          color: "#9B7DFF",
          style: LineStyle.Solid,
          labelBackgroundColor: "#9B7DFF",
        },
      },
    });
    chart.timeScale().fitContent();
    // newSeries.setData(data);
    // candleSeries.setData(candleData);
    candleSeries.setData(data);
    candleSeries.setMarkers(markers);
    chart.subscribeCrosshairMove((param) => {
      // console.log(param, tooltipHover);

      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.clientHeight
      ) {
        tooltipRef.current.style.display = "none";
      } else {
        tooltipRef.current.style.display = "block";
        if (param.time) {
          const dataa = param.seriesData.get(candleSeries);
          // setCandlePrice(dataa);
          tooltipRef.current.innerHTML = `
            <p>something</p>
            <p>open :${dataa.open.toFixed(2)}</p>`;
          setCurrentTime(new Date(param.time * 1000).toLocaleDateString());
          const toolTipMargin = 20;
          const toolTipWidth = 80;
          const toolTipHeight = 80;
          const y = param.point.y;
          let left = param.point.x + toolTipMargin;
          if (left > chartContainerRef.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }

          let top = y + toolTipMargin;
          if (top > chartContainerRef.clientHeight - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
          }
          tooltipRef.current.style.left = `${left}px`;
          tooltipRef.current.style.top = top + "px";
        }
      }
    });
    const handleResize = () => {
      // chart.applyOptions({
      //   width: chartContainerRef.current.clientWidth,
      chart.resize(
        chartContainerRef.current.clientWidth,
        chartContainerRef.current.clientHeight
      );
      // });
    };
    window.addEventListener("resize", () => {
      handleResize();
    });
    return () => {
      chart.remove();
      // window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <div className="relative h-full w-full flex flex-col grow m-0 p-0 border-2 border-slate-600 rounded-lg shadow-lg">
      <div className="absolute text-white top-5 left-5 z-50">
        <div> Charts</div>
        <div className="flex">
          <div className="me-3">OPEN: {candlePrice?.open}</div>
          <div className="me-3">HIGH: {candlePrice?.high}</div>
          <div className="me-3">LOW: {candlePrice?.low}</div>
          <div className="me-3">CLOSE: {candlePrice?.close}</div>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        className="w-full h-full relative rounded-lg"
      >
        <div
          ref={tooltipRef}
          className="p-2 shadow-lg hidden absolute top-3 left-3 w-32 h-24 border-2 border-slate-600 bg-slate-900/50 rounded-lg backdrop-blur-lg z-50"
          onMouseEnter={(e) => setTooltipHover(true)}
          onMouseLeave={(e) => setTooltipHover(false)}
        ></div>
      </div>
    </div>
  );
};
