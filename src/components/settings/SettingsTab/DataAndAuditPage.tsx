import DataPrivacySettings from "./DataPrivacySettings";
import RetentionPoliciesCard from "./RetentionPoliciesCard";


const DataAndAuditPage: React.FC = () => {
  return (
    <div className="space-y-6">
    <RetentionPoliciesCard />
    <DataPrivacySettings />
    </div>
  );
};

export default DataAndAuditPage;
