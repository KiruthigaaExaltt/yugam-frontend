import type { FC } from "react";

import "../../HOC/miniProfileNotificationCard/MiniProfileNotificationCard.css"; 
import MiniProfileNotificationCard from "../../HOC/miniProfileNotificationCard/MiniProfileNotificationCard";

const UserHeader: FC = () => {

  const applications = [
    {
      initials: "SC",
      name: "Good morning, Sarah!",
      role: "Monday, January 5, 2026",
      about: "You have 8 tasks and 0 meetings today",
      showAvatar: true,       
      showName: true,
      showRole: true,
      showInitials: true,
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

      <div>
      

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
              about={item.about}
              // statusColor={item.statusColor}
              avatarWidth="3.5rem"
              avatarHeight="3.5rem"
              showEye={false}
              showDelete={false}
              avatarPosition="right"
              backgroundColor="#ebfdf5"
            />
          );
        })}
      </div>
    

  );
};

export default UserHeader;