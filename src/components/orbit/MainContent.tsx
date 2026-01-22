import { useState, useRef } from "react";
import ReusableCrudTable, {
  type CrudColumn,
} from "../HOC/ReusableDataTable/ReusableDataTable";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";
import {
  Mail,
  Phone,
  MoreHorizontal,
  Eye,
  Pencil,
  CheckCircle,
  IndianRupee,
  TrendingUp,
  Trash2,
  Filter,
  Search,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: "Qualified" | "New" | "Proposal" | "Converted" | "Contacted";
  status: "Active" | "Follow-up";
  source: string;
  value: string;
  date: string;
  initials: string;
  avatarBg: string;
}

const sampleLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    stage: "Qualified",
    status: "Active",
    source: "Website",
    value: "₹25,000",
    date: "1/15/2024",
    initials: "SJ",
    avatarBg: "#F3F4F6",
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Global Solutions",
    email: "m.chen@globalsolutions.com",
    phone: "+1 (555) 234-5678",
    stage: "New",
    status: "Active",
    source: "LinkedIn",
    value: "₹45,000",
    date: "1/18/2024",
    initials: "MC",
    avatarBg: "#F3F4F6",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "StartupXYZ",
    email: "emily.r@startupxyz.com",
    phone: "+1 (555) 345-6789",
    stage: "Proposal",
    status: "Follow-up",
    source: "Referral",
    value: "₹18,500",
    date: "1/12/2024",
    initials: "ER",
    avatarBg: "#F3F4F6",
  },
  {
    id: "4",
    name: "David Wilson",
    company: "Enterprise Corp",
    email: "d.wilson@enterprise.com",
    phone: "+1 (555) 456-7890",
    stage: "Converted",
    status: "Active",
    source: "Cold Call",
    value: "₹75,000",
    date: "1/10/2024",
    initials: "DW",
    avatarBg: "#F3F4F6",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    company: "Consulting Firm LLC",
    email: "lisa.t@consultingfirm.com",
    phone: "+1 (555) 567-8901",
    stage: "Contacted",
    status: "Active",
    source: "Trade Show",
    value: "₹32,000",
    date: "1/20/2024",
    initials: "LT",
    avatarBg: "#F3F4F6",
  },
];

