import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneNumberField({
  initialValue,
  onChange,
}: {
  initialValue?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState<string | undefined>(initialValue || "");

  useEffect(() => {
    if (onChange) {
      onChange(value || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="w-full">
      <label className="mb-4 flex items-center gap-2">
        <Phone className="h-5 w-5 text-[#0AD2C9]" />
        Phone Number *
      </label>

      {/* <div className="relative"> */}
      <PhoneInput
        international
        defaultCountry="IN"
        value={value}
        onChange={setValue}
        className="phone-input flex w-full rounded-lg border border-gray-200 transition-all focus-within:ring-2 focus-within:ring-[#0AD2C9] focus-within:border-[#0AD2C9] focus:outline-none"
        placeholder="Enter phone number"
      />
      {/* </div> */}
    </div>
  );
}
