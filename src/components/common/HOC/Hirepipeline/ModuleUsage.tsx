import React from "react";

export interface Candidate {
  name: string;
  role: string;
  date: string;
  rating?: number;
}

export interface Stage {
  title: string;
  color: string; // progress bar color (Tailwind utility stays)
  candidates: Candidate[];
}

export interface ModuleUsageProps {
  stages: Stage[];
}

const ModuleUsage: React.FC<ModuleUsageProps> = ({ stages }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 px-2">
        {stages.map((stage, index) => (
          <div
            key={index}
            className="rounded-xl shadow-sm p-4 w-full border"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--surface-border)",
              boxShadow: "var(--card-shadow)",
              color: "var(--text-color)",
            }}
          >
            {/* Stage Title */}
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--text-color)" }}
            >
              {stage.title}
            </h3>

            {/* Progress Bar */}
            <div className={`h-1 w-full rounded-full mt-2 ${stage.color}`} />

            {/* Candidates */}
            <div className="mt-3 space-y-2">
              {stage.candidates.length ? (
                stage.candidates.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-3 border"
                    style={{
                      backgroundColor: "var(--surface-hover)",
                      borderColor: "var(--surface-border)",
                    }}
                  >
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-color)" }}
                    >
                      {c.name}
                    </div>

                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {c.role}
                    </div>

                    <div
                      className="flex justify-between items-center text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span>{c.date}</span>

                      {c.rating && (
                        <span style={{ color: "var(--secondary-color)" }}>
                          ⭐ {c.rating}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="text-xs text-center py-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  No candidates
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleUsage;
