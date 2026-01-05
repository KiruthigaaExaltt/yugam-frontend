import React from "react";
import SingleLineCard from "../../HOC/singlelineCard/SingleLineCard";

const PricingCard: React.FC = () => {
  return (
    <div >
      <SingleLineCard
        items={[
          {
            label: (
              <div>
                <div className="font-semibold text-lg">Professional Plan</div>
                <div className="text-sm text-gray-500">
                  Advanced features for growing agencies
                </div>
              </div>
            ),
            value: (
              <div className="text-right">
                <div className="font-semibold text-lg">$99/month</div>
                <div className="text-sm text-gray-500">25 seats included</div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PricingCard;
