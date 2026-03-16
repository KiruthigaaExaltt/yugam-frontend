import React from 'react';

interface LoadingDotsProps {
    className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ className = "" }) => {
    return (
        <div className={`loading-dots ${className}`}>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
        </div>
    );
};

export default LoadingDots;
