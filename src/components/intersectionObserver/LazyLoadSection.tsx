import { useInView } from "react-intersection-observer";
import { lazy, Suspense, useState } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));

export default function LoadOnScrollBottom() {
  const { ref, inView } = useInView({
    threshold: 1,  
  });

  const [visible, setVisible] = useState(false);

  // When bottom div comes into view → load component
  if (inView && !visible) {
    setVisible(true);
  }

  return (
    <div>
      {/* Your page content */}
      <div style={{ height: "1200px"}}>Scroll down...</div>

      {/* bottom detector */}
      <div ref={ref}  />

      {inView && (
        <Suspense fallback={<p>Loading chart...</p>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
