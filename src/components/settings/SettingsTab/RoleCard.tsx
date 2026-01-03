import { MdCheckCircle, MdGroups, MdShoppingCart } from "react-icons/md";
import MidCard from "../../HOC/midCard/MidCard";
import { Button } from "primereact/button";

const ExampleRolesCard = () => {
  return (
    <div
    //   className="rounded-(--border-radius) border p-5 space-y-4"
      className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg p-5 space-y-4"

      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--surface-border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ROLE CARD – footer + Edit */}
        <MidCard
          icon={<MdShoppingCart size={18} />}
          title="Administrator"
          badge="System"
          description="Full system access with all permissions"
          footer="2 users"
          actionLabel="Edit"
          onActionClick={() => console.log("Edit Administrator")}
        />

        {/* ROLE CARD – footer + Edit */}
        <MidCard
          icon={<MdGroups size={18} />}
          title="Manager"
          badge="System"
          description="Department-level management with most permissions"
          footer="5 users"
          actionLabel="Edit"
          onActionClick={() => console.log("Edit Manager")}
        />

        {/* CTA CARD – Try Demo button */}
        <MidCard
          icon={<MdCheckCircle size={18} />}
          title="Staff"
          badge="System"
          description="Standard team member access"
          footer="8 users"
          actionLabel="Edit"
          onActionClick={() => console.log("Edit Manager")}
        />

        {/* CTA CARD – Try Demo button */}
        <MidCard
          icon={<MdCheckCircle size={18} />}
          title="Client"
          badge="System"
          description="Limited client access to specific workspaces"
          footer="12 users"
          actionLabel="Edit"
          onActionClick={() => console.log("Edit Manager")}
        />
      </div>

      {/* Footer Button */}
      <div>
        <Button
          label=" + Create Custom Role"
          icon="pi pi-plus"
          className="p-button-text"
          style={{
            borderRadius: "999px",
            fontWeight: 500,
          }}
        />
      </div>
    </div>
  );
};

export default ExampleRolesCard;
