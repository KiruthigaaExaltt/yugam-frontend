 
import { Chart } from "primereact/chart";
// import { useGetSalesChartQuery } from "../../chart/chartApi";
// import { useGetSalesChartQuery } from "./ChartSlice";

 
interface Props {
  type: "bar" | "pie" | "doughnut" | "line";
  label: string;
//   className?: string;
}
 
export default function ReusableChart({ type, label }: Props) {
// const { data, isLoading, isError } = useGetSalesChartQuery();
 
  const chartData = {
    // labels: data?.labels,
     labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label,
        // data: data?.sales,
        data: [540, 32, 702, 350],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
 
  const chartOptions = {
    plugins: {
      legend: {
        labels: { usePointStyle: true },
      },
    },
  };
 
  return (
    <div className="card w-200 h-200">
  <Chart
    type={type}
    data={chartData}
    options={chartOptions}
    style={{ width: "100%", height: "100%" }}
  />
</div>
  )
}
 
 