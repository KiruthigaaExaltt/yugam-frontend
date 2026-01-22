import { MdSchedule } from "react-icons/md";
import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiDownload } from "react-icons/fi";
import StatsCard from "../HOC/dashboard/StatsCard";
import { FaCheckCircle, FaClock, FaDollarSign } from "react-icons/fa";
import MeetingCard from "../HOC/meetingCard/MeetingCard";
import SingleLineCard from "../HOC/singlelineCard/SingleLineCard";
import { Button } from "primereact/button";
import QuickActions from "../HOC/quickActions/QuickAction";

const Reports = () => {

    return (
        <>
            <PageHeader
                title="Reports & Analytics"
                subtitle="Track your quote performance and key metrics"
                actions={[
                    {
                        label: "Export Reports",
                        icon: <FiDownload size={16} />,
                        variant: "secondary",
                        // onClick: () => console.log("Preview clicked"),   
                    },
                    {
                        label: "Schedule Reports",
                        icon: <MdSchedule size={16} />,
                        variant: "primary",
                        // onClick: () => setShowModal(true),
                    }
                ]}
            />
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Revenue"
                        value="₹4.43Cr"
                        icon={<FaDollarSign />}
                        forceBlackText
                        trendLabel="+18.2% from last month"
                        trendPositive={true}
                        iconPosition="right"
                    />

                    <StatsCard
                        title="Win Rate"
                        value="68%"
                        icon={<FaClock />}
                        forceBlackText
                        trendLabel="+5.3% from last month"
                        trendPositive={false}
                        iconPosition="right"
                    />

                    <StatsCard
                        title="Avg. Quote Value"
                        value="₹22.4L"
                        icon={<FaCheckCircle />}
                        trendLabel="+12.7% from last month"
                        trendPositive
                        iconPosition="right"
                        forceBlackText
                    />
                    <StatsCard
                        title="Active Quotes"
                        value="19"
                        icon={<FaClock />}
                        forceBlackText
                        trendLabel="3 pending approval"
                        iconPosition="right"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Quote Pipeline by Status */}
                    <MeetingCard
                        title="Quote Pipeline by Status"
                        meetings={[
                            {
                                title: "Draft",
                                mainIcon: <div className="w-3 h-3 rounded-sm bg-gray-500"></div>,
                                tone: "green", // tint
                                rightContent: (
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-800">5 quotes</div>
                                        <div className="text-xs text-gray-500">₹12.5M</div>
                                    </div>
                                ),
                            },
                            {
                                title: "Sent",
                                mainIcon: <div className="w-3 h-3 rounded-sm bg-purple-500"></div>,
                                rightContent: (
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-800">8 quotes</div>
                                        <div className="text-xs text-gray-500">₹18.8M</div>
                                    </div>
                                ),
                            },
                            {
                                title: "Approved",
                                mainIcon: <div className="w-3 h-3 rounded-sm bg-blue-500"></div>,
                                rightContent: (
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-800">3 quotes</div>
                                        <div className="text-xs text-gray-500">₹7.2M</div>
                                    </div>
                                ),
                            },
                            {
                                title: "Won",
                                mainIcon: <div className="w-3 h-3 rounded-sm bg-green-500"></div>,
                                rightContent: (
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-800">2 quotes</div>
                                        <div className="text-xs text-gray-500">₹4.3M</div>
                                    </div>
                                ),
                            },
                            {
                                title: "Lost",
                                mainIcon: <div className="w-3 h-3 rounded-sm bg-red-500"></div>,
                                rightContent: (
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-800">1 quotes</div>
                                        <div className="text-xs text-gray-500">₹1.8M</div>
                                    </div>
                                ),
                            },
                        ]}
                    />

                    {/* Profitability Analysis */}
                    <SingleLineCard
                        title="Profitability Analysis"
                        items={[
                            { label: "Average Margin", value: "16.5%", valueTone: "primary" },
                            { label: "Best Performing Industry", value: "PEB (18.2%)" },
                            { label: "Total Quote Value", value: "₹4.43Cr" },
                            { label: "Expected Profit", value: "₹73.1L", valueTone: "success" },
                        ]}
                        footer={
                            <Button
                                label="Detailed Analysis"
                                icon="pi pi-history"
                                className="w-full p-button-rounded"
                                style={{
                                    background: "#009688",
                                    border: "none",
                                    padding: "10px",
                                    fontWeight: "600"
                                }}
                            />
                        }
                    />
                </div>

                <div className="mt-6">
                    <QuickActions
                        title="Monthly Quote Trends"
                        columns={6}
                        isTinted={false}
                        variant="default" // Using default border/card style
                        actions={[
                            {
                                id: "jan",
                                type: "stat",
                                icon: <span className="text-sm font-semibold text-gray-500">Jan</span>,
                                value: <span className="text-2xl font-bold text-teal-600">12</span>,
                                label: <span className="text-xs text-gray-400">₹2.4Cr</span>,
                                subLabel: <span className="text-xs text-green-500">+8%</span>,
                                tone: "green", // border color hint
                            },
                            {
                                id: "feb",
                                type: "stat",
                                icon: <span className="text-sm font-semibold text-gray-500">Feb</span>,
                                value: <span className="text-2xl font-bold text-teal-600">15</span>,
                                label: <span className="text-xs text-gray-400">₹3.1Cr</span>,
                                subLabel: <span className="text-xs text-green-500">+15%</span>,
                                tone: "green",
                            },
                            {
                                id: "mar",
                                type: "stat",
                                icon: <span className="text-sm font-semibold text-gray-500">Mar</span>,
                                value: <span className="text-2xl font-bold text-teal-600">18</span>,
                                label: <span className="text-xs text-gray-400">₹3.8Cr</span>,
                                subLabel: <span className="text-xs text-green-500">+22%</span>,
                                tone: "green",
                            },
                            {
                                id: "apr",
                                type: "stat",
                                icon: <span className="text-sm font-semibold text-gray-500">Apr</span>,
                                value: <span className="text-2xl font-bold text-teal-600">14</span>,
                                label: <span className="text-xs text-gray-400">₹2.9Cr</span>,
                                subLabel: <span className="text-xs text-red-500">-5%</span>,
                                tone: "green", // Keeping tone green for consist border, manual color override in subLabel
                            },
                            {
                                id: "may",
                                type: "stat",
                                icon: <span className="text-sm font-semibold text-gray-500">May</span>,
                                value: <span className="text-2xl font-bold text-teal-600">19</span>,
                                label: <span className="text-xs text-gray-400">₹4.2Cr</span>,
                                subLabel: <span className="text-xs text-green-500">+18%</span>,
                                tone: "green",
                            },
                            {
                                id: "jun",
                                type: "stat",
                                icon: <span className="text-sm font-semibold text-gray-500">Jun</span>,
                                value: <span className="text-2xl font-bold text-teal-600">16</span>,
                                label: <span className="text-xs text-gray-400">₹3.6Cr</span>,
                                subLabel: <span className="text-xs text-green-500">+12%</span>,
                                tone: "green",
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};
export default Reports;
