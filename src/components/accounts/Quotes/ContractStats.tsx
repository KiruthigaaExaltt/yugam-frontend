import React, { useState } from "react";
import { PiBell, PiPauseCircle, PiPlayCircle, PiEye, PiFileText, PiFunnel } from "react-icons/pi";
import ManagementLayout, { ManagementItemCard } from "../../HOC/management/ManagementLayout";
import QuickActions from "../../HOC/quickActions/QuickAction";

const ContractStats: React.FC = () => {
  const [contracts, setContracts] = useState([
    {
      id: "CON-2024-001",
      customer: "TechStart Inc",
      status: "active",
      billingType: "Monthly",
      tags: ["Social Media Management", "Content Creation", "Strategy"],
      startDate: "Started: 2/1/2024",
      amount: "$3,500/mo",
      nextBill: "Next bill: 3/1/2024",
      alertInfo: "Alerts enabled"
    },
    {
      id: "CON-2024-002",
      customer: "Design Studio Pro",
      status: "active",
      billingType: "Monthly",
      tags: ["Social Media Management"],
      startDate: "Started: 1/20/2024",
      amount: "$2,200/mo",
      nextBill: "Next bill: 2/20/2024",
      alertInfo: "Alerts enabled"
    }
  ]);

  const activeCount = contracts.filter(c => c.status === 'active').length;
  const pausedCount = contracts.filter(c => c.status === 'paused').length;
  const activeAmount = contracts
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + parseFloat(c.amount.replace(/[^0-9.]/g, '')), 0);

  const togglePause = (id: string) => {
    setContracts(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
    ));
  };

  const ticketStats = [
    {
      id: "active",
      label: "Active Contracts",
      value: activeCount.toString(),
      subLabel: `$${activeAmount.toLocaleString()}/mo`,
      icon: <PiPlayCircle />,
      tone: "green",
      type: "stat",
    },
    {
      id: "paused",
      label: "Paused Contracts",
      value: pausedCount.toString(),
      icon: <PiPauseCircle />,
      tone: "orange",
      type: "stat",
    },
    {
      id: "alerts",
      label: "Renewal Alerts",
      value: "2",
      icon: <PiBell />,
      tone: "green",
      type: "stat",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <QuickActions actions={ticketStats} noWrapper={true} columns={3} cardBg="white" />

      <ManagementLayout 
        title="Contract Management"
        isCard={true}
        headerActions={[
          { label: "Filter", icon: <PiFunnel />, onClick: () => {} }
        ]}
        items={contracts}
        itemConfig={{ idKey: "id" }}
        renderItem={(item) => (
          <ManagementItemCard 
            item={item} 
            config={{
              titleKey: "id",
              statusKey: "status",
              subtitleKey: "customer",
              tagsKey: "tags",
              metaKey: "startDate",
              valueKey: "amount",
              valueLabelKey: "nextBill",
              actions: item.status === 'paused' ? [
                { label: "View Details", icon: <PiEye />, onClick: () => {} },
                { 
                  label: "Resume", 
                  icon: <PiPlayCircle />, 
                  onClick: () => togglePause(item.id),
                  className: "!bg-emerald-500 !text-white !border-emerald-500 hover:!bg-emerald-600" 
                }
              ] : [
                { label: "View Details", icon: <PiEye />, onClick: () => {} },
                { label: "Pause", icon: <PiPauseCircle />, onClick: () => togglePause(item.id) },
                { label: "Create Revision", icon: <PiFileText />, onClick: () => {} }
              ]
            }} 
          />
        )}
      />
    </div>
  );
};

export default ContractStats;
