import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

type Option = {
  label: string;
  value: string;
};

export interface FilterDropdown {
  value: string | null;
  options: Option[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  className?: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  // Deprecated/Legacy props
  stageOptions?: Option[];
  sourceOptions?: Option[];
  onSearch?: (value: string) => void;
  onStageChange?: (value: string) => void;
  onSourceChange?: (value: string) => void;

  // New prop for dynamic filters
  filters?: FilterDropdown[];
}

export default function FilterBar({
  stageOptions = [],
  sourceOptions = [],
  onSearch,
  onStageChange,
  onSourceChange,
  filters,
}: FilterBarProps) {
  const [search, setSearch] = useState("");
  // Local state for legacy props is managed by parent usually if controlled, 
  // but here FilterBar seems to support both controlled (via props) and uncontrolled (via local state)?
  // Actually, the original code had local state AND called the prop.
  const [stage, setStage] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  return (
    <div >
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
              placeholder="Search templates..."
              style={{ paddingLeft: "3rem", paddingRight: "2.5rem" }}
              className="w-full h-11 rounded-full bg-gray-50 border border-gray-200
                        focus:bg-white focus:border-blue-400"
            />
          </div>
        </div>

        {/* Dynamic Filters */}
        {filters && filters.length > 0 ? (
          filters.map((filter, index) => {
            // Calculate column span based on number of filters (max 4 columns available)
            let colSpanClass = "md:col-span-4";
            if (filters.length === 2) colSpanClass = "md:col-span-2";
            else if (filters.length === 3) colSpanClass = "md:col-span-1";
            else if (filters.length >= 4) colSpanClass = "md:col-span-1";

            return (
              <div key={index} className={colSpanClass}>
                <Dropdown
                  value={filter.value}
                  options={filter.options}
                  showClear
                  onChange={(e) => filter.onChange(e.value ?? null)}
                  placeholder={filter.placeholder}
                  className={`w-full ${filter.className || ''}`}
                />
              </div>
            );
          })
        ) : (
          /* Legacy Filters Fallback */
          <>
            {stageOptions.length > 0 && (
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
            )}

            {sourceOptions.length > 0 && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}