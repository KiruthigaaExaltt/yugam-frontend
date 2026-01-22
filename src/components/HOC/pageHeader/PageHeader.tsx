// export default PageHeader;
import React from "react";
import { Button } from "primereact/button";
import "./pageheader.css";

interface HeaderAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

interface PageHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  buttonIcon?: string;
  actions?: HeaderAction[];
}

const PageHeader: React.FC<PageHeaderProps & { children?: React.ReactNode }> = ({
  icon,
  title,
  subtitle,
  actions,
  children
}) => {
  return (
    <div
      className="w-full"
      style={{
        background: "var(--surface-ground)",
        fontFamily: "var(--font-primary)",
        padding: "clamp(12px, 2vw, 16px)", // ✅ responsive padding
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left */}
        <div className="flex items-start gap-3">
          {icon && (
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                background: "var(--primary-color)",
                color: "var(--primary-color)",
                width: "clamp(36px, 4vw, 40px)",
                height: "clamp(36px, 4vw, 40px)",
              }}
            >
              {icon}
            </div>
          )}

          <div>
            {/* Title */}
            <h1
              style={{
                fontSize: "var(--font-size-h1)",
                fontWeight: "var(--font-weight-semibold)",
                lineHeight: "var(--line-height-tight)",
                color: "var(--text-color)",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                style={{
                  fontSize: "var(--font-size-body-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  lineHeight: "var(--line-height-normal)",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
            {children}
            {actions && actions.length > 0 && (
                <>
                {actions.map((action, index) => (
                    <Button
                    key={index}
                    label={action.label}
                    icon={action.icon}
                    onClick={action.onClick}
                    className="p-button-text demo-button"
                    // style={getButtonStyle(action.variant)}
                    />
                ))}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
