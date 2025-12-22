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

const MidCard: React.FC<MidCardProps> = ({
  icon,
  title,
  badge,
  description,
}) => {
  return (
    
    <Card className="feature-card">
      {/* HEADER ROW */}
      <div className="card-header">
        <div className="header-left">
          <div className="icon">{icon}</div>
          <h3 className="title">{title}</h3>
        </div>

        {badge && (
          <span className={`badge ${badge.toLowerCase()}`}>
            {badge}
          </span>
        )}
      </div>

      {/* SPACING + DESCRIPTION */}
      <p className="description">{description}</p>

      {/* CTA */}
      <Button
        label="Try Demo"
        icon={<FiArrowRight />}
        iconPos="right"
        className="p-button-text demo-button"
      />
    </Card>
  );
};

export default MidCard;
