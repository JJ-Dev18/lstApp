import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CurvedLineChartProps {
  className?: string;
}

const CurvedLineChart: React.FC<CurvedLineChartProps> = ({ className }) => {
  const data: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Desktop',
        data: [43, 137, 61, 145, 26, 154],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Mobile',
        data: [60, 48, 177, 78, 96, 204],
        borderColor: '#e11d48',
        backgroundColor: 'rgba(225, 29, 72, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Para permitir ajustar el tamaño manualmente
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Statistics',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Values',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`${className} relative w-full h-[300px] md:h-[500px]`}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CurvedLineChart;
