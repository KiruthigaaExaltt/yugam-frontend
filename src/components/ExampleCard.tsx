import MidCard from "./midCard/MidCard";

const ExampleCard = () => {
    return (
        <div className="cards-grid">
            <MidCard
                icon={<i className="pi pi-shopping-cart"></i>}
                title="Smart Purchase Orders"
                badge="Enhanced"
                description="Create comprehensive purchase orders with item management, supplier selection, and automatic calculations"
            />

            <MidCard
                icon={<i className="pi pi-users"></i>}
                title="Supplier Management"
                badge="New"
                description="Manage supplier relationships with performance tracking, ratings, and detailed profiles"
            />

            <MidCard
                icon={<i className="pi pi-check-circle"></i>}
                title="Approval Workflows"
                badge="New"
                description="Automated approval processes for purchase requisitions with multi-level authorization"
            />
        </div>
    );
};

export default ExampleCard;
