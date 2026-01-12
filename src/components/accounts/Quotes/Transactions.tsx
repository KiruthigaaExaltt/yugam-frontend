import React from "react";
import { 
  PiArrowsCounterClockwise, 
  PiTrendUp,
  PiTrendDown,
  PiCalculator,
  PiArrowUpRight,
  PiArrowDownLeft,
  PiBuildings,
  PiArrowsClockwise,
  PiPlus
} from "react-icons/pi";
import QuickActions from "../../HOC/quickActions/QuickAction";
import MeetingCard from "../../HOC/meetingCard/MeetingCard";

const Transactions: React.FC = () => {
  const transactions = [
    {
      title: "Monthly recurring payment - TechStart Inc",
      category: "Recurring Revenue",
      date: "2/1/2024",
      ref: "Ref: REC-INV-2024-001",
      company: "TechStart Inc",
      amount: "+$3,500",
      isRecurring: true,
      income: true
    },
    {
      title: "Monthly recurring payment - Design Studio Pro",
      category: "Recurring Revenue",
      date: "2/1/2024",
      ref: "Ref: REC-INV-2024-002",
      company: "Design Studio Pro",
      amount: "+$2,200",
      isRecurring: true,
      income: true
    },
    {
      title: "Onboarding setup fee - TechStart Inc",
      category: "One-time Setup",
      date: "1/20/2024",
      ref: "Ref: Q2024-001",
      company: "TechStart Inc",
      amount: "+$2,500",
      isRecurring: false,
      income: true
    },
    {
      title: "Office rent payment",
      category: "Rent",
      date: "1/20/2024",
      ref: "Ref: RENT-JAN-2024",
      company: "",
      amount: "-$3,200",
      isRecurring: false,
      income: false
    },
    {
      title: "Marketing tools subscriptions",
      category: "Software",
      date: "1/18/2024",
      ref: "Ref: SUB-JAN-2024",
      company: "",
      amount: "-$850",
      isRecurring: false,
      income: false
    }
  ];

  const invoiceStats = [
    {
      id: "recurring",
      value: "$5,700",
      subLabel: "Recurring Revenue",
      icon: <PiArrowsCounterClockwise />,
      tone: "green",
      type: "stat",
    },
    {
      id: "payin",
      value: "$8,200",
      subLabel: "Total Pay-In",
      icon: <PiTrendUp />,
      tone: "green",
      type: "stat",
    },
    {
      id: "payout",
      value: "$4,050",
      subLabel: "Total Pay-Out",
      icon: <PiTrendDown />,
      tone: "red",
      type: "stat",
    },
    {
      id: "balance",
      value: "$4,150",
      subLabel: "Net Balance",
      icon: <PiCalculator />,
      tone: "green",
      type: "stat",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <QuickActions actions={invoiceStats} noWrapper={true} columns={4} cardBg="white" />

      <div className="bg-white border border-(--surface-border) rounded-(--border-radius) shadow-sm p-4">
        {/* CUSTOM HEADER FOR MEETINGCARD */}
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="text-gray-800 font-bold text-base">Transaction History</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-pointer">
              All Types <i className="pi pi-chevron-down text-[10px]" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 cursor-pointer">
              All Transactions <i className="pi pi-chevron-down text-[10px]" />
            </div>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-800 hover:bg-gray-50">
               <PiPlus /> Add Transaction
            </button>
          </div>
        </div>

        <MeetingCard 
          meetings={transactions.map(t => ({
            title: t.title,
            tone: t.income ? "green" : "red",
            mainIcon: (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${t.income ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                {t.income ? <PiArrowUpRight size={18} /> : <PiArrowDownLeft size={18} />}
              </div>
            ),
            rightContent: (
              <div className={`text-lg font-bold shrink-0 ml-4 ${t.income ? 'text-emerald-500' : 'text-red-500'}`}>
                {t.amount}
              </div>
            ),
            children: (
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                  <span>{t.category}</span>
                  <span>{t.date}</span>
                  <div className="flex items-center gap-2">
                    <span>{t.ref}</span>
                    {t.isRecurring && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-[10px] text-gray-500 leading-none">
                        <PiArrowsClockwise className="text-[10px]" /> Recurring
                      </span>
                    )}
                  </div>
                </div>
                {t.company && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                    <PiBuildings className="text-gray-400" />
                    <span>{t.company}</span>
                  </div>
                )}
              </div>
            )
          }))}
        />
      </div>
    </div>
  );
};

export default Transactions;
