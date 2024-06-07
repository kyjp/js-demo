
import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title
);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      yAxisID: "y1"
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "white",
      borderWidth: 2,
      yAxisID: "y"
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      yAxisID: "y"
    }
  ]
};

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - multitype"
    },
    legend: {
      position: "bottom"
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: false
    },
    y: {
      stacked: false,
      max: 100,
      min: 0
    },
    y1: {
      stacked: false,
      position: "right",
      max: 10,
      min: 0
    }
  }
};

export default function PolylineVerticalChart() {
  const chartRef = useRef(null)

  useEffect(() => {
    randomData()
  }, [])

  const onClickButton = () => {
    randomData()
  };

  const randomData = () => {
    let data1 = []
    let data2 = []
    let data3 = []
    for (let i = 0; i < labels.length; i++) {
      data1.push(getRandomInt(10))
      data2.push(getRandomInt(100))
      data3.push(getRandomInt(100))
    }

    chartRef.current.data.datasets[0].data = data1
    chartRef.current.data.datasets[1].data = data2
    chartRef.current.data.datasets[2].data = data3

    chartRef.current.update()
  }


  return (
    <div className="App">
      <Chart ref={chartRef} type={"bar"} data={data} options={options} />
    </div>
  )
}
