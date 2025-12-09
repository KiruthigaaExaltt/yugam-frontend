import  { useState } from "react";
import { Calendar } from "primereact/calendar";
import { format, differenceInYears, addDays, isBefore } from "date-fns";

export default function ExampleCalendar() {
  const [date, setDate] = useState<Date | null>(null);

  // --- Format for API ---
  const formattedApiDate =
    date ? format(date, "yyyy-MM-dd") : "No date selected";

  // --- Human readable format ---
  const formattedPretty =
    date ? format(date, "dd MMM yyyy") : "Pick a date";

  // --- Age Example ---
  const age = date ? differenceInYears(new Date(), date) : null;

  // --- Add 7 days Example ---
  const nextWeek = date ? addDays(date, 7) : null;

  // --- Validation Example ---
  const isPastDate = date ? isBefore(date, new Date()) : false;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">PrimeReact Calendar + date-fns</h2>

      {/* Select Date */}
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value as Date)}
        dateFormat="dd/mm/yy"
        showIcon
        placeholder="Select a date"
      />

      <div className="mt-4 space-y-2 text-sm">
        <div><strong>Selected:</strong> {String(date)}</div>
        <div><strong>Pretty Format:</strong> {formattedPretty}</div>
        <div><strong>API Format:</strong> {formattedApiDate}</div>
        <div><strong>Age:</strong> {age !== null ? `${age} years` : "-"}</div>
        <div><strong>Next Week:</strong> {nextWeek ? format(nextWeek, "dd MMM yyyy") : "-"}</div>
        <div><strong>Is Past Date?:</strong> {isPastDate ? "Yes" : "No"}</div>
      </div>
    </div>
  );
}
