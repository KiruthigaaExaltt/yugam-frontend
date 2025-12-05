// src/Sidecards/NotificationCard.tsx
import type { FC, ReactNode } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
 
export interface NotificationCardProps {
  initials?: string;
  name: string;
  role: string;
  status?: string;
  statusColor?: string;
  logo?: ReactNode;
  about?: string;
  onDelete?: () => void;
  width?: string;
  height?: string;
  avatarWidth?: string;
  avatarHeight?: string;
  showEye?: boolean;
  showDelete?: boolean;
  avatar?: boolean; // controls avatar/logo rendering
}
 
const MiniProfileNotificationCard: FC<NotificationCardProps> = ({
  initials,
  name,
  role,
  status,
  // statusColor,
  logo,
  about,
  onDelete,
  width = "100%",
  height = "auto",
  avatarWidth = "3.5rem",
  avatarHeight = "3.5rem",
  showEye = true,
  showDelete = true,
  avatar,
}) => {
  return (
    <>
    <div className="item-row" style={{ width, height }}>
      {avatar && (
        logo ? (
          <div
            className="logo-icon"
            style={{
              width: avatarWidth,
              height: avatarHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            {logo}
          </div>
        ) : (
          <div className="avatar" style={{ width: avatarWidth, height: avatarHeight }}>
            {initials}
          </div>
        )
      )}
 
      <div className="text-block">
        <h4>{name}</h4>
        <p>{role}</p>
        {about && <small>{about}</small>}
      </div>
 
      <div className="spacer" />
 
      {status && (
         <span className="status-chip" >
          {status}
        </span>
      )}
 
      {showEye && <FaRegEye className="eye-icon" />}
      {showDelete && <MdDelete className="delete-icon" onClick={onDelete} />}
    </div>
    </>
  );
};
 
export default MiniProfileNotificationCard;
 
 