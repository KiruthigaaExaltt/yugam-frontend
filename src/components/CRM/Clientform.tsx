import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import {FiChevronUp,FiChevronDown} from "react-icons/fi"

interface ClientFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

export default function ClientForm({
  initialValues,
  onSubmit,
  onCancel,
}: ClientFormProps) {
  const [form, setForm] = useState({
    fullName: initialValues?.fullName || "",
    company: initialValues?.company || "",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    status: initialValues?.status || null,
    priority: initialValues?.priority || null,
    contractValue: initialValues?.contractValue || 0,
    industry: initialValues?.industry || "",
    address: initialValues?.address || "",
    website: initialValues?.website || "",
    tags: initialValues?.tags || "",
    notes: initialValues?.notes || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!form.company.trim())
      newErrors.company = "Company is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.status)
      newErrors.status = "Status is required";

    if (!form.priority)
      newErrors.priority = "Priority is required";

    if (form.contractValue < 0)
      newErrors.contractValue = "Value cannot be negative";

    if (
      form.website &&
      !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/.test(form.website)
    )
      newErrors.website = "Enter a valid website URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-4">
      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Full Name *</label>
          <InputText
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={`w-full ${errors.fullName ? "p-invalid" : ""}`}
          />
          {errors.fullName && <small className="text-red-500">{errors.fullName}</small>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Company *</label>
          <InputText
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={`w-full ${errors.company ? "p-invalid" : ""}`}
          />
          {errors.company && <small className="text-red-500">{errors.company}</small>}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Email *</label>
          <InputText
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full ${errors.email ? "p-invalid" : ""}`}
          />
          {errors.email && <small className="text-red-500">{errors.email}</small>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <InputText
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Status *</label>
          <Dropdown
            value={form.status}
            options={[
              { label: "Active", value: "active" },
              { label: "Pending", value: "pending" },
              { label: "Inactive", value: "inactive" },
            ]}
            onChange={(e) => setForm({ ...form, status: e.value })}
            placeholder="Select Status"
            showClear
            className={`w-full ${errors.status ? "p-invalid" : ""}`}
          />
          {errors.status && <small className="text-red-500">{errors.status}</small>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Priority *</label>
          <Dropdown
            value={form.priority}
            options={[
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
            onChange={(e) => setForm({ ...form, priority: e.value })}
            placeholder="Select Priority"
            showClear
            className={`w-full ${errors.priority ? "p-invalid" : ""}`}
          />
          {errors.priority && <small className="text-red-500">{errors.priority}</small>}
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Contract Value</label>
<div className="flex border rounded-lg overflow-hidden">
  <input
    type="number"
    value={form.contractValue}
    onChange={(e) =>
      setForm({ ...form, contractValue: Number(e.target.value) })
    }
    className="flex-1 px-3 outline-none"
  />
  <div className="flex flex-col border-l">
    <button
      onClick={() =>
        setForm({ ...form, contractValue: form.contractValue + 1 })
      }
      className="px-2 py-1"
    >
      <FiChevronUp />
    </button>
    <button
      onClick={() =>
        setForm({
          ...form,
          contractValue: Math.max(0, form.contractValue - 1),
        })
      }
      className="px-2 py-1"
    >
      <FiChevronDown />
    </button>
  </div>
</div>

          {errors.contractValue && (
            <small className="text-red-500">{errors.contractValue}</small>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Industry</label>
          <InputText
            value={form.industry}
            onChange={(e) => setForm({ ...form, industry: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block mb-1 font-medium">Address</label>
        <InputTextarea
          rows={2}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block mb-1 font-medium">Website</label>
        <InputText
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className={`w-full ${errors.website ? "p-invalid" : ""}`}
        />
        {errors.website && <small className="text-red-500">{errors.website}</small>}
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-1 font-medium">Tags(Comma separated)</label>
        <InputText
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="VIP, Tech, Marketing,"
          className="w-full"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <InputTextarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-3">
        <Button label="Cancel" className="p-button-text" onClick={onCancel} />
        <Button label="Add Client" className="p-button-primary" onClick={handleSubmit} />
      </div>
    </div>
  );
}
