import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { FiSearch , FiX } from "react-icons/fi";
 
type Option = {
  label: string;
  value: string;
};
 
interface FilterBarProps {
  searchPlaceholder?: string;
  stageOptions?: Option[];
  sourceOptions?: Option[];
  onSearch?: (value: string) => void;
  onStageChange?: (value: string) => void;
  onSourceChange?: (value: string) => void;
}
 
export default function FilterBar({
  // placeholder = "Search...",
  stageOptions = [],
  sourceOptions = [],
  onSearch,
  onStageChange,
  onSourceChange,
}: FilterBarProps) {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
 
  return (
    <div >
      {/* Header */}
      
 
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 var-(--card-radius)  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Search */}
      <div className="md:col-span-8">
  <div className="relative w-full">
    {/* Search Icon */}
    <FiSearch
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      size={14}
    />

    {/* Clear Icon */}
    {search && (
      <FiX
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
        size={14}
        onClick={() => {
          setSearch("");
          onSearch?.("");
        }}
      />
    )}

    <InputText
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        onSearch?.(e.target.value);
      }}
      placeholder="Search clients..."
      style={{ paddingLeft: "3rem", paddingRight: "2.5rem" }}
      className="w-full h-11 rounded-full bg-gray-50 border border-gray-200
                 focus:bg-white focus:border-blue-400"
    />
  </div>
</div>


 
    {/* Stage */}
        <div className="md:col-span-2">
  <Dropdown
    value={stage}
    options={stageOptions}
    showClear
    onChange={(e) => {
      setStage(e.value ?? null);
      onStageChange?.(e.value ?? null);
    }}
    placeholder="All Stages"
    className="w-full"
  />
</div>

{/* Priority */}
<div className="md:col-span-2">
  <Dropdown
    value={source}
    options={sourceOptions}
    showClear
    onChange={(e) => {
      setSource(e.value ?? null);
      onSourceChange?.(e.value ?? null);
    }}
    placeholder="All Priority"
    className="w-full"
  />
</div>
      </div>
    </div>
  );
}