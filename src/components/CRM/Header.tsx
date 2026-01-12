import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiDownload, FiPlus} from "react-icons/fi";
import { useState } from "react";
import Dialogform from "../HOC/dialog/Dialogform";
import ClientForm from "./Clientform";
 const Header=()=>{
  const [showModal, setShowModal] = useState(false);
  // const [editingUser ] = useState(null); 
  return (
    <>
    <PageHeader
    
          title="Client Management"
          subtitle="Manage your client relationships and projects

"
       
     actions={[
        {
          label: "Export",
          icon: <FiDownload size={16} />,
          variant: "secondary",
          // onClick: () => console.log("Preview clicked"),
        },
        {
          label: "Add Client",
          icon: <FiPlus size={16} />,
          variant: "primary",
            onClick: () => setShowModal(true),
          
        },
      ]}
  />
 
   <Dialogform
  visible={showModal}
  header="Add New Client"
  subtitle="Fill in the client information below to add them to your CRM."
  onHide={() => setShowModal(false)}
   width="560px" 
   contentClassName="p-0 scrollbar-hide"
>
  <ClientForm
    // initialValues={editingUser}
    onSubmit={(values) => {
     window.dispatchEvent(
              new CustomEvent("client-added", { detail: values })
            );
            setShowModal(false);
          }}
          onCancel={() => setShowModal(false)}
        />
</Dialogform>
 </>
 );
};
export default Header;