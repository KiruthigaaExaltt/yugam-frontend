import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./midCard.css";
import { FiArrowRight, FiEdit } from "react-icons/fi";
import type { ReactNode } from "react";

interface MidCardProps {
  icon: ReactNode;
  title: string;
  badge?: string;
  description: string;

  /** Optional CTA button (Try Demo style) */
  ctaLabel?: string;
  ctaIcon?: ReactNode;
  onCtaClick?: () => void;

  /** Optional footer section (Roles style) */
  footer?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

const MidCard: React.FC<MidCardProps> = ({
  icon,
  title,
  badge,
  description,

  ctaLabel,
  ctaIcon = <FiArrowRight />,
  onCtaClick,

  footer,
  actionLabel,
  onActionClick,
}) => {
  return (
    <Card className="feature-card">
      {/* HEADER */}
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

      {/* DESCRIPTION */}
      <p className="description">{description}</p>

      {/* FOOTER / CTA */}
      {(ctaLabel || footer) && (
        <div className="card-footer">
          {/* Footer text (eg: users count) */}
          {footer && <span className="footer-text">{footer}</span>}

          {/* Action button (Edit / Try Demo) */}
          {(ctaLabel || actionLabel) && (
            <Button
              label={ctaLabel ?? actionLabel}
              icon={ctaIcon ?? <FiEdit />}
              iconPos="right"
              onClick={onCtaClick ?? onActionClick}
              className="p-button-text demo-button"
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default MidCard;
