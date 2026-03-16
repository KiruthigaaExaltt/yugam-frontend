import { Dialog } from "primereact/dialog";
import { type ReactNode } from "react";

interface DialogformProps {
  visible: boolean;
  header: string; // main title
  subtitle?: string; // small description below title
  onHide: () => void;
  children: ReactNode;
  width?: string;
  contentClassName?: string;
}

export default function Dialogform({
  visible,
  header,
  subtitle,
  onHide,
  children,
  width = "700px",
  contentClassName = "p-0",
}: DialogformProps) {
  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width }}
      modal
      onHide={onHide}
      contentClassName={contentClassName}
    >
      <div className=" px-6 pt-0 pb-6 space-y-4">
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}

        {children}
      </div>
    </Dialog>
  );
}
