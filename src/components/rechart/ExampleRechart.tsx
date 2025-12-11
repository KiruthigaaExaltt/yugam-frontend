import { useGetListQuery } from "../../api/genericApi";
import AreaChartComponent from "../HOC/rechart/AreaChartComponent";
import BarChartComponent from "../HOC/rechart/BarChartComponent";
import LineChartComponent from "../HOC/rechart/LineChartComponent";


// const data = [
//   { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
//   { name: "Page B", uv: 300, pv: 4567, amt: 2400 },
//   { name: "Page C", uv: 320, pv: 1398, amt: 2400 },
//   { name: "Page D", uv: 200, pv: 9800, amt: 2400 },
//   { name: "Page E", uv: 278, pv: 3908, amt: 2400 },
//   { name: "Page F", uv: 189, pv: 4800, amt: 2400 },
// ];

// export default function Step5() {
//   return (
//     <div className="space-y-16">
//       <AreaChartComponent data={data} />
//       <BarChartComponent data={data} />
//       <LineChartComponent data={data} />
//     </div>
//   );
// }

interface Product {
  brand: string;
  price: number;
}

interface ProductsResponse {
  products: Product[];
}
export default function ExampleRechart() {

    const { data } = useGetListQuery({ resource: "products" });

    const products = data as ProductsResponse | Product[] | undefined;

    console.log("Products data for recharts:", products);

const chartData =
  Array.isArray(products)
    ? products.map((item) => ({
        name: item.brand,
        price: item.price,
      }))
    : products?.products?.map((item : any) => ({
        name: item.brand,
        price: item.price,
      })) ?? [];

      console.log("Transformed chart data:", chartData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-4 bg-white rounded-xl shadow">
                <AreaChartComponent data={chartData} dataKeyXaxis = "name" dataKeyYaxis = "price"/>
            </div>

            <div className="p-4 bg-white rounded-xl shadow">
                <BarChartComponent data={chartData} dataKeyXaxis = "name" dataKeyYaxis = "price"/>
            </div>

            <div className="p-4 bg-white rounded-xl shadow">
                <LineChartComponent data={chartData} dataKeyXaxis = "name" dataKeyYaxis = "price"/>
            </div>
        </div>
    );
}