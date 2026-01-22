// RHFFields.tsx
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

// Common wrapper
const Row = ({ label, children, vertical = false }: any) => (
  <div className={vertical ? "flex flex-col gap-2" : "flex items-start gap-3"}>
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

// ===============================================================
// MULTI SELECT (array) — Controller Simplified
// ===============================================================
export function RMultiSelect({ name, label, options = [] }: any) {
  const { control } = useFormContext();

  return (
    <Row label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field, fieldState }) => {
          const toggle = (value: string) => {
            const exists = field.value.includes(value);
            const updated = exists
              ? field.value.filter((v: string) => v !== value)
              : [...field.value, value];

            field.onChange(updated);
          };

          return (
            <>
              <div className="flex flex-wrap gap-6">
                {options.map((opt: any) => (
                  <label key={opt.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value.includes(opt.value)}
                      onChange={() => toggle(opt.value)}
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
