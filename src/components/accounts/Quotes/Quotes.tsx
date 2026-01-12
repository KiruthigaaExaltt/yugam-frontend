import { FiPlus, FiEdit, FiEye, FiCheckCircle,  FiFilter, FiSend } from "react-icons/fi";
import ManagementLayout, { ManagementItemCard } from "../../HOC/management/ManagementLayout";
import Buttons, { type ButtonAction } from "../../HOC/buttons/Buttons";

interface NavButtonsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Quotes: React.FC<NavButtonsProps> = ({ activeTab, onTabClick }) => {
  const tabs: ButtonAction[] = [
    {
      label: "New Onboarding Quote",
      icon: <FiPlus size={16} />,
      variant: activeTab === "New Onboarding Quote" ? "primary" : "secondary",
      onClick: () => onTabClick("New Onboarding Quote"),
    },
    {
      label: "Create Revision Quote",
      icon: <FiEdit size={16} />,
      variant: activeTab === "Create Revision Quote" ? "primary" : "secondary",
      onClick: () => onTabClick("Create Revision Quote"),
    },
  ];

  const mockQuotes = [
    {
      id: "Q2024-001",
      title: "Digital Marketing Onboarding Package",
      customer: "TechStart Inc",
      status: "accepted",
      secondaryStatus: "Onboarding",
      createdDate: "Created: 1/15/2024",
      amount: "$8,250",
      validUntil: "Valid until 2/15/2024",
      items: "3 items"
    },
    {
      id: "Q2024-002",
      title: "Social Media Management Package",
      customer: "Design Studio Pro",
      status: "sent",
      secondaryStatus: "Onboarding",
      createdDate: "Created: 1/20/2024",
      amount: "$4,400",
      validUntil: "Valid until 2/20/2024",
      items: "2 items"
    },
    {
      id: "Q2024-003",
      title: "Service Upgrade - Video Marketing",
      customer: "TechStart Inc",
      status: "draft",
      secondaryStatus: "Revision",
      reason: "Client requested video marketing services",
      createdDate: "Created: 2/1/2024",
      amount: "$6,820",
      validUntil: "Valid until 3/1/2024",
      items: "2 items"
    }
  ];

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center">
        <Buttons actions={tabs} />
      </div>
      <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <ManagementLayout 
        title="Quote Management"
        isCard={true}
        headerActions={[
          { label: "Filter", icon: <FiFilter />, onClick: () => {} }
        ]}
        items={mockQuotes}
        itemConfig={{
          idKey: "id",
          titleKey: "id",
          statusKey: "status",
          secondaryStatusKey: "secondaryStatus",
          subtitleKey: "title",
          descriptionKey: "customer",
          reasonKey: "reason",
          metaKey: "createdDate",
          valueKey: "amount",
          valueLabelKey: "validUntil",
          actions: [
            { label: "View", icon: <FiEye />, onClick: () => {} },
            { 
              label: "Create Contract", 
              icon: <FiCheckCircle />, 
              onClick: () => {},
              className: "bg-emerald-500 !text-white !border-emerald-500",
              severity: "success"
            }
          ]
        }}
        renderItem={(item) => (
           <ManagementItemCard 
             item={{...item, itemCount: item.items}} 
             config={{
               idKey: "id",
               titleKey: "id",
               statusKey: "status",
               secondaryStatusKey: "secondaryStatus",
               subtitleKey: "title",
               descriptionKey: "customer",
               reasonKey: "reason",
               metaKey: "createdDate",
               valueKey: "amount",
               valueLabelKey: "validUntil",
               actions: item.status === 'accepted' ? [
                 { label: "View", icon: <FiEye />, onClick: () => {} },
                 { 
                   label: "Create Contract", 
                   icon: <FiCheckCircle />, 
                   onClick: () => {},
                 }
               ] : item.status === 'sent' ? [
                 { label: "View", icon: <FiEye />, onClick: () => {} },
               ] : [
                 { label: "View", icon: <FiEye />, onClick: () => {} },
                 { label: "Send", icon: <FiSend />, onClick: () => {} },
               ]
             }} 
           />
        )}
      />
      </div>
    </div>
  );
};

export default Quotes;
