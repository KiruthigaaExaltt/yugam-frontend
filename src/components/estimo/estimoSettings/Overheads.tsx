import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFInput } from "../../HOC/form/RHFFields";
import { Button } from "primereact/button";
import { Save } from "lucide-react";

const schema = yup.object().shape({
  margin: yup.string().required("Margin is required"),
  tax: yup.string().required("Tax is required"),
  wastage: yup.string().required("Wastage is required"),
  leadTime: yup.string().required("Lead time is required"),
});

const Overheads = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      margin: "15",
      tax: "18",
      wastage: "2",
      leadTime: "7",
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log("Saving overheads:", data);
  };

  return (
    <div className="mt-4 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        Overhead Configuration
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <RHFInput
              name="margin"
              label="Default Margin %"
              vertical={true}
              placeholder="15"
              className="bg-[#F3F4F6] border-none! rounded-lg! px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
            />
            <RHFInput
              name="tax"
              label="Default Tax %"
              vertical={true}
              placeholder="18"
              className="bg-[#F3F4F6] border-none! rounded-lg! px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
            />
            <RHFInput
              name="wastage"
              label="Default Wastage %"
              vertical={true}
              placeholder="2"
              className="bg-[#F3F4F6] border-none! rounded-lg! px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
            />
            <RHFInput
              name="leadTime"
              label="Default Lead Time (days)"
              vertical={true}
              placeholder="7"
              className="bg-[#F3F4F6] border-none! rounded-lg! px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-(--primary-color)"
            />
          </div>

          <div className="pt-4">
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

export default Overheads;