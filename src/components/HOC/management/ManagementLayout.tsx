import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./management.css";

export type ManagementAction = {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: any) => void;
  className?: string;
  severity?: "secondary" | "success" | "info" | "warning" | "danger" | "help" | "contrast";
  text?: boolean;
  outlined?: boolean;
};

export type ManagementHeaderAction = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type ManagementLayoutProps<T> = {
  title?: string;
  headerActions?: ManagementHeaderAction[];
  items: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemConfig?: {
    idKey?: keyof T;
    titleKey?: keyof T;
    subtitleKey?: keyof T;
    descriptionKey?: keyof T;
    valueKey?: keyof T;
    valueLabelKey?: keyof T;
    secondaryValueLabelKey?: keyof T;
    statusKey?: keyof T; // For badges
    secondaryStatusKey?: keyof T; // For second badge (e.g. "Onboarding")
    metaKey?: keyof T; // e.g. "Started: 2/1/2024"
    tagsKey?: keyof T; // Array of strings
    reasonKey?: keyof T; // For "Reason: ..." text
    actions?: ManagementAction[];
  };
  className?: string;
  isCard?: boolean;
};

const ManagementLayout = <T extends Record<string, any>>({
  title,
  headerActions = [],
  items = [],
  renderItem,
  itemConfig,
  className = "",
  isCard = false,
}: ManagementLayoutProps<T>) => {
  const content = (
    <div className={`management-layout ${className}`}>
      {/* HEADER */}
      {(title || headerActions.length > 0) && (
        <div className="management-header flex justify-between items-center mb-5 px-1">
          {title && <h2 className="management-title font-semibold text-xl">{title}</h2>}
          <div className="management-header-actions flex gap-2">
            {headerActions.map((action, idx) => (
              <Button
                key={idx}
                label={action.label}
                icon={action.icon}
                onClick={action.onClick}
                className={`p-button-outlined p-button-sm ${action.className || ""}`}
                style={{ fontSize: '13px', paddingTop: '6px', paddingBottom: '6px' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* LIST/GRID */}
      <div className="management-list space-y-4">
        {items.map((item, index) => (
          <React.Fragment key={itemConfig?.idKey ? (item[itemConfig.idKey] as string) : index}>
            {renderItem ? (
              renderItem(item, index)
            ) : (
              <ManagementItemCard item={item} config={itemConfig} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  if (isCard) {
    return (
      <Card 
        className="rounded-2xl border shadow-sm"
        style={{
          borderColor: "var(--surface-border)",
          backgroundColor: "var(--surface-card)",
          borderRadius: "1rem",
        }}
      >
        {content}
      </Card>
    );
  }

  return content;
};

export type ManagementItemCardProps<T> = {
  item: T;
  config?: ManagementLayoutProps<T>["itemConfig"];
};

const statusColorMap: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  accepted: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  paid: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  sent: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  draft: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
  pending: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  overdue: { bg: "bg-red-50", text: "text-red-600", border: "border-red-100" },
  onboarding: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
  revision: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
  paused: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  recurring: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
};

export const ManagementItemCard = <T extends Record<string, any>>({
  item,
  config,
}: ManagementItemCardProps<T>) => {
  if (!config) return null;

  const {
    titleKey,
    subtitleKey,
    descriptionKey,
    valueKey,
    valueLabelKey,
    secondaryValueLabelKey,
    statusKey,
    secondaryStatusKey,
    metaKey,
    tagsKey,
    reasonKey,
    actions = [],
  } = config;

  const getStatusStyles = (status: string) => {
    return statusColorMap[status?.toLowerCase()] || statusColorMap.draft;
  };

  return (
    <div className="management-card rounded-2xl border p-5 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* LEFT SECTION */}
        <div className="management-card-left flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-lg">{titleKey ? item[titleKey] : ""}</span>
            {statusKey && item[statusKey] && (
              <span className={`status-badge px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyles(item[statusKey]).bg} ${getStatusStyles(item[statusKey]).text} ${getStatusStyles(item[statusKey]).border}`}>
                {item[statusKey]}
              </span>
            )}
            {secondaryStatusKey && item[secondaryStatusKey] && (
              <span className={`status-badge px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusStyles(item[secondaryStatusKey]).bg} ${getStatusStyles(item[secondaryStatusKey]).text} ${getStatusStyles(item[secondaryStatusKey]).border}`}>
                {item[secondaryStatusKey]}
              </span>
            )}
            {/* Optional secondary badge for recurring/monthly as seen in images */}
            {item.billingType && (
               <span className="flex items-center gap-1 text-xs text-gray-400">
                  <i className="pi pi-calendar" style={{ fontSize: '10px' }}></i>
                  {item.billingType}
               </span>
            )}
          </div>

          <div className="text-gray-900 font-medium text-sm mb-1">
            {subtitleKey ? item[subtitleKey] : ""}
          </div>

          {tagsKey && Array.isArray(item[tagsKey]) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {(item[tagsKey] as string[]).map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-100 rounded-full text-[11px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {descriptionKey && (
            <div className="text-gray-500 text-xs mb-1">
              {item[descriptionKey]}
            </div>
          )}

          {reasonKey && item[reasonKey] && (
            <div className="text-gray-400 text-[11px] mb-2 italic">
               Reason: {item[reasonKey]}
            </div>
          )}

          {metaKey && (
            <div className="text-gray-400 text-xs">
              {item[metaKey]}
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="management-card-right flex flex-col items-end justify-start text-right">
          <div className="text-emerald-500 font-bold text-xl">
            {valueKey ? item[valueKey] : ""}
          </div>
          {valueLabelKey && (
            <div className={`text-xs ${item[statusKey]?.toLowerCase() === 'overdue' ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
              {item[valueLabelKey]}
            </div>
          )}
          {secondaryValueLabelKey && item[secondaryValueLabelKey] && (
            <div className="text-gray-400 text-xs">
              {item[secondaryValueLabelKey]}
            </div>
          )}
          {item.alertInfo && (
            <div className="mt-auto flex items-center gap-1 text-gray-400 text-xs pt-4">
               <i className="pi pi-bell" style={{ fontSize: '10px' }}></i>
               {item.alertInfo}
            </div>
          )}
          {item.itemCount && (
            <div className="mt-auto text-gray-400 text-xs pt-4">
               {item.itemCount} items
            </div>
          )}
        </div>
      </div>

      {/* ACTIONS BOTTOM */}
      {actions.length > 0 && (
        <div className="management-card-actions flex gap-3 mt-4 pt-4 border-t border-gray-50">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              label={action.label}
              icon={action.icon}
              onClick={() => action.onClick(item)}
              className={`p-button-outlined p-button-sm text-gray-700 font-medium ${action.className || ""}`}
              style={{ padding: '6px 12px', fontSize: '12px', borderColor: '#e5e7eb', background: 'white' }}
              severity={action.severity}
              text={action.text}
              outlined={action.outlined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagementLayout;
