import { useInView } from "react-intersection-observer";

export default function TestObserver() {
  const { ref, inView } = useInView({
    // triggerOnce: false,   // detect every time it enters
    threshold: 0.1,       // fire when 10% is visible
  });

  return (
    <div style={{ height: "150vh", paddingTop: "50px" }}>
      <div
        ref={ref}
        style={{
          height: "200px",
          backgroundColor: inView ? "green" : "red",
          transition: "0.3s",
        }}
      >
        <h1 style={{ color: "#fff" }}>Scroll to see color change</h1>
      </div>
    </div>
  );
}
