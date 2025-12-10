import ReusableChart from "../HOC/charts/ReusableChart";


export default function ChartDashboard() {
    return (
        <div className="flex flex-col gap-6">

            {/* Row with 2 charts using flex */}
            <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[300px]">
                    <ReusableChart type="bar" label="Sales (Bar Chart)" />
                </div>

                <div className="flex-1 min-w-[300px]">
                    <ReusableChart type="pie" label="Sales (Pie Chart)" />
                </div>
            </div>

            {/* Third chart full width */}
            <div className="w-full">
                <ReusableChart type="doughnut" label="Sales (Doughnut Chart)" />
            </div>

        </div>
    );
}
