import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"

import logo           from "../assets/adminDasbord/Logo.svg"
import dashboardIcon  from "../assets/adminDasbord/Dashboard.svg"
import monitoringIcon from "../assets/adminDasbord/Monitoring.svg"
import billingIcon    from "../assets/adminDasbord/Billing.svg"
import smsIcon        from "../assets/adminDasbord/Chat.svg"
import leftIcon       from "../assets/adminDasbord/Left.svg"
import blackHome      from "../assets/AdminBilling/BlackHom.svg"
import blackUnit      from "../assets/AdminBilling/BlackUnit.svg"
import blackBill      from "../assets/AdminBilling/BlackBil.svg"
import BlackChat      from "../assets/Pesan/LogBlck.svg"
import Berhasil       from "../assets/beranda/IconLogout.svg"

// ─── Types ───────────────────────────────────────────────────────────────────

interface SideNavItemProps {
  to:          string
  icon:        string
  activeIcon?: string
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────

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

// ─── Logout Popup ─────────────────────────────────────────────────────────────

function LogoutPopup({
  onClose,
  onConfirm,
}: {
  onClose:   () => void
  onConfirm: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
      onClick={onClose}
    >
      <div
        className="w-[272px] rounded-[12px] bg-white shadow-xl px-6 pt-7 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <img
            src={Berhasil}
            alt="Logout"
            className="w-[65px] h-[65px] object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-[16px] font-bold text-[#1B2340]">
          Keluar dari Akun?
        </h2>

        {/* Description */}
        <p className="mt-4 text-center text-[12px] leading-[18px] text-[#8B93A7]">
          Anda akan keluar dari sesi saat ini dan perlu masuk kembali untuk mengakses akun Anda.
        </p>

        {/* Button Keluar */}
        <button
          onClick={onConfirm}
          className="mt-6 w-full h-[40px] rounded-[34px] text-white text-[14px] font-medium transition-all active:scale-[0.98]"
          style={{
            background:
              "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
            boxShadow:
              "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
          }}
        >
          Keluar
        </button>

        {/* Button Batal */}
        <button
          onClick={onClose}
          className="mt-3 w-full h-[40px] rounded-[34px] border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#1B2340] transition-all active:scale-[0.98]"
        >
          Batal
        </button>
      </div>
    </div>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function AdminLayout() {
  const navigate = useNavigate()
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="flex h-screen bg-[#F5F7FB] font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside
        className="shrink-0 flex flex-col items-center py-5 bg-[#EEF2F7] border-r border-gray-200/50"
        style={{ width: "103px" }}
      >

        {/* Logo */}
        <div className="flex items-center justify-center mb-5 shrink-0">
          <img src={logo} className="w-[44px] h-[44px] object-contain" alt="Aquora" />
        </div>

        {/* Divider */}
        <div className="w-[44px] h-[1px] bg-gray-300/50 mb-4" />

        {/* Main Nav */}
        <nav className="flex flex-col items-center gap-2 flex-1">
          <SideNavItem to="/admin"            icon={dashboardIcon}  activeIcon={blackHome} />
          <SideNavItem to="/admin/monitoring" icon={monitoringIcon} activeIcon={blackUnit} />
          <SideNavItem to="/admin/billing"    icon={billingIcon}    activeIcon={blackBill} />
        </nav>

        {/* Bottom — Chat + Logout */}
        <div className="flex flex-col items-center gap-2 mb-1">

          {/* Chat — active: BlackChat icon + background abu-abu */}
          <SideNavItem to="/admin/pesan" icon={smsIcon} activeIcon={BlackChat} />

          {/* Logout button */}
          <button
            onClick={() => setShowLogoutPopup(true)}
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

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="p-5 overflow-auto flex-1">
          <Outlet />
        </main>
      </div>

      {/* ── POPUP LOGOUT ── */}
      {showLogoutPopup && (
        <LogoutPopup
          onClose={() => setShowLogoutPopup(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}

    </div>
  )
}