import { useState } from "react";
import type { ClientSummaryCardProps } from "../HOC/ClientSummaryCard/ClientSummaryCard";
import ClientSummaryCard from "../HOC/ClientSummaryCard/ClientSummaryCard";
import FilterBar from "../HOC/filterbar/FilterBar";


const clients: ClientSummaryCardProps[] = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc",
    initials: "SJ",
    status: "active",
    priority: "high",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    lastContact: "2 days ago",
    tags: ["VIP", "Tech"],
    progressValue: 75,
    progressText: "12/16",
    revenue: "$25,000",
    progressColor: "#22c55e",
    projectsCount: 3,
    fullName: undefined
  },
  {
    name: "Michael Chen",
    company: "Design Studio Pro",
    initials: "MC",
    status: "active",
    priority: "medium",
    email: "mike@designpro.com",
    phone: "+1 (555) 987-6543",
    lastContact: "1 week ago",
    tags: ["Design", "Creative"],
    progressValue: 66,
    progressText: "8/12",
    revenue: "$18,500",
    progressColor: "#22c55e",
    projectsCount: 2,
    fullName: undefined
  },
  {
    name: "Emily Rodriguez",
    company: "Growth Marketing LLC",
    initials: "ER",
    status: "pending",
    priority: "high",
    email: "emily@growthllc.com",
    phone: "+1 (555) 456-7890",
    lastContact: "3 days ago",
    tags: ["Marketing", "Growth"],
    progressValue: 25,
    progressText: "2/8",
    revenue: "$12,000",
    progressColor: "#22c55e",
    projectsCount: 1,
    fullName: undefined
  },
];

export default function Dashboard() {
  // ✅ FILTER STATES
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  

  // ✅ FILTER LOGIC
 const filteredClients = clients.filter((client) => {
  const matchesSearch =
    search.trim() === "" ||
    client.name.toLowerCase().includes(search.toLowerCase());

  const matchesStage =
    !stage || client.status === stage;

  const matchesPriority =
    !priority || client.priority === priority;

  return matchesSearch && matchesStage && matchesPriority;
});
  return (
    <div>
      <div className="space-y-6 mt-3">
        <FilterBar
          searchPlaceholder="Search Clients..."
          stageOptions={[
           
            { label: "Active", value: "active" },
            { label: "Pending", value: "pending" },
            { label: "Inactive", value: "inactive" },
             
          ]}
          sourceOptions={[
            { label: "High Priority", value: "high" },
            { label: "Medium Priority", value: "medium" },
            { label: "Low Priority", value: "low" },
          ]}
          onSearch={setSearch}
          onStageChange={setStage}
          onSourceChange={setPriority}
        />
      </div>

      {/* ✅ FILTERED CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 mt-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((c, index) => (
            <ClientSummaryCard key={index} {...c} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No clients found
          </p>
        )}
      </div>



    </div>
  );
}
