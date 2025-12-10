import { useRef } from "react";
import profilePic from "../../assets/images/jannis-brandt-8manzosDSGM-unsplash.webp";
import { downloadElementAsImage } from "../../utils/htmlToImage";


export default function HtmlToImageCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (cardRef.current) {
      downloadElementAsImage(cardRef.current, "profile-card.png");
    }
  };

  return (
    <div className="p-4">

      {/* Content to convert */}
      <div ref={cardRef} className="w-64 p-4 bg-blue-500 text-white rounded-xl shadow-lg">
        <img src={profilePic} className="w-20 h-20 rounded-full mx-auto mb-3" />
        <h1 className="text-center text-lg font-bold">Your Name</h1>

        <img src={profilePic} className="w-20 h-20 rounded-full mx-auto mb-3" />
        <h1 className="text-center text-lg font-bold">Your Name</h1>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Download as Image
      </button>
    </div>
  );
}
