import React, { useState } from "react";
import { 
  PiCheckCircle, 
  PiClock, 
  PiWarningCircle, 
  PiArrowsCounterClockwise, 
  PiFunnel, 
  PiArrowsClockwise, 
  PiEye, 
  PiDownloadSimple 
} from "react-icons/pi";
import ManagementLayout, { ManagementItemCard } from "../../HOC/management/ManagementLayout";
import QuickActions from "../../HOC/quickActions/QuickAction";

const RecuringInvoice: React.FC = () => {
  const [invoices, setInvoices] = useState([
    {
      id: "REC-INV-2024-001",
      customer: "TechStart Inc",
      status: "paid",
      secondaryStatus: "Recurring",
      period: "Period: Feb 2024",
      issuedDate: "Issued: 2/1/2024",
      amount: "$3,500",
      dueDate: "Due: 2/15/2024",
      nextDate: "Next: 3/1/2024",
    },
    {
      id: "REC-INV-2024-002",
      customer: "Design Studio Pro",
      status: "pending",
      secondaryStatus: "Recurring",
      period: "Period: Feb 2024",
      issuedDate: "Issued: 2/1/2024",
      amount: "$2,200",
      dueDate: "Due: 2/20/2024",
      nextDate: "Next: 3/1/2024",
    },
    {
      id: "REC-INV-2024-003",
      customer: "TechStart Inc",
      status: "overdue",
      secondaryStatus: "Recurring",
      period: "Period: Jan 2024",
      issuedDate: "Issued: 1/1/2024",
      amount: "$3,500",
      dueDate: "Due: 1/15/2024",
    }
  ]);

  const markAsPaid = (id: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id ? { ...inv, status: 'paid' } : inv
    ));
  };

  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const pendingCount = invoices.filter(inv => inv.status === 'pending').length;
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;

  const getSum = (status: string) => {
    return invoices
      .filter(inv => inv.status === status)
      .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.]/g, '')), 0);
  };

  const invoiceStats = [
    {
      id: "paid",
      label: "Paid Invoices",
      value: paidCount.toString(),
      subLabel: `$${getSum('paid').toLocaleString()}`,
      icon: <PiCheckCircle />,
      tone: "green",
      type: "stat",
    },
    {
      id: "pending",
      label: "Pending Invoices",
      value: pendingCount.toString(),
      subLabel: `$${getSum('pending').toLocaleString()}`,
      icon: <PiClock />,
      tone: "orange",
      type: "stat",
    },
    {
      id: "overdue",
      label: "Overdue Invoices",
      value: overdueCount.toString(),
      subLabel: `$${getSum('overdue').toLocaleString()}`,
      icon: <PiWarningCircle />,
      tone: "red",
      type: "stat",
    },
    {
      id: "auto",
      label: "Auto-Generating",
      value: "2",
      subLabel: "Monthly",
      icon: <PiArrowsCounterClockwise />,
      tone: "green",
      type: "stat",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <QuickActions actions={invoiceStats} noWrapper={true} columns={4} cardBg="white" />

      <ManagementLayout 
        title="Recurring Invoice Management"
        isCard={true}
        headerActions={[
          { label: "Filter", icon: <PiFunnel />, onClick: () => {} },
          { label: "Generate Next Cycle", icon: <PiArrowsClockwise />, onClick: () => {} }
        ]}
        items={invoices}
        itemConfig={{
          idKey: "id",
          titleKey: "id",
          statusKey: "status",
          secondaryStatusKey: "secondaryStatus",
          subtitleKey: "customer",
          descriptionKey: "period",
          metaKey: "issuedDate",
          valueKey: "amount",
          valueLabelKey: "dueDate",
          secondaryValueLabelKey: "nextDate",
          actions: [
            { label: "View", icon: <PiEye />, onClick: () => {} },
            { label: "Download", icon: <PiDownloadSimple />, onClick: () => {} }
          ]
        }}
        renderItem={(item) => (
          <ManagementItemCard 
            item={item} 
            config={{
              titleKey: "id",
              statusKey: "status",
              secondaryStatusKey: "secondaryStatus",
              subtitleKey: "customer",
              descriptionKey: "period",
              metaKey: "issuedDate",
              valueKey: "amount",
              valueLabelKey: "dueDate",
              secondaryValueLabelKey: "nextDate",
              actions: (item.status === 'pending' || item.status === 'overdue') ? [
                { label: "View", icon: <PiEye />, onClick: () => {} },
                { label: "Download", icon: <PiDownloadSimple />, onClick: () => {} },
                { 
                  label: "Mark as Paid", 
                  icon: <PiCheckCircle />, 
                  onClick: () => markAsPaid(item.id),
                  className: "!bg-emerald-500 !text-white !border-emerald-500 hover:!bg-emerald-600" 
                }
              ] : [
                { label: "View", icon: <PiEye />, onClick: () => {} },
                { label: "Download", icon: <PiDownloadSimple />, onClick: () => {} }
              ]
            }} 
          />
        )}
      />
    </div>
  );
};

export default RecuringInvoice;
