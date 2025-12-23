import QuickActions from "../HOC/quickActions/QuickAction";
import {
  FaBullseye,
  FaComments,
  FaUserPlus,
  FaBriefcase,
  FaBox,
  FaChartBar,
  FaPlus,
  FaFileAlt,
  FaChartLine,
  FaBolt,
} from "react-icons/fa";

const gridActions = [
  { id: "lead", label: "New Lead", icon: <FaBullseye /> },
  { id: "ticket", label: "Create Ticket", icon: <FaComments /> },
  { id: "employee", label: "Add Employee", icon: <FaUserPlus /> },
  { id: "project", label: "New Project", icon: <FaBriefcase /> },
  { id: "inventory", label: "Check Inventory", icon: <FaBox /> },
  { id: "report", label: "Generate Report", icon: <FaChartBar /> },
];

const rowActions = [
  { id: "po", label: "Create PO", icon: <FaPlus /> },
  { id: "quote", label: "New Quote", icon: <FaFileAlt /> },
  { id: "analytics", label: "View Analytics", icon: <FaChartLine /> },
  { id: "workflow", label: "Setup Workflow", icon: <FaBolt /> },
];

const ticketStats = [
  {
    id: "tech",
    label: "Technical Issues",
    value: "35%",
    subLabel: "Avg: 4.2h resolution",
    tone: "blue",
     type: "stat",
  },
  {
    id: "billing",
    label: "Billing",
    value: "28%",
    subLabel: "Avg: 1.8h resolution",
    tone: "green",
     type: "stat",
  },
  {
    id: "account",
    label: "Account Issues",
    value: "22%",
    subLabel: "Avg: 2.5h resolution",
    tone: "orange",
     type: "stat",
  },
    {
    id: "account",
    label: "Account Issues",
    value: "22%",
    subLabel: "Avg: 2.5h resolution",
    tone: "purple",
    type: "stat",
  },

] as const;


const ExampleQuickAction = () => {
  return (
    <>
      <QuickActions title="Quick Actions" actions={gridActions} layout="grid" />
      <QuickActions title="Quick Actions" actions={rowActions} layout="row" />
      <QuickActions title="Ticket Category Analysis" actions={ticketStats} />
    </>
  );
};

export default ExampleQuickAction;
