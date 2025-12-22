import PageHeader from "../HOC/pageHeader/PageHeader";

export default function ExamplePageHeader() {
  return (
    <PageHeader
      icon={<i className="pi pi-inbox text-lg" />}
      title="Pulse"
      subtitle="Complete Customer Support & Service Management"
      buttonLabel="Create Ticket"
      buttonIcon="pi pi-plus"
      onButtonClick={() => console.log("Create Ticket Clicked")}
    />
  );
}
