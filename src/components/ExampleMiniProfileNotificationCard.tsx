import type { FC } from "react";
import { Card } from "primereact/card";

import { FaReact, FaApple } from "react-icons/fa";
import "../components/HOC/miniProfileNotificationCard/MiniProfileNotificationCard.css";
import MiniProfileNotificationCard from "./HOC/miniProfileNotificationCard/MiniProfileNotificationCard";

const ExampleMiniProfileNotificationCard: FC = () => {
  /* -------------------------------------------
      APPLICATION DATA
     (Display rules included per item)
  --------------------------------------------*/
  const applications = [
    {
      initials: "SC",
      name: "Sarah Chen",
      role: "Senior React Developer",
      // statusColor: "#cfe6ff",

      // Display control (PER CARD)
      showAvatar: false,        // show initials avatar
      showLogo: true,         // show logo instead of avatar
      showName: true,
      showRole: true,
      showInitials: true,

      logo: <FaReact size="2.4rem" />,
    },
    {
      initials: "MR",
      name: "Michael Rodriguez",
      role: "Product Manager",
      statusColor: "#d6eaff",

      // Display control (PER CARD)
      showAvatar: false,
      showLogo: true,
      showName: true,
      showRole: true,
      showInitials: false,

      logo: <FaApple size="2.4rem" />,
    },
  ];

  /* -------------------------------------------
         LOGIC PER CARD
  --------------------------------------------*/
  const getCardVisuals = (item: any) => {
    if (item.showAvatar) {
      return {
        avatar: true,
        logo: undefined,
        initials: item.showInitials ? item.initials : undefined,
      };
    }

    if (item.showLogo) {
      return {
        avatar: true,
        logo: item.logo,
        initials: undefined,
      };
    }

    return {
      avatar: false,
      logo: undefined,
      initials: undefined,
    };
  };

  return (

    <Card className="pro-custom-card">
      <div>
        <h3 className="pro-card-title">Recent Applications</h3>

        {applications.map((item, index) => {
          const { avatar, logo, initials } = getCardVisuals(item);

          return (
            <MiniProfileNotificationCard
              key={index}
              avatar={avatar}
              logo={logo}
              initials={initials}
              name={item.showName ? item.name : ""}
              role={item.showRole ? item.role : ""}
              // statusColor={item.statusColor}
              avatarWidth="3.5rem"
              avatarHeight="3.5rem"
            />
          );
        })}
      </div>
    </Card>

  );
};

export default ExampleMiniProfileNotificationCard;