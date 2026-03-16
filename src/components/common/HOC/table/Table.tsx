import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import type { ReactNode } from "react";


interface TableColumn {
  field: string;
  header: string;
  body?: (rowData: any) => ReactNode;
}

interface CommonTableProps {
  title?: string;
  data: any[];
  columns: TableColumn[];
  headerButton?: ReactNode;
  customHeader?: ReactNode;
}

export const Table = ({
  title,
  data,
  columns,
  headerButton,
  customHeader,
}: CommonTableProps) => {
  const header = customHeader ? (
    customHeader
  ) : (
    <div className="flex items-center w-full">
      <h2 className="text-xl font-semibold">{title}</h2>

      {/* pushes button to right side */}
      <div className="ml-auto">{headerButton}</div>
    </div>
  );

  return (
    <Card
      className="rounded-(--border-radius) border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        backgroundColor: "var(--surface-card)",
        borderColor: "var(--surface-border)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <DataTable
        value={data}
        header={header}
        className="w-full"
        tableStyle={{ width: "100%" }}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable={true}
            body={col.body}
          />
        ))}
      </DataTable>
    </Card>
  );
};
