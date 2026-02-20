// RHFFields.tsx
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { Search, Check, X, ShieldCheck } from "lucide-react";

// Common wrapper
const Row = ({ label, children, vertical = false }: any) => (
  <div className={vertical ? "flex flex-col gap-2" : "flex items-start gap-3"} style={{ fontFamily: "var(--font-primary)" }}>
    {label ? (
      <label className={vertical ? "text-sm font-medium text-gray-700" : "w-32 pt-2 font-medium"}>
        {label}
      </label>
    ) : (
      !vertical && <div className="w-32" />
    )}
    <div className={`flex-1 ${vertical ? "" : "space-y-1"}`}>{children}</div>
  </div>
);

// ===============================================================
// INPUT  (Controller Version)
// ===============================================================
export function RHFInput({ name, label, type = "text", vertical = false, ...props }: any) {
  const { control } = useFormContext();

  return (
    <Row label={label} vertical={vertical}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              type={type}
              {...props}
              className={`w-full border rounded-xl px-3 py-2 focus:ring-2 ${fieldState.error ? "border-red-500" : "border-gray-300"
                } ${props.className || ""}`}
            />

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}


// ===============================================================
// DROPDOWN (Controller Version)
// ===============================================================
export function RDropdown({ name, label, options = [], vertical = false, ...props }: any) {
  const { control } = useFormContext();

  return (
    <Row label={label} vertical={vertical}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <Dropdown
              id={field.name}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              options={options}
              optionLabel="label"
              optionValue="value"
              placeholder="Select"
              className={`w-full rounded-xl ${fieldState.error ? "p-invalid" : ""
                }`}
              style={{ borderRadius: '0.75rem' }}
              {...props}
            />

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}

// ===============================================================
// CALENDAR (Controller)
// ===============================================================
export function RCalendar({ name, label, ...props }: any) {
  const { control } = useFormContext();

  return (
    <Row label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState }) => (
          <>
            <Calendar
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              showIcon
              className={`w-full rounded-xl ${fieldState.error ? "border border-red-500" : ""
                }`}
              style={{ borderRadius: '0.75rem' }}
              {...props}
            />

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}

// ===============================================================
// RADIO GROUP (Controller Version)
// ===============================================================
export function RRadio({ name, label, options = [] }: any) {
  const { control } = useFormContext();

  return (
    <Row label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <div className="flex items-center gap-6">
              {options.map((opt: any) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={opt.value}
                    checked={field.value === opt.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}

// Custom Permission Selector with Search and Tags
export function RPermissionSelector({ name, label, options = [], vertical = false }: any) {
  const { control } = useFormContext();
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((opt: any) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Row label={label} vertical={vertical}>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field, fieldState }) => {
          const selectedValues = Array.isArray(field.value) ? field.value : [];

          const toggle = (val: string) => {
            const updated = selectedValues.includes(val)
              ? selectedValues.filter((v: string) => v !== val)
              : [...selectedValues, val];
            field.onChange(updated);
          };

          const remove = (val: string) => {
            field.onChange(selectedValues.filter((v: string) => v !== val));
          };

          return (
            <div className="space-y-4">
              {/* Search Box */}
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search and select permissions..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-sm outline-none transition-all placeholder:text-gray-400"
                  style={{ fontFamily: 'var(--font-primary)' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Options List */}
              <div className="max-h-56 overflow-y-auto border border-gray-100 rounded-xl bg-white p-1.5 flex flex-col gap-1 custom-scrollbar shadow-inner">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt: any) => {
                    const isSelected = selectedValues.includes(opt.value);
                    return (
                      <div
                        key={opt.value}
                        onClick={() => toggle(opt.value)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50 group'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-blue-600 border-blue-600 scale-110' : 'border-gray-200 group-hover:border-blue-400 bg-white'
                          }`}>
                          {isSelected && <Check size={12} className="text-white stroke-[3px]" />}
                        </div>
                        <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-900 uppercase text-[11px] tracking-wider'}`}>
                          {opt.label}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-10 text-center">
                    <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="text-gray-300" size={20} />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">No permissions found matching "{search}"</p>
                  </div>
                )}
              </div>

              {/* Selected Chips Below */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Selected: <span className="text-blue-600">{selectedValues.length}</span>
                  </span>
                  {selectedValues.length > 0 && (
                    <button
                      type="button"
                      onClick={() => field.onChange([])}
                      className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 animate-in fade-in duration-500 min-h-8">
                  {selectedValues.length > 0 ? (
                    selectedValues.map((val: string) => {
                      const label = options.find((o: any) => o.value === val)?.label || val;
                      return (
                        <div key={val} className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100/80 text-blue-700 border border-blue-100 rounded-lg text-xs font-bold transition-all hover:shadow-sm">
                          <ShieldCheck size={12} className="text-blue-500" />
                          <span className="uppercase tracking-tight">{label}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); remove(val); }}
                            className="ml-1 p-0.5 hover:bg-blue-200/50 rounded-md transition-colors text-blue-400 hover:text-blue-600"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full py-4 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center">
                      <p className="text-xs text-gray-300 font-medium italic">No permissions selected yet</p>
                    </div>
                  )}
                </div>
              </div>

              {fieldState.error && (
                <div className="flex items-center gap-1.5 text-red-500 px-1 pt-1">
                  <span className="w-1 h-1 rounded-full bg-red-500" />
                  <small className="text-xs font-semibold uppercase tracking-tight">
                    {String(fieldState.error.message)}
                  </small>
                </div>
              )}
            </div>
          );
        }}
      />
    </Row>
  );
}

// ===============================================================
// CHECKBOX (boolean) / SWITCH
// ===============================================================
export function RCheckbox({ name, label, vertical = false }: any) {
  const { control } = useFormContext();

  return (
    <Row label="" vertical={vertical}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field, fieldState }) => (
          <>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="w-4 h-4 rounded text-(--primary-color) focus:ring-(--primary-color)"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}

export function RSwitch({ name, label, vertical = false }: any) {
  const { control } = useFormContext();

  return (
    <Row label="" vertical={vertical}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field, fieldState }) => (
          <>
            <div className="flex items-center gap-3">
              <InputSwitch
                checked={field.value}
                onChange={(e) => field.onChange(e.value)}
                className={fieldState.error ? "p-invalid" : ""}
              />
              {label && <span className="text-sm text-gray-700 cursor-pointer" onClick={() => field.onChange(!field.value)}>{label}</span>}
            </div>

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}

// ===============================================================
// FILE UPLOAD — Controller Version
// ===============================================================
export function RFileUpload({ name, label, ...props }: any) {
  const { control } = useFormContext();
  const [fileName, setFileName] = useState("");

  return (
    <Row label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <label
              className="
                flex items-center gap-3 
                border border-gray-300 
                rounded-xl p-3 
                cursor-pointer 
                hover:border-blue-500 hover:bg-blue-50 
                transition
              "
            >
              <FiUpload className="text-xl text-blue-600" />

              <span className="text-gray-700">
                {fileName ? <b>{fileName}</b> : "Choose a file…"}
              </span>

              <input
                type="file"
                className="hidden"
                {...props}
                onChange={(e: any) => {
                  const file = e.target.files?.[0];
                  setFileName(file ? file.name : "");
                  field.onChange(file);
                }}
              />
            </label>

            {fieldState.error && (
              <small className="text-red-500 mt-1">
                {String(fieldState.error.message)}
              </small>
            )}
          </div>
        )}
      />
    </Row>
  );
}

// ===============================================================
// ⭐ NEW — QUILL EDITOR (PrimeReact)
// ===============================================================
export function RQuillEditor({ name, label }: any) {
  const { control } = useFormContext();

  return (
    <Row label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <Editor
              value={field.value}
              onTextChange={(e) => field.onChange(e.htmlValue)}
              style={{ height: "180px", borderRadius: '0.75rem' }}
              className={`border ${fieldState.error ? "border-red-500" : "border-gray-300"
                } rounded-xl`}
            />

            {fieldState.error && (
              <small className="text-red-500">
                {String(fieldState.error.message)}
              </small>
            )}
          </>
        )}
      />
    </Row>
  );
}
