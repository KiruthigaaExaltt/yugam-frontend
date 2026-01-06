import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { FiClock } from "react-icons/fi";
import type { CardItem } from "../../HOC/singlelineCard/SingleLineCard";
import SingleLineCard from "../../HOC/singlelineCard/SingleLineCard";

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

  const retentionItems: CardItem[] = [
    {
      label: "Messages",
      value: (
        <Dropdown
          value={messageRetention}
          options={retentionOptions}
          onChange={(e) => setMessageRetention(e.value)}
          className="w-32"
          pt={{
            root: { style: { borderRadius: '8px' } },
            item: ({ context }: any) => ({
              className: context.selected ? 'bg-primary-500 text-white' : '',
              style: context.selected ? { backgroundColor: 'var(--primary-color)' } : {}
            })
          }}
        />
      ),
    },
    {
      label: "Files",
      value: (
        <Dropdown
          value={fileRetention}
          options={retentionOptions}
          onChange={(e) => setFileRetention(e.value)}
          className="w-32"
          pt={{
            root: { style: { borderRadius: '8px' } },
            item: ({ context }: any) => ({
              className: context.selected ? 'bg-primary-500 text-white' : '',
              style: context.selected ? { backgroundColor: 'var(--primary-color)' } : {}
            })
          }}
        />
      ),
    },
    {
      label: "Audit Logs",
      value: (
        <Dropdown
          value={auditRetention}
          options={retentionOptions}
          onChange={(e) => setAuditRetention(e.value)}
          className="w-32"
          pt={{
            root: { style: { borderRadius: '8px' } },
            item: ({ context }: any) => ({
              className: context.selected ? 'bg-primary-500 text-white' : '',
              style: context.selected ? { backgroundColor: 'var(--primary-color)' } : {}
            })
          }}
        />
      ),
    },
    {
      label: "Analytics Data",
      value: (
        <Dropdown
          value={analyticsRetention}
          options={[
            ...retentionOptions,
            { label: "Not retained", value: null },
          ]}
          onChange={(e) => setAnalyticsRetention(e.value)}
          className="w-32"
          placeholder="Select"
          pt={{
            root: { style: { borderRadius: '8px' } },
            item: ({ context }: any) => ({
              className: context.selected ? 'bg-primary-500 text-white' : '',
              style: context.selected ? { backgroundColor: 'var(--primary-color)' } : {}
            })
          }}
        />
      ),
    },
  ];

  return (
    <SingleLineCard
      title="Retention Policies"
      icon={<FiClock />}
      items={retentionItems}
    />
  );
};

export default RetentionPoliciesCard;
