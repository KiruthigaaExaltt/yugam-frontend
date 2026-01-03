import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
 
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
  searchPlaceholder = "Search...",
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-(--border-radius)  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Search */}
        <div className="md:col-span-8">
          <span className="p-input-icon-left w-full">
            <i className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder={searchPlaceholder}
              className="w-full"
            />
          </span>
        </div>
 
        {/* Stage */}
        <div className="md:col-span-2">
          <Dropdown
            value={stage}
            options={stageOptions}
            onChange={(e) => {
              setStage(e.value);
              onStageChange?.(e.value);
            }}
            placeholder="All Stages"
            className="w-full"
          />
        </div>
 
        {/* Source */}
        <div className="md:col-span-2">
          <Dropdown
            value={source}
            options={sourceOptions}
            onChange={(e) => {
              setSource(e.value);
              onSourceChange?.(e.value);
            }}
            placeholder="All Sources"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}