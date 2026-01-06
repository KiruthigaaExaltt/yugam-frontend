import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import type { CardItem } from "../../HOC/singlelineCard/SingleLineCard";
import SingleLineCard from "../../HOC/singlelineCard/SingleLineCard";

const SecuritySection: React.FC = () => {
  const [minLength, setMinLength] = useState(8);
  const [expiryDays, setExpiryDays] = useState(90);
  const [sessionTimeout, setSessionTimeout] = useState(60);
  const [requireSpecial, setRequireSpecial] = useState(false);
  const [force2FA, setForce2FA] = useState(true);
  const [ipAllowlist, setIpAllowlist] = useState(false);

  const passwordPolicyItems: CardItem[] = [
    {
      label: "Minimum Length",
      value: (
       <Dropdown
          value={minLength}
          options={[6, 8, 10, 12]}
          onChange={(e) => setMinLength(e.value)}
          className="w-20 p-inputtext-sm"
          style={{ borderRadius: "var(--card-radius)", borderColor: "var(--surface-border)" }}
        />
      ),
    },
    {
      label: "Require Special Characters",
      value: (
        <InputSwitch
          checked={requireSpecial}
          onChange={(e) => setRequireSpecial(e.value)}
          pt={{
            slider: {
              style: {
                backgroundColor: requireSpecial ? "var(--primary-color)" : "",
                border: requireSpecial ? "1px solid var(--primary-color)" : "",
              },
            },
          }}
        />
      ),
    },
    {
      label: "Password Expiry (days)",
      value: (
         <Dropdown
          value={expiryDays}
          options={[30, 60, 90, 180]}
          onChange={(e) => setExpiryDays(e.value)}
          className="w-20 p-inputtext-sm"
          style={{ borderRadius: "var(--card-radius)", borderColor: "var(--surface-border)" }}
        />
      ),
    },
  ];

  const sessionManagementItems: CardItem[] = [
    {
      label: "Session Timeout (minutes)",
      value: (
        <Dropdown
          value={sessionTimeout}
          options={[15, 30, 60, 120]}
          onChange={(e) => setSessionTimeout(e.value)}
          className="w-20 p-inputtext-sm"
          style={{ borderRadius: "var(--card-radius)", borderColor: "var(--surface-border)" }}
        />
      ),
    },
    {
      label: "Force 2FA",
      value: (
        <InputSwitch
          checked={force2FA}
          onChange={(e) => setForce2FA(e.value)}
          pt={{
            slider: {
              style: {
                backgroundColor: force2FA ? "var(--primary-color)" : "",
                border: force2FA ? "1px solid var(--primary-color)" : "",
              },
            },
          }}
        />
      ),
    },
    {
      label: "IP Allowlist",
      value: (
        <InputSwitch
          checked={ipAllowlist}
          onChange={(e) => setIpAllowlist(e.value)}
          pt={{
            slider: {
              style: {
                backgroundColor: ipAllowlist ? "var(--primary-color)" : "",
                border: ipAllowlist ? "1px solid var(--primary-color)" : "",
              },
            },
          }}
        />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SingleLineCard
        title="Password Policy"
        items={passwordPolicyItems}
      />

      <SingleLineCard
        title="Session Management"
        items={sessionManagementItems}
      />
    </div>
  );
};

export default SecuritySection;
