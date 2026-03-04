import { useState } from "react";
import SmallCard from "../../../HOC/SmallCard/SmallCard";
import { UserPlus, Phone, Target, FileText, Search, Plus } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import EmployeeForm from "./EmployeeForm";

const EmployeeHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onAdd = () => {
    setShowForm(true);
  };

  return (
    <div className="px-1">
      {/* Header Section: Title + Search + Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-2xl text-[var(--text-color)]">Employee Directory</h1>
        </div>

        <div className="flex items-center gap-3">
          <IconField iconPosition="left">
            <InputIcon className="flex items-center">
              <Search className="text-gray-400" size={18} />
            </InputIcon>
            <InputText
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search employees..."
              className="h-10 w-64 md:w-80 border-gray-200 rounded-lg text-sm bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </IconField>
          <Button
            onClick={onAdd}
            className="h-10 px-4 bg-[#0D9488] hover:bg-[#0F766E] border-none flex items-center gap-2 rounded-lg text-white font-medium transition-all"
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </Button>
        </div>
      </div>

      <EmployeeForm
        visible={showForm}
        onHide={() => setShowForm(false)}
      />

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <SmallCard
          icon={<UserPlus size={20} />}
          title="Active Employees"
          value="2"
          subText=""
          iconBg="#ECFDF5"
          valueColor="#059669"
        />

        <SmallCard
          icon={<Target size={20} />}
          title="On Leave"
          value="1"
          subText=""
          iconBg="#FEF3C7"
          valueColor="#D97706"
        />

        <SmallCard
          icon={<FileText size={20} />}
          title="Avg Performance"
          value="4.5/5.0"
          subText=""
          iconBg="#EFF6FF"
          valueColor="#2563EB"
        />

        <SmallCard
          icon={<Phone size={20} />}
          title="Departments"
          value="3"
          subText=""
          iconBg="#F5F3FF"
          valueColor="#7C3AED"
        />
      </div>
    </div>
  );
};

export default EmployeeHeader;