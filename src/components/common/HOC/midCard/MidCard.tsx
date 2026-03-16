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
  iconBg?: string; // 🔥 Added for specific icon background colors

  /** Optional CTA button (Try Demo style) */
  ctaLabel?: string;
  ctaIcon?: ReactNode;
  isPrimary?: boolean; // 🔥 Added for filled blue button style
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
  iconBg = "var(--icon-bg)",

  ctaLabel,
  ctaIcon = <FiArrowRight />,
  isPrimary = false,
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
          <div className="icon" style={{ backgroundColor: iconBg }}>{icon}</div>
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
              icon={ctaIcon}
              iconPos="right"
              onClick={onCtaClick ?? onActionClick}
              className={`p-button-text demo-button ${isPrimary ? 'primary-btn' : 'secondary-btn'}`}
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default MidCard;
