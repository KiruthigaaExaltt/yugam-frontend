import { useState } from "react";
import FilterBar from "../HOC/filterbar/FilterBar";
import PageHeader from "../HOC/pageHeader/PageHeader";
import { FiPlus } from "react-icons/fi";

const QuoteLibrary = () => {
    const [industry, setIndustry] = useState<string | null>(null);

    return (
        <>
            <PageHeader
                title="Quote Library & Templates"
                subtitle="Manage reusable quote templates for different industries"
                actions={[
                    {
                        label: "Create New Template",
                        icon: <FiPlus size={16} />,
                        variant: "primary",
                        onClick: () => console.log(true),
                    },
                ]}
            />
            <div className="space-y-6 mt-3">
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
                            ],
                            placeholder: "Filter by industry",
                            className: "w-full"
                        }
                    ]}
                />
            </div>
        </>
    );
};
export default QuoteLibrary;
