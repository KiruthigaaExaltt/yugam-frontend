import React, { useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { FiDownload } from "react-icons/fi";

const RetentionPoliciesCard: React.FC = () => {
  const [messageRetention, setMessageRetention] = useState<number>(2);
  const [fileRetention, setFileRetention] = useState<number>(5);
  const [auditRetention, setAuditRetention] = useState<number>(7);
  const [analyticsRetention, setAnalyticsRetention] = useState<number | null>(null);

  const retentionOptions = [
    { label: "1 year", value: 1 },
    { label: "2 years", value: 2 },
    { label: "5 years", value: 5 },
    { label: "7 years", value: 7 },
  ];

  /* Helper for Retention Rows */
  const PolicyRow = ({ label, value, onChange, options }: any) => (
    <div className="flex justify-between items-center h-10">
      <span className="text-sm font-medium text-[var(--text-color)]">{label}</span>
      <Dropdown
        value={value}
        options={options}
        onChange={onChange}
        className="w-32 p-inputtext-sm"
        style={{ borderRadius: "0.5rem" }}
      />
    </div>
  );

  /* Helper for Export Tool Items */
  const ExportToolItem = ({ title, description }: { title: string; description: string }) => (
    <div 
      className="flex items-center gap-4 p-3 border cursor-pointer transition-all duration-300 group"
      style={{ 
        borderRadius: "var(--card-radius)",
        borderColor: "var(--surface-border)"
      }}
      onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
      onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--surface-border)'}
    >
      <div className="w-10 h-10 rounded-full bg-[var(--surface-hover)] flex items-center justify-center text-gray-400 group-hover:text-[var(--primary-color)] transition-all duration-300">
        <FiDownload size={18} />
      </div>
      <div>
        <div className="font-semibold text-sm text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-300">{title}</div>
        <div className="text-xs text-gray-400">{description}</div>
      </div>
    </div>
  );

  return (
    <Card
      className="rounded-[var(--border-radius)] border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--surface-border)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT COLUMN: RETENTION POLICIES */}
        <div>
          <h3
            className="mb-6"
            style={{
              color: "var(--text-color)",
              fontSize: "var(--card-title-size)",
              fontWeight: "var(--card-title-weight)",
            }}
          >
            Retention Policies
          </h3>

          <div className="space-y-4">
            <PolicyRow
              label="Messages"
              value={messageRetention}
              options={retentionOptions}
              onChange={(e: any) => setMessageRetention(e.value)}
            />
            <PolicyRow
              label="Files"
              value={fileRetention}
              options={retentionOptions}
              onChange={(e: any) => setFileRetention(e.value)}
            />
            <PolicyRow
              label="Audit Logs"
              value={auditRetention}
              options={retentionOptions}
              onChange={(e: any) => setAuditRetention(e.value)}
            />
            <PolicyRow
              label="Analytics Data"
              value={analyticsRetention}
              options={[...retentionOptions, { label: "Not retained", value: null }]}
              onChange={(e: any) => setAnalyticsRetention(e.value)}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: EXPORT TOOLS */}
        <div>
          <h3
            className="mb-6"
            style={{
              color: "var(--text-color)",
              fontSize: "var(--card-title-size)",
              fontWeight: "var(--card-title-weight)",
            }}
          >
            Export Tools
          </h3>

          <div className="space-y-3">
            <ExportToolItem
              title="User Data Export"
              description="Export all user data"
            />
            <ExportToolItem
              title="Messages Export"
              description="Export conversation history"
            />
            <ExportToolItem
              title="Files Export"
              description="Download all uploaded files"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RetentionPoliciesCard;
