import { Dialog } from "primereact/dialog";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "primereact/button";

interface ReusableDialogProps {
    visible: boolean;
    onHide: () => void;
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    submitLabel?: string;
    submitIcon?: ReactNode;
    onConfirm?: () => void;
    isLoading?: boolean;
    cancelLabel?: string;
    maxWidth?: string;
    closable?: boolean;
    children?: ReactNode;
}


const ReusableDialog = ({
    visible,
    onHide,
    title,
    subtitle,
    icon,
    body,
    footer,
    submitLabel = "Submit",
    submitIcon,
    onConfirm,
    isLoading = false,
    cancelLabel = "Cancel",
    maxWidth = "max-w-lg",
    closable = true,
    children
}: ReusableDialogProps) => {


    const defaultHeader = (
        <div className="flex items-center gap-3 text-left">
            {icon && (
                <div className="p-2.5 rounded-xl shadow-sm border" style={{ backgroundColor: 'var(--primary-color-light)', color: 'var(--primary-color)', borderColor: 'var(--primary-color-light)' }}>
                    {icon}
                </div>
            )}
            <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
                {subtitle && <p className="text-sm font-normal text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
        </div>
    );

    const defaultFooter = (
        <div className="flex flex-col sm:flex-row justify-end gap-3 w-full">
            <Button
                label={cancelLabel}
                onClick={onHide}
                className="px-6 py-2.5 font-semibold transition-all w-full sm:w-auto"
                style={{
                    backgroundColor: "transparent",
                    color: "var(--primary-color)",
                    border: "1.5px solid var(--primary-color)",
                    borderRadius: "8px"
                }}
            />
            {onConfirm && (
                <Button
                    label={submitLabel}
                    icon={isLoading ? "pi pi-spin pi-spinner" : submitIcon}
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="px-8 py-2.5 font-bold transition-all active:scale-95 w-full sm:w-auto shadow-lg"
                    style={{
                        backgroundColor: "var(--primary-color)",
                        color: "#fff",
                        border: "1px solid var(--primary-color)",
                        borderRadius: "8px"
                    }}
                />
            )}
        </div>
    );

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header={
                <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                        {defaultHeader}
                    </div>
                    {closable && (
                        <button
                            onClick={onHide}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-all text-gray-400 hover:text-gray-600 ml-4 group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                        </button>
                    )}
                </div>
            }
            footer={
                <div className="flex flex-col sm:flex-row justify-end gap-3 p-5 rounded-b-2xl ">
                    {footer || defaultFooter}
                </div>
            }
            className={`w-[95vw] ${maxWidth}`}
            contentClassName="p-0"
            headerClassName="px-6 py-6 border-b border-gray-50 rounded-t-2xl"
            maskClassName="bg-gray-900/40 backdrop-blur-[2px]"
            style={{ borderRadius: '24px', overflow: 'hidden', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
            closable={false}
        >
            <div className="p-8">
                {body}
                {children}
            </div>

        </Dialog>
    );
};

export default ReusableDialog;
