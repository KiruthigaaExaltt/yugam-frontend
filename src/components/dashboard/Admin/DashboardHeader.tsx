import PageHeader from "../../HOC/pageHeader/PageHeader";

interface DashboardHeaderProps {
    view: 'admin' | 'user';
    setView: (view: 'admin' | 'user') => void;
}

export default function DashboardHeader({ view, setView }: DashboardHeaderProps) {
  return (
    <PageHeader
      title="Dashboard Overview"
      subtitle="Real-time business insights and performance metrics"
    >
      <div className="flex bg-gray-100/80 p-1 rounded-full w-fit cursor-pointer border border-gray-200">
        <button
          onClick={() => setView("admin")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            view === "admin"
              ? "bg-white shadow-sm text-gray-900 ring-1 ring-emerald-500"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Admin View
        </button>
        <button
          onClick={() => setView("user")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            view === "user"
              ? "bg-white shadow-sm text-gray-900 ring-1 ring-emerald-500"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          User View
        </button>
      </div>
    </PageHeader>
  );
}