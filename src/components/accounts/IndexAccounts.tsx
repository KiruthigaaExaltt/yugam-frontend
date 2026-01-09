import { useMemo, useState } from "react";
import Header from "./Header";
import HeaderCards from "./HeaderCards";
import NavBar from "./NavBar";
import Quotes from "./Quotes/Quotes";
import ContractStats from "./Quotes/ContractStats";
import RecuringInvoice from "./Quotes/RecuringInvoice";

const IndexAccounts = () => {
  const [activeTab, setActiveTab] = useState<string>("quotes");

  // normalize to lowercase + trim spaces for robust matching
  const normalizedTab = useMemo(
    () => (activeTab ?? "").toLowerCase().replace(/\s+/g, ""),
    [activeTab]
  );

  const showQuotes = normalizedTab === "quotes" || normalizedTab === "qoutes";
  const showContracts = normalizedTab === "contracts";
   const showInvoices = normalizedTab === "recurring-invoice";

  return (
    <>
      <Header />
      <HeaderCards />
      <NavBar activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="pt-6">
        {showQuotes && (
          <Quotes activeTab={activeTab} onTabClick={setActiveTab} />
        )}
        {showContracts && <ContractStats />}
        {showInvoices && <RecuringInvoice />}
      </div>
    </>
  );
};
export default IndexAccounts;