import { useRef, type ReactNode } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

/* ================================
   COLUMN CONFIG
================================ */
export interface CrudColumn<T> {
  field?: keyof T;
  header?: string;
  sortable?: boolean;
  body?: (rowData: T) => ReactNode;
  style?: React.CSSProperties;
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
  onDeleteSelected?: () => void;
  onExport?: boolean;

  title?: string;

  headerFilters?: ReactNode;

  toolbar?: boolean;

  page: number;
  rows: number;
  onPageChange: (e: any) => void;
  lazy?: boolean;
  loading: boolean;
  paginator?: boolean;
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
  onDeleteSelected,
  onExport,
  title = "Manage Data",
  rows = 10,
  toolbar = true,
  headerFilters,
  paginator = true,
}: ReusableCrudTableProps<T>) => {
  // NOTE: DataTable expects DataTableValueArray (array of T)
  const dt = useRef<DataTable<any> | null>(null);
  const toast = useRef<Toast | null>(null);

  const leftToolbarTemplate = () => (
    <div className="flex gap-2">
      {onAdd && (
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={onAdd}
        />
      )}
      {onDeleteSelected && (
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={onDeleteSelected}
          disabled={!selection?.length}
        />
      )}
    </div>
  );

  const rightToolbarTemplate = () =>
    onExport ? (
      <Button
        label="Export"
        icon="pi pi-upload"
        severity="help"
        onClick={() => dt.current?.exportCSV()}
      />
    ) : null;

  const header = (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <h4 className="m-0 text-xl font-semibold">{title}</h4>
      <div className="flex items-center gap-2">
        {headerFilters && <div>{headerFilters}</div>}
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
            className="p-inputtext-sm"
          />
        </IconField>
      </div>
    </div>
  );

  const hasToolbarContent = !!onAdd || !!onDeleteSelected || !!onExport;

  return (
    <div
      className="card border shadow-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        borderRadius: "var(--border-radius)",
        borderColor: "var(--surface-border)",
        overflow: "hidden",
      }}
    >
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
        showGridlines
      >
        {columns.map((col, index) => (
          <Column
            key={index}
            field={col.field ? String(col.field) : undefined}
            header={col.header}
            sortable={col.sortable}
            body={col.body}
            style={col.style}
            selectionMode={col.selectionMode}
            exportable={col.exportable}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default ReusableCrudTable;
