import { FileText, Phone, Target, UserPlus } from "lucide-react"
import SmallCard from "../../HOC/SmallCard/SmallCard"
import ClientSummaryCard from "../../HOC/ClientSummaryCard/ClientSummaryCard";


const employees = [
  {
    name: "Jabastin",
    employeeId: "24ED-GD-002",
    role: "Graphic Designer",
    department: "Design",
    status: "active",
    email: "designer_ops@elevateddigtech.in",
    phone: "7010814367",
    attendance: 91.7,
    performance: 4.5,
    profileImage: "/avatars/user1.jpg"
  },
  {
    name: "Priya Patel",
    employeeId: "EMP002",
    role: "Marketing Manager",
    department: "Marketing",
    status: "active",
    email: "priya.patel@exalt.ai",
    phone: "+91 9876543213",
    attendance: 100,
    performance: 4.8,
    profileImage: ""
  },
  {
    name: "Amit Kumar",
    employeeId: "EMP003",
    role: "Sales Executive",
    department: "Sales",
    status: "pending",
    email: "amit.kumar@exalt.ai",
    phone: "+91 9876543215",
    attendance: 83.3,
    performance: 4.2,
    profileImage: "/avatars/user3.jpg"
  }
];

const Crewdashboard = () => {
  return (
    <div>
      <div className="item-start font-bold text-2xl mt-3">
        <h1>Employee Directory</h1>
      </div>
      <div
        className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-3
                    mt-3">
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

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp, index) => (
          <ClientSummaryCard
            key={index}
            name={emp.name}
            company={emp.employeeId}
            role={emp.role}
            department={emp.department}
            status={emp.status as any}
            email={emp.email}
            phone={emp.phone}
            attendance={emp.attendance}
            performance={emp.performance}
            profileImage={emp.profileImage}
            tags={[emp.department]}
            onView={() => console.log("View", emp.name)}
            onMark={() => console.log("Mark", emp.name)}
            onLeave={() => console.log("Leave", emp.name)}
            onPay={() => console.log("Pay", emp.name)}
          />
        ))}

      </div>
    </div>
  )
}

export default Crewdashboard
