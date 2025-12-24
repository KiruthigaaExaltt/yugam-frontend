import React from "react";

interface Candidate {
  name: string;
  role: string;
  date: string;
  rating?: number;
}

interface StageColumnProps {
  title: string;
  candidates: Candidate[];
  color?: string;
}

const StageColumn: React.FC<StageColumnProps> = ({
  title,
  candidates,
  color = "bg-green-400",
}) => {
  return (
   <div className="bg-white rounded-xl shadow-sm p-4 w-full sm:w-[260px] lg:w-[320px] flex flex-col">

  {/* Header */}
  <div>
    <h3 className="font-semibold text-sm">{title}</h3>
    <div className={`h-1 w-full rounded-full mt-2 ${color}`} />
  </div>

  {/* Content */}
  <div className="mt-2 min-w-0">
    {candidates.length > 0 ? (
      <div className="w-full">
        {candidates.map((c, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-3 bg-gray-50 flex flex-col gap-1"
          >
            <div className="font-semibold text-sm">{c.name}</div>
            <div className="text-gray-500 text-xs">{c.role}</div>
            <div className="text-gray-400 text-xs">{c.date}</div>

            {c.rating && (
              <div className="flex items-center gap-1 text-orange-500 text-xs mt-1">
                ⭐ {c.rating}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center text-xs text-gray-400 py-6">
        No candidates
      </div>
    )}
  </div>
</div>
 );
};
export default StageColumn;
