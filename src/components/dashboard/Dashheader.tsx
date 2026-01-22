import { PiHouseFill } from "react-icons/pi";
import PageHeader from "../HOC/pageHeader/PageHeader";

export default function Dashheader() {
  return (
    <PageHeader
      title="Dashboard"
      subtitle="Welcome back! Here's what's happening with your business."
      icon={<PiHouseFill />}
    />
  );
}