import React from "react";
import "./Navbar.css";
 
export interface NavItem {
    label: string;
    route: string;
}
 
interface NavbarProps {
    items: NavItem[];
    activeItem: string;
    onItemClick?: (item: NavItem) => void;
    minWidth?: string;
    maxWidth?: string;
    height?: string;
    itemSpacing?: string;
}
 
export const Navbar: React.FC<NavbarProps> = ({
    items,
    activeItem,
    onItemClick,
    minWidth = "auto",
    maxWidth = "100%",
    height = "auto",
    // itemSpacing = "24px",
}) => {
    return (
        <div className="nav-wrapper">
            <div
                className="nav-container"
                style={{
                    minWidth,
                    maxWidth,
                    height,                  
                }}
            >
                {items.map((item) => (
                    <div
                        key={item.label}
                        className={`nav-item ${activeItem === item.label ? "active" : ""}`}
                        onClick={() => onItemClick && onItemClick(item)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};