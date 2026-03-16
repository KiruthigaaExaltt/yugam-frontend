import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
// import type { ReactNode } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

interface ConfirmationDialogProps {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    // icon?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    // confirmClassName?: string;
}

const ConfirmationDialog = ({
    visible,
    onHide,
    onConfirm,
    title,
    message,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    isLoading = false
}: ConfirmationDialogProps) => {

    const footer = (
        <div className="flex items-center justify-center gap-4 w-full p-8 pt-2">
            <Button
                label={cancelLabel}
                onClick={onHide}
                disabled={isLoading}
                style={{ backgroundColor: '#10b981', color: '#fff', border: 'none' }}
                className="flex-1 py-3.5 px-6 font-bold rounded-xl transition-all active:scale-95 shadow-md shadow-green-100 cursor-pointer"
            />
            <Button
                label={confirmLabel}
                icon={isLoading ? "pi pi-spin pi-spinner" : undefined}
                onClick={onConfirm}
                disabled={isLoading}
                style={{ backgroundColor: '#f84c4c', color: '#fff', border: 'none' }}
                className={`flex-1 py-3.5 px-6 font-bold rounded-xl transition-all shadow-md shadow-red-100 active:scale-95 cursor-pointer`}
            />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            closable={false}
            footer={footer}
            className="w-[90vw] max-w-[400px]"
            maskClassName="bg-gray-900/60 backdrop-blur-sm"
            contentClassName="p-0 overflow-hidden"
            style={{
                borderRadius: "30px",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
                border: "none"
            }}
            showHeader={false}
        >
            <div className="relative p-8 text-center">
                {/* Close Button */}
                <button
                    onClick={onHide}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
                >
                    <X size={18} />
                </button>

                {/* Icon Container (Improved Trash Design) */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-24 h-24 bg-[#fff1f1] rounded-full flex items-center justify-center border-4 border-white shadow-md">
                        <div className="relative flex items-center justify-center">
                            <Trash2 size={42} className="text-[#f84c4c]" strokeWidth={2.5} />
                            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5">
                                <AlertTriangle size={14} className="text-[#f84c4c]" fill="#f84c4c" />
                            </div>
                        </div>
                        {/* Outer Glow */}
                        <div className="absolute inset-0 rounded-full border-[10px] border-[#fff1f1] opacity-50 -z-10 animate-pulse" />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                    {title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg">
                    {message}
                </p>
            </div>
        </Dialog>
    );
};

export default ConfirmationDialog;
