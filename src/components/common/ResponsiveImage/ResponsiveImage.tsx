import React, { useState } from "react";
import "./ResponsiveImage.css";

  import firstImage from
    "../../../assets/images/jannis-brandt-8manzosDSGM-unsplash.webp?w=768;1024;1440&format=avif;webp;jpg&as=picture&placeholder";

import secondImage from
  "../../../assets/images/magdalena-raczka-wCeAntPp-b4-unsplash.jpg?w=768;1024&format=avif;webp;jpg&as=picture&placeholder";

const ResponsiveImage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  const formatToMime = (format: string) => {
    const mimes: Record<string, string> = {
      avif: "image/avif",
      webp: "image/webp",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
    };
    return mimes[format] || `image/${format}`;
  };

  return (
    <div className="responsive-image-container">
      <picture className="image-wrapper">

        {/* Desktop (≥1024px) - Show firstImage */}
        {Object.entries(firstImage.sources).map(([format, srcset]) => (
          <source
            key={`desktop-${format}`}
            type={formatToMime(format)}
            srcSet={typeof srcset === 'string' ? srcset : (srcset as any).srcset}
            media="(min-width: 1024px)"
          />
        ))}

        {/* Tablet (768px to 1023px) - Show secondImage */}
        {Object.entries(secondImage.sources).map(([format, srcset]) => (
          <source
            key={`tablet-${format}`}
            type={formatToMime(format)}
            srcSet={typeof srcset === 'string' ? srcset : (srcset as any).srcset}
            media="(min-width: 768px)"
          />
        ))}

        {/* Fallback image - Show firstImage 
        
        
        */}
        <img
          src={firstImage.img.src}
          width={firstImage.img.width}
          height={firstImage.img.height}
          alt="Responsive display"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`responsive-img ${loaded ? "loaded" : "blurred"}`}
        />

      </picture>

      <p className="mobile-fallback">
        Image not available on mobile view.
      </p>
    </div>
  );
};

export default ResponsiveImage;