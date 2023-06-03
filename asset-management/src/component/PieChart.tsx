import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  data : Array<{}>;
}

const PieChart : React.FC<ChartProps> = ({data}) => {

  const chartData : ChartData<'pie',{}[]> = {
    labels: data.map((obj)=> {
      return Object.keys(obj)
    }),
    datasets: [
      {
        label: '%',
        data: data.map((obj)=>{
          const valArray = Object.values(obj)
          return valArray.flat()
        }) ,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <React.Fragment>
      <Pie data={chartData} />
    </React.Fragment>
  )
}


export default PieChart