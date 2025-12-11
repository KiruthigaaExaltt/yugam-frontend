import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
 
interface Props {
  data: any[];
  dataKeyXaxis: string;
  dataKeyYaxis: string;
}
export default function LineChartComponent({ data ,dataKeyXaxis, dataKeyYaxis }: Props) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                        dataKey={ dataKeyXaxis}
                        interval={0}
                        tick={{ className: "text-[10px]" }}
                        // angle={-30}
                        // textAnchor="end"
                        height={50}
                    />
          <YAxis width={50} />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="price" stroke="#8884d8" /> */}
          <Line type="monotone" dataKey={dataKeyYaxis} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}