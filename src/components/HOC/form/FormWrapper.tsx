// FormWrapper.tsx
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormWrapper({
  children,
  onSubmit,
  schema,
  defaultValues = {},
}: any) {

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
     mode: "onChange",          // <--- Important
    reValidateMode: "onChange" // <--- Important
  });

  return (
    <FormProvider {...methods}>
        <div className="max-w-2xl mx-auto p-2">
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
      </div>
    </FormProvider>
  );
}
