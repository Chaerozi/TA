import { Outlet, NavLink } from "react-router-dom"
import { useState, useRef, useEffect } from "react"

import logo         from "../assets/adminDasbord/Logo.svg"
import dashboardIcon from "../assets/adminDasbord/Dashboard.svg"
import monitoringIcon from "../assets/adminDasbord/Monitoring.svg"
import billingIcon   from "../assets/adminDasbord/Billing.svg"
import notifIcon     from "../assets/adminDasbord/Lonceng.svg"
import searchIcon    from "../assets/adminDasbord/Search.svg"
import arrowIcon     from "../assets/adminDasbord/line.svg"

const allMenuItems = [
  { label: "Dashboard",  path: "/admin" },
  { label: "Monitoring", path: "/admin/monitoring" },
  { label: "Billing",    path: "/admin/billing" },
]

const notifications = [
  { id: 1, title: "3 anomali terdeteksi",  desc: "Pemakaian unit 567GH8 melebihi batas", time: "2 menit lalu", unread: true  },
  { id: 2, title: "Tagihan jatuh tempo",   desc: "8 unit belum melakukan pembayaran",     time: "1 jam lalu",   unread: true  },
  { id: 3, title: "Unit baru terdaftar",   desc: "Unit 567GH9 berhasil didaftarkan",      time: "3 jam lalu",   unread: false },
]

