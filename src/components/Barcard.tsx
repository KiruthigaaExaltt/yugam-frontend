import React from "react";
import StageColumn from "../../src/components/HOC/barcard/StageColumn";

const dashboardData = [
  {
    title: "Applied",
    color: "bg-green-300",
    candidates: [
      { name: "David Park", role: "Senior React Developer", date: "2024-01-22" },
    ],
  },
  {
    title: "Screening",
    color: "bg-blue-300",
    candidates: [
      {
        name: "Michael Rodriguez",
        role: "Product Manager",
        date: "2024-01-16",
        rating: 4.2,
      },
    ],
  },
  {
    title: "Interview",
    color: "bg-blue-700",
    candidates: [
      {
        name: "Sarah Chen",
        role: "Senior React Developer",
        date: "2024-01-18",
        rating: 4.5,
      },
    ],
  },
  {
    title: "Offer",
    color: "bg-teal-400",
    candidates: [
      {
        name: "Emma Thompson",
        role: "UX Designer",
        date: "2024-01-14",
        rating: 4.8,
      },
    ],
  },
  {
    title: "Hired",
    color: "bg-teal-700",
    candidates: [],
  },
];

const Dashboard: React.FC = () => {
  return (
<div className="bg-gray-100 p-8 rounded-2xl">
  <div
    className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-5 
      gap-4
      w-full
    "
  >
        {dashboardData.map((stage, idx) => (
          <StageColumn
            key={idx}
            title={stage.title}
            candidates={stage.candidates}
            color={stage.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
