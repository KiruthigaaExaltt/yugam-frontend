import DataPrivacySettings from "./DataPrivacySettings";
import RetentionPoliciesCard from "./RetentionPoliciesCard";
import AuditLogsTable from "./AuditLogsTable";

const DataAndAuditPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <RetentionPoliciesCard />
      <AuditLogsTable />
      <DataPrivacySettings />
      
    </div>
  );
};

export default DataAndAuditPage;
