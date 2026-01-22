import { useRef, type ReactNode } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./reusableDataTable.css";

import { FiDownload } from "react-icons/fi";

/* ================================
   COLUMN CONFIG
================================ */
export interface CrudColumn<T> {
  field?: keyof T;
  header?: string;
  sortable?: boolean;
  body?: (rowData: T) => ReactNode;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties; // New
  bodyStyle?: React.CSSProperties; // New
  selectionMode?: "multiple";
  exportable?: boolean;
}

/* ================================
   PROPS
================================ */
interface ReusableCrudTableProps<T extends object> {
  data: T[];
  columns: CrudColumn<T>[];
  dataKey: keyof T;
  totalRecords: number;

  selection?: T[];
  onSelectionChange?: (value: T[]) => void;

  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;

  onAdd?: () => void;
  addLabel?: string; // New
  onDeleteSelected?: () => void;
  onExport?: boolean;

  title?: ReactNode; // Changed to ReactNode

  headerFilters?: ReactNode;

  toolbar?: boolean;

  page: number;
  rows: number;
  onPageChange: (e: any) => void;
  lazy?: boolean;
  loading: boolean;
  paginator?: boolean;
  showSearch?: boolean; // New
  showGridlines?: boolean; // New
  isCard?: boolean; // New
}

/* ================================
   COMPONENT
================================ */
const ReusableCrudTable = <T extends object>({
  data,
  page,
  columns,
  dataKey,
  selection,
  totalRecords,
  onPageChange,
  onSelectionChange,
  loading,
  globalFilter,
  onGlobalFilterChange,
  onAdd,
  addLabel = "New", // New
  onDeleteSelected,
  onExport,
  title = "Manage Data",
  rows = 10,
  toolbar = true,
  headerFilters,
  paginator = true,
  showSearch = true,
  showGridlines = true,
  isCard = true,
}: ReusableCrudTableProps<T>) => {
  // NOTE: DataTable expects DataTableValueArray (array of T)
  const dt = useRef<DataTable<any> | null>(null);
  const toast = useRef<Toast | null>(null);

  const leftToolbarTemplate = () => (
    <div className="flex gap-2">
      {onDeleteSelected && (
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ borderRadius: 'var(--border-radius)' }}
          onClick={onDeleteSelected}
          disabled={!selection?.length}
        />
      )}
    </div>
  );

  const rightToolbarTemplate = () => (
    <div className="flex gap-2">
      {onAdd && (
        <Button
          label={addLabel}
          icon="pi pi-plus"
          className="p-button-text demo-button"
          style={{ borderRadius: 'var(--border-radius)' }}
          onClick={onAdd}
        />
      )}
      {onExport && (
        <Button
          label="Export"
          icon={<FiDownload size={16} />}
          className="p-button-text demo-button"
          style={{ borderRadius: 'var(--border-radius)' }}
          onClick={() => dt.current?.exportCSV()}
        />
      )}
    </div>
  );

  const header = (
    <div className="flex flex-wrap justify-between items-center gap-2 reusable-table-header">
      <div className="m-0 text-xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        {headerFilters && <div className="table-header-filters">{headerFilters}</div>}
        {showSearch && (
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              type="search"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
              className="p-inputtext-sm"
              style={{ borderRadius: 'var(--border-radius)' }}
            />
          </IconField>
        )}
      </div>
    </div>
  );

  const hasToolbarContent = !!onAdd || !!onDeleteSelected || !!onExport;

  const tableContent = (
    <>
      <Toast ref={toast} />

      {toolbar && hasToolbarContent && (
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        />
      )}

      {/* @ts-ignore */}
      <DataTable<any>
        ref={dt}
        value={data as any}
        lazy
        paginator={paginator}
        first={page * rows}
        rows={rows}
        rowsPerPageOptions={[5, 10, 25]}
        totalRecords={totalRecords}
        onPage={onPageChange}
        selection={selection as any}
        onSelectionChange={(e: any) => onSelectionChange?.(e.value)}
        selectionMode={selection ? "multiple" : undefined}
        loading={loading}
        dataKey={String(dataKey)}
        header={header}
        responsiveLayout="scroll"
        tableStyle={{ minWidth: "100%", tableLayout: "auto" }}
        showGridlines={showGridlines}
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field ? String(col.field) : undefined}
            header={col.header}
            sortable={col.sortable}
            body={col.body}
            style={col.style}
            headerStyle={col.headerStyle}
            bodyStyle={col.bodyStyle}
            selectionMode={col.selectionMode}
            exportable={col.exportable}
          />
        ))}
      </DataTable>
    </>
  );

  if (!isCard) {
    return tableContent;
  }

  return (
    <div
      className="card border shadow-sm  transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderRadius: "var(--border-radius)",
        borderColor: "var(--surface-border)",
        overflow: "hidden",
      }}
    >
      {tableContent}
    </div>
  );
};

export default ReusableCrudTable;
