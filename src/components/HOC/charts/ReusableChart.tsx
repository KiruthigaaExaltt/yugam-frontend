import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";

interface Props {
  type: "bar" | "pie" | "doughnut" | "line";
  label: string;
}

export default function ReusableChart({ type, label }: Props) {
  const [ready, setReady] = useState(false);
  //  const [chartKey, setChartKey] = useState(0);
  useEffect(() => {
  const timer = setTimeout(() => {
      setReady(true);
      // setChartKey(prev => prev + 1); // increment key to remount chart
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const barPieDoughnutData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label,
        data: [540, 32, 702, 350],
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(153, 102, 255, 0.6)",
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

  const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)", // optional for tooltip
      tension: 0.4,
      fill: true, // <- set this to false
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: "#ec4899",
      backgroundColor: "rgba(236, 72, 153, 0.2)", // optional
      tension: 0.4,
      fill: true, // <- set this to false
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

   const finalChartData = type === "line" ? lineChartData : barPieDoughnutData;
  const isAxisChart = type === "bar" || type === "line";

  /* ---------------- OPTIONS ---------------- */
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    animation:
      type === "pie" || type === "doughnut"
        ? {
           animateRotate: true,
  animateScale: true,
  duration: 1500,
  easing: "easeInOutQuart"
          }
        : undefined,

    animations:
      type === "bar" || type === "line"
        ? {
            y: { duration: 1000, easing: "easeOutQuart" },
            x: { duration: 1000, easing: "easeOutQuart" },
          }
        : undefined,

    plugins: {
      legend: { position: "bottom", labels: { usePointStyle: true } },
    },

    ...(isAxisChart && {
      scales: {
        x: { ticks: { align: "center" }, grid: { display: true, drawBorder: false } },
        y: { beginAtZero: true, grid: { display: true, drawBorder: false } },
      },
    }),
  };
  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold mb-3">{label}</h3>
        <div className="h-[260px] sm:h-80 lg:h-[380px]">
          {ready && <Chart type={type} data={finalChartData} options={chartOptions} className="w-full h-full" />}
        </div>
      </div>
    </Card>
  );
}
