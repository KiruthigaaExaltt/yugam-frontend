import type { FC } from "react";
import Marquee from "react-fast-marquee";
import { Card } from "primereact/card";
 
const CombinedMarquee: FC = () => {
  const logos: string[] = [
    "/img/react.png",
    "/img/prime.png",
    "/img/tailwind.png",
    "/img/node.png",
  ];
 
  return (
    <div className="p-6 space-y-6">
 
      {/* ⭐ Logo Marquee */}
      <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
        <Marquee speed={100} pauseOnHover gradient={true} gradientWidth={120}>
          {logos.map((src: string, index: number) => (
            <img
              key={index}
              src={src}
              className="h-16 mx-8 object-contain"
              alt={`logo-${index}`}
            />
          ))}
        </Marquee>
      </div>
 
      {/* ⭐ Text Marquee */}
      <Card title="Fast Marquee Example" className="shadow-lg rounded-xl">
        <Marquee
          speed={70}
          pauseOnHover
          gradient={true}
          className="text-xl font-semibold text-blue-600"
        >
          🚀 Welcome to PrimeReact • ⚡ Smooth Scrolling with react-fast-marquee •
          🎨 TailwindCSS Styling Included • 🧩 Fully Customizable •
        </Marquee>
      </Card>
 
    </div>
  );
};
 
export default CombinedMarquee;