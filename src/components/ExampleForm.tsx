// ExampleForm.tsx
import * as yup from "yup";
import FormWrapper from "./HOC/form/FormWrapper";
import { RCalendar, RCheckbox, RDropdown, RFileUpload, RHFInput, RMultiSelect, RQuillEditor, RRadio } from "./HOC/form/RHFFields";


// IMPORTANT: For dates, use `yup.date()` instead of `string()`
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),

  country: yup.string().required("Select a country"),

  dob: yup
    .date()
    .typeError("Choose a valid date")
    .required("Choose date"),

  gender: yup.string().required("Select your gender"),

  terms: yup.bool().oneOf([true], "Accept terms"),

  about: yup.string().required("Type something about yourself"),
});

export default function ExampleForm() {
  const handleSubmit = (data: any) => {
    console.log("FORM SUBMITTED:", data);
  };

  return (
    <FormWrapper onSubmit={handleSubmit} schema={schema}>
      <RHFInput name="email" label="Email" />

      <RHFInput name="password" label="Password" type="password" />

      <RDropdown
        name="country"
        label="Country"
        options={[
          { label: "India", value: "IN" },
          { label: "USA", value: "US" },
        ]}
      />

      <RCalendar name="dob" label="Date of Birth" />

      <RRadio
        name="gender"
        label="Gender"
        options={[
          { label: "Male", value: "M" },
          { label: "Female", value: "F" },
        ]}
      />

      <RMultiSelect
        name="hobbies"
        label="Select Hobbies"
        options={[
          { label: "Reading", value: "reading" },
          { label: "Traveling", value: "traveling" },
          { label: "Gaming", value: "gaming" },
          { label: "Music", value: "music" },
        ]}
      />

      <RCheckbox name="terms" label="I accept terms & conditions" />

      <RFileUpload name="resume" label="Upload Resume" />

      <RQuillEditor name="about" label="About Yourself" />

      <button type="submit" className="p-button p-component mt-4">
        Submit
      </button>
    </FormWrapper>
  );
}
