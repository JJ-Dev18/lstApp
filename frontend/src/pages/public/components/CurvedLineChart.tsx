import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Desktop",
      data: [43, 137, 61, 145, 26, 154],
      borderColor: "#4FD1C5",
      backgroundColor: "rgba(37, 99, 235, 0.2)",
    },
    {
      label: "Mobile",
      data: [60, 48, 177, 78, 96, 204],
      borderColor: "#a7aaff",
      backgroundColor: "rgba(225, 29, 72, 0.2)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User Statistics",
    },
  },
};

const CurvedlineChart: React.FC = () => (
  <Box width="100%" height={{ base: "300px", md: "400px" }}>
    
    <Line data={data} options={options} />
  </Box>
);

export default CurvedlineChart;
