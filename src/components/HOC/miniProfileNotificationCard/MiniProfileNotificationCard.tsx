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
  avatarBgColor?: string;
  isCompact?: boolean;
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
  avatarBgColor,
  isCompact = false,
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
        style={{ width: avatarWidth, height: avatarHeight, backgroundColor: avatarBgColor }}
      >
        {initials}
      </div>
    )
  ) : null;

  return (
    <div 
      className={`item-row ${isCompact ? 'compact-row' : ''}`} 
      style={{ width, height, backgroundColor: isCompact ? 'transparent' : backgroundColor }}
    >
      {avatarPosition === "left" && avatarContent}

      <div className="text-block">
        <h4 style={{ fontSize: isCompact ? '13px' : 'inherit' }}>{name}</h4>
        <p style={{ fontSize: isCompact ? '11px' : 'inherit' }}>{role}</p>
        {about && <small>{about}</small>}
      </div>

      <div className="spacer" />

      {avatarPosition === "right" && avatarContent}

      {status && <span className="status-chip">{status}</span>}

      <div className="flex items-center gap-3 ml-2">
        {showPhone && (
          <FiPhone className="cursor-pointer text-gray-400 hover:text-emerald-500" size={16} onClick={onPhoneClick} />
        )}
        {showMail && (
          <FiMail className="cursor-pointer text-gray-400 hover:text-emerald-500" size={16} onClick={onMailClick} />
        )}
        {showEye && <FaRegEye className="cursor-pointer text-gray-400" />}
        {showDelete && (
          <MdDelete className="cursor-pointer text-gray-400" onClick={onDelete} />
        )}
      </div>
    </div>
  );
};


export default MiniProfileNotificationCard;
