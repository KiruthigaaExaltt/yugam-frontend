import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";


interface Props {
    data: any[];
    dataKeyXaxis: string;
    dataKeyYaxis: string;
}

export default function AreaChartComponent({ data , dataKeyXaxis, dataKeyYaxis}: Props) {
    return (
        <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="purple" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="purple" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <Area
                        type="monotone"
                        dataKey={dataKeyYaxis}
                        stroke="purple"
                        fill="url(#colorUv)"
                        strokeWidth={2}
                    // name="My data series name"
                    />

                    <XAxis
                        dataKey={dataKeyXaxis}
                        interval={0}
                        tick={{ className: "text-[10px]" }}
                        // angle={-30}
                        // textAnchor="end"
                        height={50}
                    />
                    <YAxis width={40} label={{ value: dataKeyYaxis, position: "insideLeft", angle: -90 }} />
                    {/* <Legend align="right" /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}