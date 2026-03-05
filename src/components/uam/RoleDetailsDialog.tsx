import { Shield, Clock, Info, CheckCircle2 } from "lucide-react";
import { useGetRoleByIdQuery } from "./roleApi";
import ReusableDialog from "../HOC/dialog/ReusableDialog";
import LoadingDots from "../HOC/loading/LoadingDots";

interface RoleDetailsDialogProps {
    visible: boolean;
    onHide: () => void;
    roleId?: string | null;
}

const RoleDetailsDialog = ({ visible, onHide, roleId }: RoleDetailsDialogProps) => {
    const { data: roleResponse, isFetching } = useGetRoleByIdQuery(roleId as string, {
        skip: !roleId,
    });

    const role = roleResponse?.data?.role || roleResponse?.data || null;

    const body = isFetching ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
            <LoadingDots />
            <p className="text-gray-500 font-medium text-sm animate-pulse">Fetching role details...</p>
        </div>
    ) : role ? (
        <div className="space-y-8" style={{ fontFamily: 'var(--font-primary)' }}>
            {/* Header Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[var(--surface-card)] rounded-2xl border border-[var(--surface-border)]">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Info size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Role Code</span>
                    </div>
                    <p className="text-sm font-mono font-bold px-2 py-1 rounded-md inline-block" style={{ color: 'var(--primary-color)', backgroundColor: 'var(--primary-color-light)' }}>
                        {role.roleCode}
                    </p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <Clock size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Last Updated</span>
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-color)]">
                        {role.updatedAt ? new Date(role.updatedAt).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        }) : 'Never'}
                    </p>
                </div>
                <div className="md:col-span-2 space-y-1">
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                        <Shield size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Description</span>
                    </div>
                    <p className="text-sm text-[var(--text-color)] leading-relaxed">
                        {role.roleDescription || 'No description provided for this role.'}
                    </p>
                </div>
            </div>

            {/* Permissions Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-2">
                    <h4 className="text-sm font-bold text-[var(--text-color)] uppercase tracking-widest flex items-center gap-2">
                        Granted Permissions
                        <span className="text-white text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}>
                            {role.permissions?.length || 0}
                        </span>
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                    {role.permissions && role.permissions.length > 0 ? (
                        role.permissions.map((perm: string) => (
                            <div
                                key={perm}
                                className="flex items-center gap-3 p-3 bg-white border border-[var(--surface-border)] rounded-xl hover:border-green-200 hover:shadow-md transition-all group"
                            >
                                <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className="text-[11px] font-bold text-[var(--text-color)] uppercase tracking-tight">
                                    {perm.replace(/_/g, " ")}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-8 text-center bg-[var(--surface-card)] rounded-xl border border-dashed border-[var(--surface-border)]">
                            <p className="text-[var(--text-muted)] text-sm italic">No permissions assigned to this role.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="py-12 text-center">
            <p className="text-red-500 font-medium">Failed to load role details.</p>
        </div>
    );

    return (
        <ReusableDialog
            visible={visible}
            onHide={onHide}
            title={role?.roleName || 'Role Details'}
            subtitle="Detailed overview of role capabilities and permissions"
            icon={<Shield size={24} className="text-[var(--primary-color)]" />}
            body={body}
            maxWidth="max-w-2xl"
            cancelLabel="Close"
        />
    );
};

export default RoleDetailsDialog;
