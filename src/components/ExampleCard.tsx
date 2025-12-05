import { MdCheckCircle, MdGroups, MdShoppingCart } from "react-icons/md";
import MidCard from "./HOC/midCard/MidCard";


const ExampleCard = () => {
    return (
        <div className="card-wrapper">
            <MidCard
                 icon={<MdShoppingCart />}
                title="Smart Purchase Orders"
                badge="Enhanced"
                description="Create comprehensive purchase orders with item management, supplier selection, and automatic calculations"
            />

            <MidCard
                icon={<MdGroups />}
                title="Supplier Management"
                badge="New"
                description="Manage supplier relationships with performance tracking, ratings, and detailed profiles"
            />

            <MidCard
                icon={<MdCheckCircle />}
                title="Approval Workflows"
                badge="New"
                description="Automated approval processes for purchase requisitions with multi-level authorization"
            />
        </div>
    );
};

export default ExampleCard;
