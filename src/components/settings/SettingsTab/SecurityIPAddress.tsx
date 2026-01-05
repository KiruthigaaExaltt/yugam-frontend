import React from "react";
import { FiWifi } from "react-icons/fi";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import MiniProfileNotificationCard from "../../HOC/miniProfileNotificationCard/MiniProfileNotificationCard";

const SecurityIPAddress: React.FC = () => {
  const ipRanges = [
    "192.168.1.0/24",
    "10.0.0.0/8",
  ];

  return (
    <Card
      className="shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--surface-border)",
        borderRadius: "var(--border-radius)",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-(--text-muted)">
          Restrict access to specific IP addresses or ranges
        </p>

        <Button
          icon="pi pi-plus"
          label="Add IP Range"
          className="p-button-outlined p-button-sm"
        />
      </div>

      {/* IP LIST */}
      <div className="space-y-3">
        {ipRanges.map((ip) => (
          <MiniProfileNotificationCard
            key={ip}
            name={ip}
            role="Allowed IP range"
            logo={<FiWifi size={18} color="var(--primary-color)" />}
            avatar
            showEye={false}
            showDelete
            onDelete={() => console.log("Delete", ip)}
            avatarWidth="2.5rem"
            avatarHeight="2.5rem"
          />
        ))}
      </div>
    </Card>
  );
};

export default SecurityIPAddress;
