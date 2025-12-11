import { Button } from "primereact/button";
import { Toaster } from "sonner";
import { primeToast } from "./customHooks/usePrimeToast";


export default function ExampleSonnerDemo() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Button 
        label="Save"
        onClick={() => primeToast("Saved successfully", "success")} 
      />

      <Button 
        label="Error"
        severity="danger"
        className="ml-3"
        onClick={() => primeToast("Something went wrong!", "error")} 
      />

      <Button 
        label="Info"
        severity="info"
        className="ml-3"
        onClick={() => primeToast("Information message", "info")} 
      />
    </>
  );
}
