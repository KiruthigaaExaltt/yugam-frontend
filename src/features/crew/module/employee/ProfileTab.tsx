import { Edit3 } from "lucide-react";

interface InfoItemProps {
    label: string;
    value: string | number | undefined;
}

const InfoItem = ({ label, value }: InfoItemProps) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-2 gap-2 sm:gap-24">
        <span className="text-gray-400 text-sm font-medium w-48">{label}</span>
        <span className="text-gray-700 font-bold text-sm tracking-tight">{value || "-"}</span>
    </div>
);

interface InfoSectionProps {
    title: string;
    children: React.ReactNode;
    badge?: React.ReactNode;
    onEdit?: () => void;
}

const InfoSection = ({ title, children, badge, onEdit }: InfoSectionProps) => (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase">{title}</h3>
                {badge}
            </div>
            <button 
                onClick={onEdit}
                className="flex items-center gap-2 text-gray-400 hover:text-blue-500 font-bold text-xs uppercase tracking-widest transition-colors group"
            >
                <Edit3 size={14} className="group-hover:scale-110 transition-transform" />
                Edit
            </button>
        </div>
        <div className="flex flex-col gap-4">
            {children}
        </div>
    </div>
);

const ProfileTab = ({ employee, onEdit }: { employee: any, onEdit: () => void }) => {
    return (
        <div className="grid grid-cols-1 gap-6 pb-12">
            {/* Profile Information */}
            <InfoSection title="Profile Information" onEdit={onEdit}>

                <InfoItem label="Name" value={employee.name} />
                <InfoItem label="ID" value={employee.employee_id} />
                <InfoItem label="Designation" value={employee.position} />
                <InfoItem label="Staff Type" value="Regular" />
                <InfoItem label="Contact Number" value={employee.phone} />
                <InfoItem label="Attendance Supervisor" value="Pampavasan" />
            </InfoSection>

            {/* General Information */}
            <InfoSection title="General Information" onEdit={onEdit}>

                <InfoItem label="Salary Cycle" value="1" />
                <InfoItem label="Weekly off Template" value="week off" />
                <InfoItem label="Holiday Template" value="Official Holidays" />
                <InfoItem label="Leave Template" value="Leave Policy" />
                <InfoItem label="Shift" value="10-7 shift" />
                <InfoItem label="Attendance on Weekly Off Template" value="-" />
            </InfoSection>


            {/* Personal Information */}
            <InfoSection title="Personal Information" onEdit={onEdit}>

                <InfoItem label="Email" value={employee.email} />
                <InfoItem label="Gender" value="MALE" />
                <InfoItem label="Date of Birth" value="10 Dec 1996" />
                <InfoItem label="Marital Status" value="UNMARRIED" />
                <InfoItem label="Blood Group" value="O+" />
                <InfoItem label="Emergency Contact" value="9942486957" />
                <InfoItem label="Father's Name" value="Ponsehar" />
                <InfoItem label="Mother's Name" value="Vimala" />
                <InfoItem label="Spouse's Name" value="-" />
                <InfoItem label="Physically Challenged" value="No" />
            </InfoSection>

            {/* Current Address */}
            <InfoSection title="Current Address" onEdit={onEdit}>

                <InfoItem label="Address Line 1" value="44/B2, Rangasamy Layout, A.Sangampalayam Colony" />
                <InfoItem label="Pollachi" value="Pollachi" />
                <InfoItem label="City" value="Coimbatore" />
                <InfoItem label="State" value="Tamil Nadu" />
                <InfoItem label="Postal Code" value="642002" />
            </InfoSection>

            {/* Permanent Address */}
            <InfoSection title="Permanent Address" onEdit={onEdit}>

                <InfoItem label="Address Line 1" value="44/B2, Rangasamy Layout, A.Sangampalayam Colony" />
                <InfoItem label="Pollachi" value="Pollachi" />
                <InfoItem label="City" value="Coimbatore" />
                <InfoItem label="State" value="Tamil Nadu" />
                <InfoItem label="Postal Code" value="642002" />
            </InfoSection>

            {/* Employment Information */}
            <InfoSection title="Employment Information" onEdit={onEdit}>

                <InfoItem label="Date of Joining" value="-" />
                <InfoItem label="UAN" value="-" />
                <InfoItem label="PAN Number" value="BGEPJ9971N" />
                <InfoItem label="Aadhaar Number" value="XXXXXXXX5361" />
                <InfoItem label="PF Number" value="-" />
                <InfoItem label="ESI Eligible" value="No" />
                <InfoItem label="PT Eligible" value="No" />
                <InfoItem label="LWF Eligible" value="No" />
                <InfoItem label="EPS Eligible" value="No" />
            </InfoSection>

            {/* Bank Details */}
            <InfoSection title="Bank Details" onEdit={onEdit} badge={

                <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    Bank Account Verified
                </span>
            }>
                <InfoItem label="Name of Bank" value="Catholic Syrian Bank" />
                <InfoItem label="IFSC Code" value="CSBK0000079" />
                <InfoItem label="Account Number" value="007903585851190001" />
                <InfoItem label="Name of Account Holder" value={employee.name.toUpperCase() + " P"} />
            </InfoSection>

            {/* UPI Details */}
            <InfoSection title="UPI Details" onEdit={onEdit}>

                <InfoItem label="UPI ID" value="-" />
            </InfoSection>
        </div>
    );
};

export default ProfileTab;
