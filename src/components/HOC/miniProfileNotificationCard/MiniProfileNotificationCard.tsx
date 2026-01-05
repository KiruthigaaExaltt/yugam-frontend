// src/Sidecards/NotificationCard.tsx
import type { FC, ReactNode } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiMail, FiPhone } from "react-icons/fi";

export interface NotificationCardProps {
  initials?: string;
  name: string;
  role: string;
  status?: string;
  logo?: ReactNode;
  about?: string;

  onDelete?: () => void;
  onMailClick?: () => void;
  onPhoneClick?: () => void;

  width?: string;
  height?: string;
  avatarWidth?: string;
  avatarHeight?: string;

  showEye?: boolean;
  showDelete?: boolean;
  showMail?: boolean;
  showPhone?: boolean;

  avatar?: boolean;
  avatarPosition?: "left" | "right";
  backgroundColor?: string;
}

const MiniProfileNotificationCard: FC<NotificationCardProps> = ({
  initials,
  name,
  role,
  status,
  logo,
  about,
  onDelete,
  onMailClick,
  onPhoneClick,
  width = "100%",
  height = "auto",
  avatarWidth = "3.5rem",
  avatarHeight = "3.5rem",
  showEye = true,
  showDelete = true,
  showMail = false,
  showPhone = false,
  avatar,
  avatarPosition = "left",
  backgroundColor,
}) => {
  const avatarContent = avatar ? (
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
      <div
        className="avatar"
        style={{ width: avatarWidth, height: avatarHeight }}
      >
        {initials}
      </div>
    )
  ) : null;

  return (
    <div className="item-row" style={{ width, height, backgroundColor }}>
      {avatarPosition === "left" && avatarContent}

      <div className="text-block">
        <h4>{name}</h4>
        <p>{role}</p>
        {about && <small>{about}</small>}
      </div>

      <div className="spacer" />

      {avatarPosition === "right" && avatarContent}

      {status && <span className="status-chip">{status}</span>}

      <div className="flex items-center gap-3">
        {showEye && <FaRegEye className="cursor-pointer" />}
        {showDelete && (
          <MdDelete className="cursor-pointer" onClick={onDelete} />
        )}
        {showMail && (
          <FiMail className="cursor-pointer" onClick={onMailClick} />
        )}
        {showPhone && (
          <FiPhone className="cursor-pointer" onClick={onPhoneClick} />
        )}
      </div>
    </div>
  );
};


export default MiniProfileNotificationCard;
