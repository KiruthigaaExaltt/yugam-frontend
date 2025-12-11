import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
 
interface Props {
    data: any[];
    dataKeyXaxis: string;
    dataKeyYaxis: string;
}
 
export default function BarChartComponent({ data ,  dataKeyXaxis,dataKeyYaxis}: Props) {
    return (
        <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey={ dataKeyXaxis}
                        interval={0}
                        tick={{ className: "text-[10px]" }}
                        // angle={-30}
                        // textAnchor="end"
                        height={50}
                    />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    {/* <Bar dataKey="price" fill="#8884d8" /> */}
                    <Bar dataKey={dataKeyYaxis} fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}