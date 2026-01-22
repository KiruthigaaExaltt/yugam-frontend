import { useState } from "react";
import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiUpload, FiCheckCircle, FiCopy, FiTrash2 } from "react-icons/fi";
import MeetingCard from "../HOC/meetingCard/MeetingCard";
import ReusableCrudTable, {
  type CrudColumn,
} from "../HOC/ReusableDataTable/ReusableDataTable";

interface VendorComparisonData {
  id: string;
  vendor: string;
  itemCode: string;
  description: string;
  unitPrice: string;
  leadTime: string;
  moq: string;
  validity: string;
}

const RFQImport = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);

  const bestPriceData = [
    {
      title: "ST-001",
      description: "Metal Industries",
      tone: "green" as const,
      time: "20 DAYS",
      rightContent: (
        <div className="text-right">
          <div className="font-bold text-xl text-emerald-600">₹62,000</div>
          <div className="text-xs text-gray-400">20 days</div>
        </div>
      ),
    },
  ];

  const vendorPerformanceData = [
    {
      title: "Steel Works Ltd",
      description: "1 quotes",
      rightContent: (
        <div className="text-right">
          <div className="font-bold text-sm">Avg: ₹65,000</div>
          <div className="text-[10px] text-gray-400">15 days</div>
        </div>
      ),
    },
    {
      title: "Metal Industries",
      description: "1 quotes",
      rightContent: (
        <div className="text-right">
          <div className="font-bold text-sm">Avg: ₹62,000</div>
          <div className="text-[10px] text-gray-400">20 days</div>
        </div>
      ),
    },
  ];

  const comparisonData: VendorComparisonData[] = [
    {
      id: "1",
      vendor: "Steel Works Ltd",
      itemCode: "ST-001",
      description: "Structural Steel Grade 50",
      unitPrice: "₹65,000",
      leadTime: "15 days",
      moq: "10",
      validity: "2024-02-15",
    },
    {
      id: "2",
      vendor: "Metal Industries",
      itemCode: "ST-001",
      description: "Structural Steel Grade 50",
      unitPrice: "₹62,000",
      leadTime: "20 days",
      moq: "5",
      validity: "2024-02-10",
    },
  ];

  const actionsBodyTemplate = (rowData: VendorComparisonData) => {
    return (
      <div className="flex gap-2">
        <button
          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-500"
          onClick={() => console.log("Approve", rowData)}
        >
          <FiCheckCircle size={18} />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400"
          onClick={() => console.log("Copy", rowData)}
        >
          <FiCopy size={18} />
        </button>
        <button
          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400"
          onClick={() => console.log("Delete", rowData)}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    );
  };

  const columns: CrudColumn<VendorComparisonData>[] = [
    { field: "vendor", header: "Vendor", style: { minWidth: "150px" } },
    { field: "itemCode", header: "Item Code", style: { minWidth: "100px" } },
    {
      field: "description",
      header: "Description",
      style: { minWidth: "200px" },
    },
    { field: "unitPrice", header: "Unit Price", style: { minWidth: "120px" } },
    { field: "leadTime", header: "Lead Time", style: { minWidth: "100px" } },
    { field: "moq", header: "MOQ", style: { minWidth: "80px" } },
    { field: "validity", header: "Validity", style: { minWidth: "120px" } },
    {
      header: "Actions",
      body: actionsBodyTemplate,
      style: { minWidth: "130px" },
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="RFQ Import & Comparison"
        subtitle="Import vendor quotes and compare prices side-by-side"
        actions={[
          {
            label: "Import CSV",
            icon: <FiUpload size={16} />,
            variant: "secondary",
          },
          {
            label: "Import Excel",
            icon: <FiUpload size={16} />,
            variant: "primary",
          },
          {
            label: " + Add RFQ",
            variant: "primary",
            onClick: () => console.log("Add RFQ"),
          },
        ]}
      />

      <div className="px-6 pb-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MeetingCard title="Best Price Analysis" meetings={bestPriceData} />
          <MeetingCard
            title="Vendor Performance"
            meetings={vendorPerformanceData}
          />
        </div>

        <ReusableCrudTable<VendorComparisonData>
          data={comparisonData}
          columns={columns}
          dataKey="id"
          totalRecords={comparisonData.length}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          page={page}
          rows={rows}
          onPageChange={(e) => {
            setPage(e.page);
            setRows(e.rows);
          }}
          loading={false}
          title="Vendor Comparison"
          showSearch={true}
          showGridlines={false}
          isCard={true}
        />
      </div>
    </div>
  );
};

export default RFQImport;
