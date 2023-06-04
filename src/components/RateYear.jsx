import React from 'react'
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData } from '../store/store';
import "./Chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Yearwise Success Rate"
      }
    },
    scales: {
      x: {
        grid: {
          color: 'white',
         
        }
      },
      y: {
        
        grid: {
          borderColor: 'grey',
          
        },
        
      }
    }
  };

const RateYear = () => {
    const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.table);
  console.log(data);
  const getSuccessRate = (rocket) => {
    // console.log("rocket", rocket);
    const successes = data.filter(
      (launch) =>
        launch.launch_year === rocket?.launch_year && launch.launch_success
    ).length;
    // console.log("successes", successes);
    const total = data.filter(
      (launch) => launch.launch_year === rocket?.launch_year
    ).length;
    console.log("total", total);
    const successRate = (successes / total) * 100;
    return successRate.toFixed(2);
  };
  // console.log("rate", getSuccessRate());
  const getRocketLabels = () => {
    const rockets = [
      ...new Set(data.map((launch) => launch.launch_year))
    ];
    return rockets;
  };

  // const getSuccessRates = () => {
  //   const rockets = data.map((launch) => launch.rocket);
  //   const successRates = rockets.map((rocket) => getSuccessRate(rocket));
  //   return successRates;
  // };
//   const rockets = data.map((launch) => launch.rocket);
  // console.log("success", getSuccessRates());

  const chartData = {
    labels: getRocketLabels(),
    // labels: rockets.launch_year,
    datasets: [
      {
        label: "Success Rate (%)",
        // data: getSuccessRates(),
        data: data?.map((rocket) => getSuccessRate(rocket)),
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      }
    ]
  };
  return (
    <div className='chart-container'>
        <Bar data={chartData} options={ options} />
    </div>
  )
}

export default RateYear