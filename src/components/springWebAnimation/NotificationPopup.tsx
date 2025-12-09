import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function NotificationPopup() {
  const [show, setShow] = useState(false);

const popupAnimation = useSpring({
  opacity: show ? 1 : 0,
  transform: show ? "scale(1)" : "scale(0.5)",
  config: { tension: 180, friction: 14 },
});

  return (
    <div className="p-6">
      <button
        onClick={() => setShow(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Show Notification
      </button>

      {/* Animated Container */}
      {(
        <animated.div
          style={popupAnimation}
          className="fixed top-6 right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg min-w-[250px] flex justify-between items-center"
        >
          <span>Your action was successful!</span>

          <button
            className="ml-4 text-white font-bold"
            onClick={() => setShow(false)}
          >
            ✕
          </button>
        </animated.div>
      )}
    </div>
  );
}
