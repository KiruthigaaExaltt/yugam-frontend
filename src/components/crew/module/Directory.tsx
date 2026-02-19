import { FileText, Phone, Target, UserPlus } from "lucide-react";
import SmallCard from "../../HOC/SmallCard/SmallCard";
import ClientSummaryCard from "../../HOC/ClientSummaryCard/ClientSummaryCard";


const employees = [
  {
    fullName: "Jabastin",
    company: "24ED-GD-002",
    role: "Graphic Designer",
    department: "Design",
    status: "active",
    email: "designer_ops@elevateddigtech.in",
    phone: "7010814367",
    attendance: 91.7,
    performance: 4.5,
    profileImage: "/avatar.png" // ✅ FIXED
  },
  {
    fullName: "Priya Patel",
    company: "EMP002",
    role: "Marketing Manager",
    department: "Marketing",
    status: "active",
    email: "priya.patel@exalt.ai",
    phone: "+91 9876543213",
    attendance: 100,
    performance: 4.8,
    profileImage: "/avatar.png" // ✅
  },
  {
    fullName: "Amit Kumar",
    company: "EMP003",
    role: "Sales Executive",
    department: "Sales",
    status: "pending",
    email: "amit.kumar@exalt.ai",
    phone: "+91 9876543215",
    attendance: 83.3,
    performance: 4.2,
    profileImage: "/avatar.png" // ✅
  }
];
const Crewdashboard = () => {
  return (
    <div>
      {/* Page Title */}
      <div className="font-bold text-2xl mt-3">
        <h1>Employee Directory</h1>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
        <SmallCard
          icon={<UserPlus size={20} />}
          title="Total Employees"
          value="3"
          subText="Active: 2"
          iconBg="#EFF6FF"
          valueColor="#3B82F6"
        />

        <SmallCard
          icon={<Phone size={20} />}
          title="Avg Attendance"
          value="92%"
          subText="This month"
          iconBg="#FEF3C7"
          valueColor="#D97706"
        />

        <SmallCard
          icon={<Target size={20} />}
          title="On Leave"
          value="1"
          subText="Currently"
          iconBg="#F3E8FF"
          valueColor="#9333EA"
        />

        <SmallCard
          icon={<FileText size={20} />}
          title="Avg Performance"
          value="4.5"
          subText="Out of 5.0"
          iconBg="#FFEDD5"
          valueColor="#F97316"
        />
      </div>

      {/* Employee Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp, index) => (
          <ClientSummaryCard
            key={index}
            fullName={emp.fullName}
            company={emp.company}
            role={emp.role}
            department={emp.department}
            status={emp.status as any}
            email={emp.email}
            phone={emp.phone}
            attendance={emp.attendance}
            performance={emp.performance}
            profileImage={emp.profileImage}
            tags={[emp.department]}
            onView={() => console.log("View", emp.fullName)}
            onMark={() => console.log("Mark", emp.fullName)}
            onLeave={() => console.log("Leave", emp.fullName)}
            onPay={() => console.log("Pay", emp.fullName)}
          />
        ))}
      </div>
    </div>
  );
};

export default Crewdashboard;