export default function AdminLayout() {
  const [open, setOpen]               = useState(false)
  const [notifOpen, setNotifOpen]     = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocus, setSearchFocus] = useState(false)
  const [collapsed, setCollapsed]     = useState(false)
  /* mobile sidebar */
  const [mobileOpen, setMobileOpen]   = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const notifRef    = useRef<HTMLDivElement>(null)
  const searchRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false)
      if (notifRef.current    && !notifRef.current.contains(e.target as Node))    setNotifOpen(false)
      if (searchRef.current   && !searchRef.current.contains(e.target as Node))   setSearchFocus(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const searchResults = searchQuery.trim()
    ? allMenuItems.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="flex h-screen bg-[#F5F7FB] font-sans overflow-hidden">

      {/* ===== MOBILE OVERLAY ===== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-[72px]" : "w-[280px]"}
          bg-white py-5 flex flex-col border-r border-gray-100 shrink-0
          transition-all duration-300 h-full
        `}
        style={{ paddingLeft: collapsed ? "12px" : "16px", paddingRight: collapsed ? "12px" : "16px" }}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-7 shrink-0" />
            {!collapsed && (
              <h1 className="text-[17px] font-semibold text-gray-700 whitespace-nowrap">Aquora</h1>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-[20px] h-[24px] flex items-center justify-center bg-white border border-gray-200 rounded-[8px] hover:bg-gray-50 transition shrink-0 hidden lg:flex"
          >
            <img
              src={arrowIcon}
              className={`w-[8px] opacity-50 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* DIVIDER */}
        <div className="h-[1px] bg-gray-100 mb-5" />

        {/* MENU */}
        {!collapsed && (
          <p className="text-[11px] text-gray-400 mb-3 uppercase tracking-wide">Menu</p>
        )}

        <nav className="space-y-2">
          <NavItem to="/admin"            icon={dashboardIcon}  label="Dashboard"  collapsed={collapsed} />
          <NavItem to="/admin/monitoring" icon={monitoringIcon} label="Monitoring" collapsed={collapsed} />
          <NavItem to="/admin/billing"    icon={billingIcon}    label="Billing"    collapsed={collapsed} />
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ================= TOPBAR ================= */}
        <header className="bg-white px-4 md:px-6 py-3 flex justify-between items-center border-b border-gray-100 shrink-0 relative z-40 gap-3">

          {/* HAMBURGER — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-gray-100 transition shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-600">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* SEARCH */}
          <div className="relative flex-1 max-w-[300px]" ref={searchRef}>
            <div
              className={`flex items-center bg-gray-100 px-3 h-[38px] rounded-xl gap-2 transition w-full ${
                searchFocus ? "ring-2 ring-blue-200" : ""
              }`}
            >
              <img src={searchIcon} className="w-4 opacity-60 shrink-0" />
              <input
                type="text"
                placeholder="Search anythings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                className="bg-transparent outline-none text-[13px] w-full text-gray-600 placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 text-[16px] leading-none">
                  ×
                </button>
              )}
            </div>

            {searchFocus && searchQuery && (
              <div className="absolute top-[44px] left-0 w-full bg-white rounded-[12px] shadow-lg border border-gray-100 p-2 z-50">
                {searchResults.length > 0 ? searchResults.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => { setSearchQuery(""); setSearchFocus(false) }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13px] text-gray-700 hover:bg-gray-100 transition"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-4 h-4 shrink-0">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    {item.label}
                  </NavLink>
                )) : (
                  <p className="text-[13px] text-gray-400 px-3 py-2.5">Tidak ada hasil untuk "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 shrink-0">

            {/* NOTIF */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition relative"
              >
                <img src={notifIcon} className="w-[16px]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-[16px] h-[16px] bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-3 w-[300px] bg-white rounded-[16px] shadow-lg border border-gray-100 z-50 overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
                    <p className="text-[14px] font-semibold text-gray-800">Notifikasi</p>
                    <span className="text-[11px] text-blue-500 font-medium cursor-pointer hover:underline">
                      Tandai semua dibaca
                    </span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer ${notif.unread ? "bg-blue-50/40" : ""}`}
                      >
                        <div className="mt-1.5 shrink-0">
                          <div className={`w-2 h-2 rounded-full ${notif.unread ? "bg-blue-500" : "bg-gray-300"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-gray-800 leading-tight">{notif.title}</p>
                          <p className="text-[12px] text-gray-500 mt-0.5 leading-tight truncate">{notif.desc}</p>
                          <p className="text-[11px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-gray-100 text-center">
                    <span className="text-[12px] text-blue-500 font-medium cursor-pointer hover:underline">
                      Lihat semua notifikasi
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <div className="w-[1px] h-7 bg-gray-100 hidden sm:block" />

            {/* PROFILE */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                  alt="avatar"
                />
                <div className="hidden sm:block">
                  <p className="text-[13px] font-semibold text-gray-800 leading-tight whitespace-nowrap">Esther Howard</p>
                  <p className="text-[11px] text-gray-400">Admin</p>
                </div>
                <button className="w-[22px] h-[20px] flex items-center justify-center bg-white border border-gray-200 rounded-[6px] hover:bg-gray-50 transition hidden sm:flex">
                  <img
                    src={arrowIcon}
                    className={`w-[8px] opacity-50 transition-transform ${open ? "rotate-90" : "rotate-[270deg]"}`}
                  />
                </button>
              </div>

              {open && (
                <div className="absolute right-0 mt-3 w-[140px] bg-white rounded-[12px] shadow-md border border-gray-100 p-2 z-50">
                  <button className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg">Settings</button>
                  <button className="w-full text-left px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 rounded-lg">Logout</button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="p-4 md:p-5 overflow-auto flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

/* ================= NAV ITEM ================= */
function NavItem({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string
  icon: string
  label: string
  collapsed?: boolean
}) {
  return (
    <NavLink
  to={to}
  end={to === "/admin"}
>
  {({ isActive }) => (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center px-0" : "gap-2 px-2"
      } h-[40px] rounded-[12px] text-[16px] font-medium transition ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
      }`}
    >
     <img
  src={icon}
  className={`w-5 shrink-0 transition ${
    isActive
      ? "brightness-0 saturate-100 opacity-100"
      : "opacity-40"
  }`}
/>

      {!collapsed && <span className="truncate">{label}</span>}
    </div>
  )}
</NavLink>
  )
}