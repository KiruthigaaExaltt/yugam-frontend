// import React from "react";
import ModuleUsage, { type Stage } from "./HOC/Hirepipeline/ModuleUsage";

/* ===== Pipeline Data ===== */
const stagesData: Stage[] = [
  {
    title: "Applied",
    color: "bg-green-300",
    candidates: [
      { name: "David Park", role: "Senior React Developer", date: "2024-01-22", rating: 4.2 }
    ],
  },
  {
    title: "Screening",
    color: "bg-sky-400",
    candidates: [
      { name: "Michael Rodriguez", role: "Product Manager", date: "2024-01-16", rating: 4.2 }
    ],
  },
  {
    title: "Interview",
    color: "bg-blue-600",
    candidates: [
      { name: "Sarah Lee", role: "UX Designer", date: "2024-01-20", rating: 4.5 }
    ],
  },
  {
    title: "Interview",
    color: "bg-blue-600",
    candidates: [],
  },
  {
    title: "Interview",
    color: "bg-blue-600",
    candidates: [],
  },
];

const Dashboard = () => {
  return (
    <div
      className="min-h-screen p-4 space-y-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-color)",
      }}
    >
      {/* your cards */}
      <ModuleUsage stages={stagesData} />
    </div>
  );
};

export default Dashboard;



