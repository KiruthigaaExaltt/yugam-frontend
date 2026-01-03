import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useForm, FormProvider } from "react-hook-form";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { RHFInput, RDropdown } from "../../HOC/form/RHFFields";

// Mock options
const TIMEZONES = [
  { label: "Eastern Time (EST)", value: "est" },
  { label: "Pacific Time (PST)", value: "pst" },
  { label: "UTC", value: "utc" },
];
const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
];
const DATE_FORMATS = [
  { label: "MM/DD/YYYY", value: "mm/dd/yyyy" },
  { label: "DD/MM/YYYY", value: "dd/mm/yyyy" },
  { label: "YYYY-MM-DD", value: "yyyy-mm-dd" },
];
const CURRENCIES = [
  { label: "USD ($)", value: "usd" },
  { label: "EUR (€)", value: "eur" },
  { label: "INR (₹)", value: "inr" },
];

const OrganizationSettings = () => {
  const methods = useForm({
    defaultValues: {
      orgName: "Digital Marketing Agency",
      domain: "agency.com",
      phone: "+1 (555) 123-4567",
      email: "info@agency.com",
      address: "123 Business St, Suite 100, New York, NY 10001",
      timezone: "est",
      language: "en",
      dateFormat: "mm/dd/yyyy",
      currency: "usd",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          {/* CARD 1: GENERAL INFO */}
          <Card
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <div className="space-y-6">
              {/* LOGO SECTION */}
              <div className="flex items-start gap-4">
               {logoPreview ? (
                   <img 
                    src={logoPreview}
                    alt="Logo"
                    className="w-16 h-16 rounded-lg object-cover border"
                   />
               ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl border">
                  AG
                </div>
               )}
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg" style={{ color: "var(--text-color)" }}>Organization Logo</h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Upload your organization logo for branding
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      label="Upload"
                      icon={<FiUpload className="mr-2" />}
                      className="p-button-outlined p-button-sm"
                      onClick={() => fileInputRef.current?.click()}
                      style={{ borderRadius: "8px" }}
                    />
                    <Button
                      type="button"
                      label="Remove"
                      icon={<FiTrash2 className="mr-2" />}
                      className="p-button-outlined p-button-secondary p-button-sm"
                      onClick={handleRemoveLogo}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RHFInput name="orgName" label="Organization Name" />
                <RHFInput name="domain" label="Domain" />
                
                <RHFInput name="phone" label="Phone" />
                <RHFInput name="email" label="Contact Email" />
                
                <div className="md:col-span-2">
                  <RHFInput name="address" label="Address" />
                </div>
              </div>
            </div>
          </Card>

          {/* CARD 2: PREFERENCES (Timezone, etc) */}
          <Card
            className="rounded-(--border-radius) border shadow-sm mt-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RDropdown 
                name="timezone" 
                label="Timezone" 
                options={TIMEZONES}
              />
              <RDropdown 
                name="language" 
                label="Language" 
                options={LANGUAGES} 
              />
              <RDropdown 
                name="dateFormat" 
                label="Date Format" 
                options={DATE_FORMATS} 
              />
              <RDropdown 
                name="currency" 
                label="Currency" 
                options={CURRENCIES} 
              />
            </div>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrganizationSettings;
