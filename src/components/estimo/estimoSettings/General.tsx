import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFInput, RDropdown, RSwitch } from "../../HOC/form/RHFFields";
import { Button } from "primereact/button";
import { Save } from "lucide-react";

const schema = yup.object().shape({
    prefix: yup.string().required("Prefix is required"),
    currency: yup.string().required("Currency is required"),
    validity: yup.string().required("Validity is required"),
    autoSave: yup.boolean(),
    emailNotifications: yup.boolean(),
});

const General = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            prefix: "EST",
            currency: "INR",
            validity: "30",
            autoSave: true,
            emailNotifications: true,
        },
        mode: "onChange",
    });

    const onSubmit = (data: any) => {
        console.log("Saving General Settings:", data);
    };

    const currencyOptions = [
        { label: "INR (₹)", value: "INR" },
        { label: "USD ($)", value: "USD" },
        { label: "EUR (€)", value: "EUR" },
        { label: "GBP (£)", value: "GBP" },
    ];

    return (
        <div className="mt-4 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-8">
                General Settings
            </h2>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-6 max-w-4xl">
                        <RHFInput
                            name="prefix"
                            label="Quote Number Prefix"
                            vertical={true}
                            placeholder="EST"
                            className="bg-[#F3F4F6] border-none! rounded-lg! px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
                        />

                        <RDropdown
                            name="currency"
                            label="Default Currency"
                            vertical={true}
                            options={currencyOptions}
                            className="bg-[#F3F4F6] border-none! rounded-lg! text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
                        />

                        <RHFInput
                            name="validity"
                            label="Default Validity (days)"
                            vertical={true}
                            placeholder="30"
                            className="bg-[#F3F4F6] border-none! rounded-lg! px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
                        />

                        <div className="space-y-4 pt-2">
                            <RSwitch
                                name="autoSave"
                                label="Auto-save drafts"
                                vertical={true}
                            />
                            <RSwitch
                                name="emailNotifications"
                                label="Email notifications"
                                vertical={true}
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button
                            type="submit"
                            label="Save Settings"
                            icon={<Save size={18} className="mr-2" />}
                            className="bg-(--primary-color)! border-none! px-6 py-2.5 text-white hover:opacity-90 transition-all rounded-lg flex items-center font-medium shadow-sm focus:ring-0"
                            style={{ borderRadius: "var(--border-radius)" }}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default General;