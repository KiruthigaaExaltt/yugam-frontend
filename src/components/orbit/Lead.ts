export interface Lead {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    stage: "Qualified" | "New" | "Proposal" | "Converted" | "Contacted";
    status: "Active" | "Follow-up";
    source: string;
    value: string;
    date: string;
    initials: string;
    avatarBg: string;
}

export interface LeadsResponse {
    leads: Lead[];
    total: number;
}
