import { Card } from "primereact/card";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useState, useEffect } from "react";

export default function TestVideo() {
  const videoId = "rANa23Pxxo0";

  const [mounted, setMounted] = useState(false);

  // Fix for Plyr DOM race condition
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      className="w-full max-w-xl mx-auto shadow-xl rounded-2xl p-4 bg-white"
      title="YouTube Player"
    >
      <div className="flex justify-center">
        {mounted && (
          <Plyr
            key={videoId}  // <--- FORCES STABLE MOUNTING
            source={{
              type: "video",
              sources: [{ src: videoId, provider: "youtube" }],
            }}
          />
        )}
      </div>
    </Card>
  );
}
