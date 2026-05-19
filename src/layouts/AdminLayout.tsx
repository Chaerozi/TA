import { Outlet, NavLink } from "react-router-dom"

import logo           from "../assets/adminDasbord/Logo.svg"
import dashboardIcon  from "../assets/adminDasbord/Dashboard.svg"
import monitoringIcon from "../assets/adminDasbord/Monitoring.svg"
import billingIcon    from "../assets/adminDasbord/Billing.svg"
import smsIcon        from "../assets/adminDasbord/Chat.svg"
import leftIcon       from "../assets/adminDasbord/Left.svg"
import blackHome      from "../assets/AdminBilling/BlackHom.svg"
import blackUnit      from "../assets/AdminBilling/BlackUnit.svg"
import blackBill      from "../assets/AdminBilling/BlackBil.svg"

// ─── types ────────────────────────────────────────────────────────────────────

interface SideNavItemProps {
  to:          string
  icon:        string
  activeIcon?: string
}

// ─── nav item ─────────────────────────────────────────────────────────────────

function SideNavItem({ to, icon, activeIcon }: SideNavItemProps) {
  return (
    <NavLink to={to} end={to === "/admin"}>
      {({ isActive }) => (
        <div
          className={`
            flex items-center justify-center
            rounded-[14px] shrink-0 transition-all
            ${isActive ? "bg-white shadow-sm" : "hover:bg-white/60"}
          `}
          style={{ width: "62px", height: "62px" }}
        >
          <img
            src={isActive && activeIcon ? activeIcon : icon}
            className={`
              object-contain transition-all
              ${isActive ? "w-[26px] h-[26px] opacity-100" : "w-[24px] h-[24px] opacity-45"}
            `}
            alt=""
          />
        </div>
      )}
    </NavLink>
  )
}

// ─── layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#F5F7FB] font-sans overflow-hidden">

      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <aside
        className="shrink-0 flex flex-col items-center py-5 bg-[#EEF2F7] border-r border-gray-200/50"
        style={{ width: "103px" }}
      >

        {/* LOGO */}
        <div className="flex items-center justify-center mb-5 shrink-0">
          <img src={logo} className="w-[44px] h-[44px] object-contain" alt="Aquora" />
        </div>

        {/* DIVIDER */}
        <div className="w-[44px] h-[1px] bg-gray-300/50 mb-4" />

        {/* MAIN NAV */}
        <nav className="flex flex-col items-center gap-2 flex-1">
          <SideNavItem to="/admin"            icon={dashboardIcon}  activeIcon={blackHome} />
          <SideNavItem to="/admin/monitoring" icon={monitoringIcon} activeIcon={blackUnit} />
          <SideNavItem to="/admin/billing"    icon={billingIcon}    activeIcon={blackBill} />
        </nav>

        {/* BOTTOM — Chat + Logout */}
        <div className="flex flex-col items-center gap-2 mb-1">

          <SideNavItem to="/admin/chat" icon={smsIcon} />

          {/* LOGOUT */}
          <button
            className="flex items-center justify-center rounded-[14px] transition hover:opacity-90 active:scale-95 shrink-0"
            style={{
              width: "44px",
              height: "44px",
              background: "linear-gradient(180deg, #F87171 0%, #EF4444 100%)",
            }}
          >
            <img src={leftIcon} className="w-5 brightness-0 invert" alt="logout" />
          </button>

        </div>

      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="p-5 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  )
}