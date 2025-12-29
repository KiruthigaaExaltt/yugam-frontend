
import * as yup from "yup";
import FormWrapper from "../HOC/form/FormWrapper";
import { RDropdown, RHFInput } from "../HOC/form/RHFFields";
import { Button } from "primereact/button";

const productSchema = yup.object({
  title: yup.string().required("Product name is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
})

interface ProductFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void; // 👈 add this
}

const ProductForm = ({ onSubmit, onCancel }: ProductFormProps) => {
  return (
    <FormWrapper
      schema={productSchema}
      onSubmit={onSubmit}
      defaultValues={{
        title: "",
        brand: "",
        category: "",
        price: "",
      }}
    >
      <RHFInput name="title" label="Product Name" />
      <RHFInput name="brand" label="Brand" />
      <RDropdown
        name="category"
        label="Category"
        options={[
          { label: "Electronics", value: "electronics" },
          { label: "Fashion", value: "fashion" },
          { label: "Grocery", value: "grocery" },
        ]}
      />
      <RHFInput name="price" label="Price" type="number" />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" label="Cancel" outlined onClick={onCancel} />
        <Button type="submit" label="Submit" />
      </div>
    </FormWrapper>
  );
};

export default ProductForm;

