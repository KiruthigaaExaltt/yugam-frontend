import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import type { ReactNode } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationDialogProps {
    visible: boolean;
    onHide: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    icon?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    confirmClassName?: string;
}

const ConfirmationDialog = ({
    visible,
    onHide,
    onConfirm,
    title,
    message,
    icon,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    isLoading = false,
    confirmClassName = "bg-red-600 hover:bg-red-700 shadow-red-100"
}: ConfirmationDialogProps) => {

    const footer = (
        <div className="flex items-center justify-center gap-3 w-full p-6 pt-2">
            <Button
                label={cancelLabel}
                onClick={onHide}
                disabled={isLoading}
                className="flex-1 py-3 px-4 border border-gray-200 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
            />
            <Button
                label={confirmLabel}
                icon={isLoading ? "pi pi-spin pi-spinner" : undefined}
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex-1 py-3 px-4 text-white font-semibold rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer border-none ${confirmClassName}`}
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
            style={{ borderRadius: '24px', border: 'none' }}
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

                {/* Icon Container */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm ring-8 ring-red-50/50">
                        {icon || <AlertTriangle size={40} className="text-red-500" />}
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
