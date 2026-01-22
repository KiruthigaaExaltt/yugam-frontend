import { useState } from "react";
import FilterBar from "../HOC/filterbar/FilterBar";
import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiPlus } from "react-icons/fi";
import TemplateCard from "../HOC/templateCard/TemplateCard";

interface Template {
    id: string;
    title: string;
    category: string;
    description: string;
    createdBy: string;
    date: string;
    industry: string;
}

const sampleTemplates: Template[] = [
    {
        id: "1",
        title: "Civil Construction - Basic",
        category: "Civil",
        description: "Standard template for civil construction projects",
        createdBy: "Admin",
        date: "2024-01-01",
        industry: "civil"
    },
    {
        id: "2",
        title: "PEB Standard Package",
        category: "PEB",
        description: "Pre-engineered building standard package",
        createdBy: "Admin",
        date: "2024-01-01",
        industry: "peb"
    }
];

const QuoteLibrary = () => {
    const [industry, setIndustry] = useState<string | null>(null);

    const filteredTemplates = industry && industry !== "all"
        ? sampleTemplates.filter(t => t.industry === industry)
        : sampleTemplates;

    return (
        <div className="flex flex-col gap-6 mt-6">
            <PageHeader
                title="Quote Library & Templates"
                subtitle="Manage reusable quote templates for different industries"
                actions={[
                    {
                        label: "Create New Template",
                        icon: <FiPlus size={16} />,
                        variant: "primary",
                        onClick: () => console.log("Create New Template"),
                    },
                ]}
            />

            <div className="pb-6 flex flex-col gap-6">
                <FilterBar
                    filters={[
                        {
                            value: industry,
                            onChange: (val) => setIndustry(val),
                            options: [
                                { label: "All Industries", value: "all" },
                                { label: "Civil", value: "civil" },
                                { label: "PEB", value: "peb" },
                                { label: "Automation", value: "automation" },
                                { label: "Foundry", value: "foundry" },
                                { label: "Textile", value: "textile" },
                                { label: "Water", value: "water" },
                            ],
                            placeholder: "Filter by industry",
                            className: "w-full"
                        }
                    ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            title={template.title}
                            category={template.category}
                            description={template.description}
                            createdBy={template.createdBy}
                            date={template.date}
                            onDelete={() => console.log("Delete", template.id)}
                            onPreview={() => console.log("Preview", template.id)}
                            onUseTemplate={() => console.log("Use Template", template.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default QuoteLibrary;
