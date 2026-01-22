
import { Button } from "primereact/button";

const NewQuote = () => {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-center text-gray-700 h-[60vh]">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <i className="pi pi-calculator text-4xl text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Create New Quote</h2>
            <p className="text-gray-500 mb-6 font-normal">
                Use our comprehensive quote builder with BOM/BOQ capabilities
            </p>
            <Button
                label="Start New Quote"
                icon="pi pi-plus"
                className="p-button-rounded border-none px-6 py-3 font-semibold text-white"
                style={{ backgroundColor: "#009688" }}
            />
        </div>
    );
};

export default NewQuote;
