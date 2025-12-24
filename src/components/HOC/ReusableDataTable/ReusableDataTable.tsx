import { useRef, type ReactNode } from "react";
import { DataTable} from "primereact/datatable";
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

  selection?: T[];
  onSelectionChange?: (value: T[]) => void;

  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;

  onAdd?: () => void;
  onDeleteSelected?: () => void;
  onExport?: boolean;

  title?: string;
  rows?: number;
  toolbar?: boolean;
}

/* ================================
   COMPONENT
================================ */
const ReusableCrudTable = <T extends object>({
  data,
  columns,
  dataKey,
  selection,
  onSelectionChange,
  globalFilter,
  onGlobalFilterChange,
  onAdd,
  onDeleteSelected,
  onExport,
  title = "Manage Data",
  rows = 10,
  toolbar = true,
}: ReusableCrudTableProps<T>) => {
  // NOTE: DataTable expects DataTableValueArray (array of T)
  const dt = useRef<DataTable<T[]> | null>(null);
  const toast = useRef<Toast | null>(null);

  const leftToolbarTemplate = () => (
    <div className="flex gap-2">
      {onAdd && <Button label="New" icon="pi pi-plus" severity="success" onClick={onAdd} />}
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
      <Button label="Export" icon="pi pi-upload" severity="help" onClick={() => dt.current?.exportCSV()} />
    ) : null;

  const header = (
    <div className="flex justify-between align-items-center">
      <h4 className="m-0">{title}</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
        />
      </IconField>
    </div>
  );

  const hasToolbarContent = !!onAdd || !!onDeleteSelected || !!onExport;

  return (
    <div className="card">
      <Toast ref={toast} />

      {toolbar && hasToolbarContent && <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />}

      <DataTable<T>
        ref={dt}
        value={data}
        dataKey={String(dataKey)}
        paginator
        rows={rows}
        rowsPerPageOptions={[5, 10, 25]}
        selection={selection}
        onSelectionChange={(e: { value: T[] }) => onSelectionChange?.(e.value)}
        selectionMode={selection ? "multiple" : undefined}
        globalFilter={globalFilter}
        header={toolbar ? header : undefined}
        responsiveLayout="scroll"
        showGridlines
        stripedRows
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
