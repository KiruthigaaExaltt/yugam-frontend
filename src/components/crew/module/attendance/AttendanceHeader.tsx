import { useState } from "react";
import SmallCard from "../../../HOC/SmallCard/SmallCard";
import { CheckCircle2, XCircle, Clock, Calendar, Plus, Search, ChevronDown } from "lucide-react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const AttendanceHeader = () => {
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [globalFilter, setGlobalFilter] = useState("");

    const statusOptions = [
        { label: 'All Status', value: 'All Status' },
        { label: 'Present', value: 'Present' },
        { label: 'Absent', value: 'Absent' },
        { label: 'Late', value: 'Late' },
        { label: 'On Leave', value: 'On Leave' }
    ];

    return (
        <div className="px-1">
            {/* Header Section: Title + Today Pill */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
                <div className="flex items-center gap-3">
                    <h1 className="font-bold text-2xl text-[var(--text-color)]">Attendance Management</h1>
                    <span className="bg-[#E0F2FE] text-[#0369A1] text-xs font-bold px-3 py-1 rounded-full">
                        Today: 2/3
                    </span>
                </div>
            </div>

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <SmallCard
                    icon={<CheckCircle2 size={20} className="text-[#059669]" />}
                    title="Present Today"
                    value="2"
                    iconBg="#ECFDF5"
                    valueColor="#059669"
                />

                <SmallCard
                    icon={<XCircle size={20} className="text-[#DC2626]" />}
                    title="Absent Today"
                    value="0"
                    iconBg="#FEF2F2"
                    valueColor="#DC2626"
                />

                <SmallCard
                    icon={<Clock size={20} className="text-[#D97706]" />}
                    title="Late Today"
                    value="0"
                    iconBg="#FFFBEB"
                    valueColor="#D97706"
                />

                <SmallCard
                    icon={<Calendar size={20} className="text-[#2563EB]" />}
                    title="On Leave"
                    value="1"
                    iconBg="#EEF2FF"
                    valueColor="#2563EB"
                />
            </div>

            {/* Filter Section: Search + Status Filter + Mark Attendance (UAM inspired) */}
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-4 bg-[var(--surface-card)] p-4 rounded-xl border border-[var(--surface-border)] shadow-sm mt-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <InputText
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search attendance..."
                            className="w-full !pl-12 pr-4 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color-light)] transition-all text-[var(--text-color)]"
                        />
                    </div>
                    <Dropdown
                        value={statusFilter}
                        options={statusOptions}
                        onChange={(e) => setStatusFilter(e.value)}
                        placeholder="All Status"
                        className="w-full sm:w-40 h-10 bg-[var(--surface-card)] border-[var(--surface-border)] rounded-lg text-sm flex items-center focus-within:border-[var(--primary-color)] focus-within:ring-2 focus-within:ring-[var(--primary-color-light)] text-[var(--text-color)]"
                        dropdownIcon={<ChevronDown size={16} className="text-gray-400" />}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <Button
                        label="Mark Attendance"
                        icon={<Plus size={16} />}
                        className="h-10 text-sm gap-2 border-none shadow-sm font-medium w-full sm:w-auto px-4"
                        style={{
                            borderRadius: "8px",
                            backgroundColor: "var(--primary-color)",
                            color: "#fff",
                            border: "1px solid var(--primary-color)"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AttendanceHeader;
