import { FiPlus } from "react-icons/fi";
import PageHeader from "../HOC/pageHeader/PageHeader";


const Header = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [editingUser ] = useState(null);
  return (
    <>
      <PageHeader
        title="Lead Management"
        subtitle="Track and manage your sales leads

"
        actions={[
         
          {
            label: "Create New Lead",
            icon: <FiPlus size={16} />,
            variant: "primary",
            onClick: () => console.log(true),
          },
        ]}
      />
    </>
  );
};
export default Header;
