import type { Page } from "../App";

interface SidebarProps {
    activePage: Page;
    onPageChange: (page: Page) => void;
}

const menuItems: { name: Page; label: string; icon: string }[] = [
    { name: "Dashboard", label: "Dashboard", icon: "⌂" },
    { name: "Animals", label: "Animals", icon: "🐾" },
    { name: "Adoptions", label: "Adoptions", icon: "♡" },
    { name: "Functions", label: "Database Functions", icon: "▤" },
];

function Sidebar({ activePage, onPageChange }: SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span className="brand-icon">🐾</span>
                <div>
                    <h2>Happy Paws</h2>
                    <p>Animal Shelter</p>
                </div>
            </div>

            <p className="sidebar-label">MENU</p>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.name}
                        className={`nav-item ${activePage === item.name ? "active" : ""}`}
                        onClick={() => onPageChange(item.name)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <p>Animal Shelter Management</p>
                <span>Management System</span>
            </div>
        </aside>
    );
}

export default Sidebar;
