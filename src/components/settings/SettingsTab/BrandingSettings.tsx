import { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { RHFInput } from "../../HOC/form/RHFFields";
import MeetingCard, {
  type MeetingItem,
} from "../../HOC/meetingCard/MeetingCard";

// Custom RHF Component for Large Drag & Drop Upload
function RBigFileUpload({ name, label, subLabel }: any) {
  const { control } = useFormContext();

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-[11px] font-bold uppercase tracking-widest pl-1" style={{ color: "var(--text-muted)" }}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({ field, fieldState }) => {
          const hasFile = !!field.value;
          const inputRef = useRef<HTMLInputElement>(null);
          
          return (
            <div className="w-full relative group">
              <label
                className={`
                  flex flex-col items-center justify-center gap-3
                  border-2 border-dashed ${
                    fieldState.error ? "border-red-500" : "border-surface-border"
                  }
                  rounded-2xl p-6
                  cursor-pointer 
                  hover:border-[color:var(--primary-color)] hover:bg-[color:var(--primary-color-light)] 
                  transition-all duration-300
                  text-center overflow-hidden
                `}
                style={{ minHeight: "180px", backgroundColor: 'var(--surface-50)' }}
              >
                <FileUploadInner value={field.value} subLabel={subLabel} />

                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              </label>

              {/* Premium Remove Button */}
              {hasFile && (
                <button
                  type="button"
                  onClick={() => {
                    field.onChange(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-xl border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10"
                  title="Remove"
                >
                  <FiTrash2 size={16} />
                </button>
              )}

              {fieldState.error && (
                <small className="text-red-500 block mt-2 ml-2">
                  {String(fieldState.error.message)}
                </small>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

// Sub-component to handle preview logic safely
function FileUploadInner({ value, subLabel }: { value: any; subLabel: string }) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === 'string') {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  if (preview) {
    return (
      <div className="relative w-full h-full flex items-center justify-center py-2 animate-in fade-in zoom-in duration-300">
        <img 
          src={preview} 
          alt="Preview" 
          className="max-h-[120px] max-w-[80%] object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-surface-border mb-1">
        <FiUpload className="text-2xl text-gray-400 group-hover:text-[color:var(--primary-color)] transition-colors" />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-semibold truncate max-w-[200px]" style={{ color: 'var(--text-color)' }}>
          <span className="text-gray-400">Drag & drop or </span>
          <span style={{ color: 'var(--primary-color)' }}>click to upload</span>
        </p>
        {subLabel && (
          <p className="text-[10px] font-medium uppercase tracking-tight" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
            {subLabel}
          </p>
        )}
      </div>
    </>
  );
}

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Color Swatch Component
const ColorSwatch = ({
  color,
  label,
}: {
  color: string;
  label: string;
  type?: "default" | "light" | "dark";
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-24 h-12 rounded-lg shadow-sm"
      style={{ backgroundColor: color }}
    />
    <span className="text-xs text-gray-500 font-medium">{label}</span>
  </div>
);

const BrandingSettings = () => {
  const methods = useForm({
    defaultValues: {
      primaryColor: "#06e897",
      secondaryColor: "#3b82f6",
      logo: null,
      favicon: null,
    },
  });


  // Watch colors for live preview
  const primaryColor = methods.watch("primaryColor");
  const secondaryColor = methods.watch("secondaryColor");

  const [darkMode, setDarkMode] = useState(false);
  const [themeToggle, setThemeToggle] = useState(true);

  const settings: MeetingItem[] = [
    {
      title: "Dark Mode Default",
      description: "Set dark mode as the default theme",
      showToggle: true,
      toggleValue: darkMode,
      onToggleChange: setDarkMode,
    },
    {
      title: "Theme Toggle",
      description: "Allow users to switch between themes",
      showToggle: true,
      toggleValue: themeToggle,
      onToggleChange: setThemeToggle,
    },
  ];

  const onSubmit = async (data: any) => {
    const root = document.documentElement;

    // 1. Update active semantic tokens (immediate effect)
    root.style.setProperty("--primary-color", data.primaryColor);
    root.style.setProperty("--secondary-color", data.secondaryColor);

    // 2. Update specific theme tokens to ensure consistency
    root.style.setProperty("--light-primary-color", data.primaryColor);
    root.style.setProperty("--light-secondary-color", data.secondaryColor);

    // 3. Handle Logo Upload
    let logoBase64 = null;
    if (data.logo instanceof File) {
      try {
        logoBase64 = await fileToBase64(data.logo);
        // Dispatch event for BaseLayout to pick up the new logo
        window.dispatchEvent(
          new CustomEvent("branding-update", { detail: { logo: logoBase64 } })
        );
      } catch (error) {
        console.error("Error converting logo to base64:", error);
      }
    }

    // 4. Handle Favicon Upload
    if (data.favicon instanceof File) {
      try {
        const faviconBase64 = await fileToBase64(data.favicon);
        // Directly update the favicon link tag
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = faviconBase64;
      } catch (error) {
        console.error("Error converting favicon to base64:", error);
      }
    }

    console.log("Theme & Branding Updated:", { ...data, logo: logoBase64 ? "Updated" : "Unchanged" });
  };

  // Listen for global save event from Header
  useEffect(() => {
    const handleGlobalSave = () => {
      methods.handleSubmit(onSubmit)();
    };
    window.addEventListener("settings-save-trigger", handleGlobalSave);
    return () => {
      window.removeEventListener("settings-save-trigger", handleGlobalSave);
    };
  }, [methods, onSubmit]);

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Card
            className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* LEFT: COLOR INPUTS */}
              <div className="space-y-6">
                {/* Primary Color */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg border shadow-sm"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="flex-1 pt-5">
                      <RHFInput
                        name="primaryColor"
                        label="Primary Brand Color"
                        placeholder="#000000"
                      />
                      <p className="text-xs text-gray-400 mt-1 pl-32">
                        Currently: Brand Primary
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Color */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg border shadow-sm"
                      style={{ backgroundColor: secondaryColor }}
                    />
                    <div className="flex-1">
                      <RHFInput
                        name="secondaryColor"
                        label="Secondary Color"
                        placeholder="#000000"
                      />
                      <p className="text-xs text-gray-400 mt-1 pl-32">
                        Used for accents and highlights
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: PREVIEW SECTION */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4
                    className="font-semibold text-lg"
                    style={{ color: "var(--text-color)" }}
                  >
                    Color Palette Preview
                  </h4>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                    <ColorSwatch color={primaryColor} label="Primary" />
                    {/* Approximating Light/Dark variants for demo */}
                    <ColorSwatch color={`${primaryColor}50`} label="Light" />
                    <ColorSwatch color={primaryColor} label="Dark" />
                    <ColorSwatch color={secondaryColor} label="Secondary" />
                    <ColorSwatch color="#ef4444" label="Error" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* UPLOAD SECTION */}
          <Card
            className="rounded-(--border-radius) border shadow-none mt-6 transition-all duration-300 [&_.p-card-body]:p-6!"
            style={{
              backgroundColor: "var(--surface-card)",
              borderColor: "var(--surface-border)",
              borderRadius: "var(--border-radius)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <RBigFileUpload
                name="logo"
                label="Main Logo"
                subLabel="SVG, PNG, JPG up to 10MB"
              />
              <RBigFileUpload
                name="favicon"
                label="Favicon"
                subLabel="32x32 px recommended. ICO, PNG"
              />
            </div>
          </Card>
          <div className="mt-6">
            <MeetingCard title="Settings" meetings={settings} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default BrandingSettings;
