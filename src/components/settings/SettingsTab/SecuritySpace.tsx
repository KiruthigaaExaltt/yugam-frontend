
import { Button } from "primereact/button";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import type { MeetingItem } from "../../HOC/meetingCard/MeetingCard";
import MeetingCard from "../../HOC/meetingCard/MeetingCard";

const integrations: MeetingItem[] = [
  {
    title: "Google Workspace",
    description: "Single sign-on integration",
    mainIcon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50">
        <FaGoogle size={18} className="text-blue-600" />
      </div>
    ),
    rightContent: (
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
          connected
        </span>
        <Button
          label="Configure"
          className="p-button-text demo-button"
        />
      </div>
    ),
  },
  {
    title: "Microsoft 365",
    description: "Single sign-on integration",
    mainIcon: (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
        <FaMicrosoft size={18} className="text-gray-700" />
      </div>
    ),
    rightContent: (
      <div className="flex items-center gap-3">
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500 font-medium">
          disconnected
        </span>
        <Button
          label="Setup"
          className="p-button-text demo-button"
        />
      </div>
    ),
  },
];

export default function SecuritySpace() {
  return <MeetingCard meetings={integrations} />;
}
