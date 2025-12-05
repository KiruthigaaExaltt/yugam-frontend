
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./midCard.css";
import { FiArrowRight } from "react-icons/fi";
import type { ReactNode } from "react";

interface MidCardProps {
    icon: ReactNode;
    title: string;
    badge?: string;
    description: string;
}

const MidCard: React.FC<MidCardProps> = ({ icon, title, badge, description }) => {
    console.log("MidCard rendered", title, badge, description);
    return (
        <Card className="feature-card">
            <div className="card-header">
                <div className="left">
                    <div className="icon">{icon}</div>
                    <h3 className="title">{title}</h3>

                    {badge ? (
                    <span className={`badge ${badge.toLowerCase()}`}>{badge}</span>
                ) : null}

                </div>

                    
                
            </div>
            <p className="description">{description}</p>
            <Button
                label="Try Demo"
                icon={<span className="p-button-icon p-button-icon-right"><FiArrowRight /></span>}
                className="p-button-text demo-button"
            />
        </Card>
    );
};

export default MidCard;
