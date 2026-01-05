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
        <button 
            className="flex bg-gray-100 p-1 rounded-full w-fit cursor-pointer"
            onClick={() => setView(view === 'admin' ? 'user' : 'admin')}
        >
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${view === 'admin' ? 'bg-white shadow-sm text-gray-900 ring-1 ring-emerald-500' : 'text-gray-500 hover:text-gray-900'}`}>
                Admin View
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${view === 'user' ? 'bg-white shadow-sm text-gray-900 ring-1 ring-emerald-500' : 'text-gray-500 hover:text-gray-900'}`}>
                User View
            </span>
        </button>
    </PageHeader>
  );
}