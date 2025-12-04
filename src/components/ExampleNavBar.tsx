import { useState } from "react";
import { Navbar, type NavItem } from "./HOC/navBar/NavBar";
 
const menuItems: NavItem[] = [
    { label: "Dashboard", route: "/dashboard" },
    { label: "Accounts", route: "/accounts" },
    { label: "Transactions", route: "/transactions" },
    { label: "Reports", route: "/reports" },
    { label: "Banking", route: "/banking" },
];
 
function ExampleNavbar() {
    const [active, setActive] = useState("Dashboard");
 
    return (
        <div>
            <Navbar
                items={menuItems}
                activeItem={active}
                onItemClick={(item) => setActive(item.label)}
                // minWidth="1em"
                // maxWidth="1200px"
                // height="3rem"
                // itemSpacing="1em"
            />
            <div style={{ padding: "20px" }}>
                <h2>Current Page: {active}</h2>
            </div>
        </div>
    );
}
 
export default ExampleNavbar;