const MainContent = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  // const [page, setPage] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const menuLeft = useRef<Menu>(null);

  const stageOptions = [
    { label: "All Stages", value: null },
    { label: "New", value: "New" },
    { label: "Contacted", value: "Contacted" },
    { label: "Qualified", value: "Qualified" },
    { label: "Proposal", value: "Proposal" },
    { label: "Converted", value: "Converted" },
    { label: "Lost", value: "Lost" },
  ];

  const sourceOptions = [
    { label: "All Sources", value: null },
    { label: "Website", value: "Website" },
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "Referral", value: "Referral" },
    { label: "Cold Call", value: "Cold Call" },
    { label: "Trade Show", value: "Trade Show" },
  ];

  const getStageColor = (stage: Lead["stage"]) => {
    switch (stage) {
      case "Qualified":
        return { bg: "#F3E8FF", text: "#9333EA" };
      case "New":
        return { bg: "#EFF6FF", text: "#3B82F6" };
      case "Proposal":
        return { bg: "#FFEDD5", text: "#F97316" };
      case "Converted":
        return { bg: "#DCFCE7", text: "#22C55E" };
      case "Contacted":
        return { bg: "#FEF3C7", text: "#D97706" };
      default:
        return { bg: "#F3F4F6", text: "#6B7280" };
    }
  };

  const getStatusColor = (status: Lead["status"]) => {
    switch (status) {
      case "Active":
        return { bg: "#DCFCE7", text: "#22C55E" };
      case "Follow-up":
        return { bg: "#EFF6FF", text: "#3B82F6" };
      default:
        return { bg: "#F3F4F6", text: "#6B7280" };
    }
  };

  const nameBodyTemplate = (rowData: Lead) => {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 border border-gray-100"
          style={{ backgroundColor: rowData.avatarBg }}
        >
          {rowData.initials}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{rowData.name}</div>
          <div className="text-xs text-gray-500">{rowData.company}</div>
        </div>
      </div>
    );
  };

  const emailBodyTemplate = (rowData: Lead) => (
    <div className="flex items-center gap-2 text-gray-600">
      <Mail size={16} className="text-gray-400" />
      <span className="text-sm">{rowData.email}</span>
    </div>
  );

  const phoneBodyTemplate = (rowData: Lead) => (
    <div className="flex items-center gap-2 text-gray-600">
      <Phone size={16} className="text-gray-400" />
      <span className="text-sm">{rowData.phone}</span>
    </div>
  );

  const stageBodyTemplate = (rowData: Lead) => {
    const { bg, text } = getStageColor(rowData.stage);
    return (
      <span
        className="px-2.5 py-0.5 rounded-md text-xs font-medium"
        style={{ backgroundColor: bg, color: text }}
      >
        {rowData.stage}
      </span>
    );
  };

  const statusBodyTemplate = (rowData: Lead) => {
    const { bg, text } = getStatusColor(rowData.status);
    return (
      <span
        className="px-2.5 py-0.5 rounded-md text-xs font-medium border"
        style={{ backgroundColor: bg, color: text, borderColor: text + "20" }}
      >
        {rowData.status}
      </span>
    );
  };

  const actionMenuItems = [
    {
      label: "View Details",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <Eye size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Viewing details for:", activeLead),
    },
    {
      label: "Edit Lead",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <Pencil size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Editing lead:", activeLead),
    },
    { separator: true },
    {
      label: "Mark as Contacted",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <Phone size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Marking as contacted:", activeLead),
    },
    {
      label: "Mark as Qualified",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <CheckCircle size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Marking as qualified:", activeLead),
    },
    {
      label: "Send Proposal",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <IndianRupee size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Sending proposal to:", activeLead),
    },
    {
      label: "Mark as Converted",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <TrendingUp size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Marking as converted:", activeLead),
    },
    { separator: true },
    {
      label: "Call Lead",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <Phone size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Calling lead:", activeLead),
    },
    {
      label: "Send Email",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-50`}
        >
          <Mail size={16} className="text-gray-400" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Sending email to:", activeLead),
    },
    { separator: true },
    {
      label: "Delete Lead",
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className={`${options.className} flex items-center gap-3 px-4 py-2 w-full text-sm text-red-600 hover:bg-red-50`}
        >
          <Trash2 size={16} className="text-red-500" />
          <span>{item.label}</span>
        </button>
      ),
      command: () => console.log("Deleting lead:", activeLead),
    },
  ];

  const actionsBodyTemplate = (rowData: Lead) => (
    <div className="flex justify-center">
      <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
        onClick={(event) => {
          setActiveLead(rowData);
          menuLeft.current?.toggle(event);
        }}
        aria-controls="popup_menu_left"
        aria-haspopup
      >
        <MoreHorizontal size={20} />
      </button>
    </div>
  );

  const columns: CrudColumn<Lead>[] = [
    { selectionMode: "multiple", style: { width: "3.5rem" } },
    { header: "Lead Name", body: nameBodyTemplate, style: { minWidth: "200px" } },
    { header: "Email", body: emailBodyTemplate, style: { minWidth: "250px" } },
    { header: "Phone", body: phoneBodyTemplate, style: { minWidth: "180px" } },
    { header: "Stage", body: stageBodyTemplate, style: { minWidth: "120px" } },
    { header: "Status", body: statusBodyTemplate, style: { minWidth: "120px" } },
    { header: "Source", field: "source", style: { minWidth: "120px" } },
    { header: "Value", field: "value", style: { minWidth: "120px" } },
    { header: "Date", field: "date", style: { minWidth: "120px" } },
    {
      header: "Actions",
      body: actionsBodyTemplate,
      style: { minWidth: "80px", textAlign: "center" },
    },
  ];

  const filterHeader = (
    <div
      className="flex flex-col gap-4 px-2 mb-4
                  sm:flex-col 
                  md:flex-col 
                  lg:flex-row lg:items-center lg:gap-4 lg:flex-wrap"
    >
      <div className="relative w-full lg:flex-1 lg:max-w-2lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search leads..."
          className="w-full !pl-12 pr-4 !h-9 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-green-500"
        />
      </div>
      <Dropdown
        value={selectedStage}
        options={stageOptions}
        onChange={(e) => setSelectedStage(e.value)}
        placeholder="All Stages"
        className="text-sm bg-gray-50 border-none rounded-lg min-w-[140px] h-9 flex items-center"
      />
      <Dropdown
        value={selectedSource}
        options={sourceOptions}
        onChange={(e) => setSelectedSource(e.value)}
        placeholder="All Sources"
        className="text-sm bg-gray-50 border-none rounded-lg min-w-[140px] h-9 flex items-center"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
          <span className="flex items-center gap-2 text-gray-600 font-medium">
            <Filter className="text-gray-600" size={16} /> Filters
          </span>
        </div>
        {filterHeader}
      </div>

      <div className="overflow-x-auto">
        <ReusableCrudTable<Lead>
          data={sampleLeads}
          columns={columns}
          dataKey="id"
          totalRecords={sampleLeads.length}
          selection={selectedLeads}
          onSelectionChange={setSelectedLeads}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          page={first / rows}
          rows={rows}
          onPageChange={(e: any) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
          loading={false}
          title={`Leads (${sampleLeads.length})`}
          toolbar={false}
          showSearch={false}
          isCard={true}
        />
      </div>
      <Menu
        model={actionMenuItems}
        popup
        ref={menuLeft}
        id="popup_menu_left"
        style={{ width: "200px", borderRadius: "12px", padding: "4px" }}
      />
    </div>
  );
};

export default MainContent;
