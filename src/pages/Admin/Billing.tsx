import { useState, useRef, useEffect } from "react"

import notifIcon from "../../assets/adminDasbord/Lonceng.svg"
import totalIcon from "../../assets/adminDasbord/Total.svg"
import bayar from "../../assets/AdminBilling/Paid.svg"
import Belum from "../../assets/AdminBilling/Wait.svg"
import Lewat from "../../assets/AdminBilling/JatuhTempo.svg"

// ─── DATA ────────────────────────────────────────────────────────────────────

const BILLING_DATA = [
  {
    id: "INV-2602-001",
    unit: "Unit 101",
    email: "christianbryan263@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Lunas",
    tglBayar: "15 Apr 2026",
  },
  {
    id: "INV-2602-002",
    unit: "Unit 102",
    email: "sariindah@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Lunas",
    tglBayar: "12 Apr 2026",
  },
  {
    id: "INV-2602-003",
    unit: "Unit 103",
    email: "bagusprasetyo@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Belum Dibayar",
    tglBayar: "-",
  },
  {
    id: "INV-2602-004",
    unit: "Unit 104",
    email: "dewirahayu@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Lunas",
    tglBayar: "18 Apr 2026",
  },
  {
    id: "INV-2602-005",
    unit: "Unit 105",
    email: "rizkyfirmansyah@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Lunas",
    tglBayar: "14 Apr 2026",
  },
  {
    id: "INV-2602-006",
    unit: "Unit 106",
    email: "annisaputri@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Belum Dibayar",
    tglBayar: "-",
  },
  {
    id: "INV-2602-007",
    unit: "Unit 107",
    email: "hendrawijaya@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Lunas",
    tglBayar: "10 Apr 2026",
  },
  {
    id: "INV-2602-008",
    unit: "Unit 108",
    email: "mayasari@gmail.com",
    terbit: "5 Apr 2026",
    jatuhTempo: "20 Apr 2026",
    status: "Belum Dibayar",
    tglBayar: "-",
  },
]

const STAT_CARDS = [
  {
    label: "Total Tagihan Terbit",
    value: "Rp 1.585.000",
    sub: "8 faktur",
    color: "#344054",
    iconBg: "#F2F4F7",
    icon: totalIcon,
  },
  {
    label: "Sudah Terbayar",
    value: "Rp 557.000",
    sub: "3 unit lunas",
    color: "#48A65A",
    iconBg: "#D9F2DF",
    icon: bayar,
  },
  {
    label: "Belum Terbayar",
    value: "Rp 650.000",
    sub: "3 unit menunggak",
    color: "#E79B23",
    iconBg: "#FCE8C4",
    icon: Belum,
  },
  {
    label: "Lewat Jatuh Tempo",
    value: "Rp 378.000",
    sub: "2 unit overdue",
    color: "#C9372C",
    iconBg: "#F9E0DF",
    icon: Lewat,
  },
]

const TABLE_HEADERS = [
  "ID Faktur",
  "Unit & Penghuni",
  "Tagihan Terbit",
  "Jatuh Tempo",
  "Pembayaran",
  "Tgl Bayar",
]

const STATUS_OPTIONS = ["Semua Status", "Lunas", "Belum Dibayar"] as const

const PAGE_SIZE = 5

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value: string
  sub: string
  color: string
  iconBg: string
  icon: string
}

interface StatusBadgeProps {
  status: string
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color, iconBg, icon }: StatCardProps) {
  return (
    <div className="h-[176px] rounded-[24px] border border-[#EAECF0] bg-white px-5 py-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div>
        <p className="text-[16px] font-medium mb-4" style={{ color }}>
          {label}
        </p>
        <h2 className="text-[28px] font-semibold leading-none" style={{ color }}>
          {value}
        </h2>
        <p className="text-[14px] text-[#98A2B3] mt-5">{sub}</p>
      </div>
      <div
        className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <img src={icon} className="w-[24px] h-[24px]" alt={label} />
      </div>
    </div>
  )
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles =
    status === "Lunas"
      ? "bg-[#D9F0A3] text-[#5F7A00]"
      : "bg-[#FEE4E2] text-[#F04438]"

  return (
    <span
      className={`inline-flex items-center justify-center w-fit px-[12px] h-[26px] rounded-full text-[12px] font-medium whitespace-nowrap ${styles}`}
    >
      {status}
    </span>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Billing() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("Semua Status")
  const [statusOpen, setStatusOpen] = useState(false)
  const [page, setPage] = useState(1)

  const statusRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) {
        setStatusOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter data
  const filtered = BILLING_DATA.filter(({ unit, email, id, status }) => {
    const q = search.toLowerCase()
    const matchSearch =
      unit.toLowerCase().includes(q) ||
      email.toLowerCase().includes(q) ||
      id.toLowerCase().includes(q)
    const matchStatus =
      statusFilter === "Semua Status" || status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentRows = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-[215px]">
          <p className="text-[24px] leading-[33px] font-normal text-[#98A2B3] tracking-[-0.02em]">
            Smart Water Meter
          </p>
          <h1 className="text-[32px] leading-[33px] font-medium text-[#344054] tracking-[-0.03em] mt-[2px]">
            Riwayat Billings
          </h1>
        </div>

        <div className="w-[302px] h-[68px] rounded-full border border-[#EAECF0] bg-white px-[14px] flex items-center justify-between shadow-[0_1px_2px_rgba(16,24,40,0.05)] shrink-0">
          <div className="flex items-center gap-[14px]">
            <div className="w-[52px] h-[52px] rounded-full bg-[#F2F4F7] flex items-center justify-center">
              <img
                src={notifIcon}
                className="w-[24px] h-[24px] opacity-60"
                alt="notification"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[20px] leading-[22px] font-medium text-[#344054]">
                Hi, Admin
              </p>
              <p className="mt-[6px] text-[14px] leading-[22px] font-normal text-[#98A2B3]">
                Welcome to Aquora
              </p>
            </div>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-[18px] h-[18px] text-[#98A2B3]"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* ── STAT CARDS ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── COLLECTION PROGRESS ────────────────────────────────────────────── */}
      <div className="w-full rounded-[28px] border border-[#EAECF0] bg-white px-6 sm:px-9 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-7">
          <div>
            <h3 className="text-[18px] font-medium text-[#344054] leading-[28px]">
              Rekap Collection Period
            </h3>
            <p className="text-[16px] text-[#98A2B3] mt-[2px]">
              Februari 2026
            </p>
          </div>
          <p className="text-[16px] font-medium text-[#2481FF]">
            35% terkumpul
          </p>
        </div>

        <div className="w-full h-[14px] rounded-full bg-[#F2F4F7] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: "35%",
              background: "linear-gradient(90deg, #4DA1FF 0%, #002BFF 100%)",
            }}
          />
        </div>

        <div className="flex justify-end mt-4">
          <p className="text-[14px] sm:text-[16px] text-[#98A2B3]">
            Rp 557.000 / Rp 1.585.000
          </p>
        </div>
      </div>

      {/* ── FILTER + TABLE + PAGINATION ────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        {/* Filter row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* SEARCH */}
          <div className="flex-1 h-[50px] rounded-full border border-[#EAECF0] bg-white px-5 flex items-center gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-[18px] h-[18px] text-[#98A2B3] shrink-0"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L17 17" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Cari unit, email penghuni..."
              className="w-full bg-transparent outline-none text-[14px] text-[#344054] placeholder:text-[#98A2B3]"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("")
                  setPage(1)
                }}
                className="text-[#98A2B3] hover:text-[#344054] text-[18px] leading-none shrink-0 transition"
              >
                ×
              </button>
            )}
          </div>

          {/* STATUS DROPDOWN */}
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => setStatusOpen((o) => !o)}
              className="w-full sm:w-[190px] h-[50px] rounded-full border border-[#EAECF0] bg-white px-5 flex items-center justify-between gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#F9FAFB] transition"
            >
              <span className="text-[14px] text-[#344054]">
                {statusFilter}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`w-[16px] h-[16px] text-[#98A2B3] shrink-0 transition-transform ${
                  statusOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {statusOpen && (
              <div className="absolute right-0 top-[56px] w-full bg-white rounded-[16px] shadow-lg border border-[#EAECF0] p-1.5 z-50">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt)
                      setStatusOpen(false)
                      setPage(1)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] rounded-[12px] transition font-medium ${
                      statusFilter === opt
                        ? "bg-blue-50 text-blue-600"
                        : "text-[#344054] hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="w-full bg-white rounded-[24px] border border-[#EAECF0] overflow-hidden shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          {/* Desktop view */}
          <div className="hidden lg:block">
            {/* Header */}
            <div className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr_1fr_60px] px-12 py-6 border-b border-[#F2F4F7] bg-white">
              {TABLE_HEADERS.map((h) => (
                <p
                  key={h}
                  className="text-[16px] font-medium text-[#98A2B3]"
                >
                  {h}
                </p>
              ))}
              <div />
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#F2F4F7]">
              {currentRows.length === 0 ? (
                <p className="py-16 text-center text-[14px] text-[#98A2B3]">
                  Tidak ada data yang cocok.
                </p>
              ) : (
                currentRows.map((row) => (
                  <div
                    key={row.id + row.unit}
                    className="grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1fr_1fr_60px] items-center px-12 py-8 hover:bg-[#F9FAFB] transition"
                  >
                    <p className="text-[18px] font-medium text-[#101828]">
                      {row.id}
                    </p>

                    <div>
                      <p className="text-[18px] font-medium text-[#101828] mb-1">
                        {row.unit}
                      </p>
                      <p className="text-[15px] text-[#98A2B3]">
                        {row.email}
                      </p>
                    </div>

                    <p className="text-[16px] text-[#667085]">{row.terbit}</p>
                    <p className="text-[16px] text-[#667085]">
                      {row.jatuhTempo}
                    </p>

                    <StatusBadge status={row.status} />

                    <p className="text-[16px] text-[#667085]">
                      {row.tglBayar}
                    </p>

                    <button className="flex items-center justify-center hover:bg-gray-100 w-8 h-8 rounded-lg transition">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-[18px] h-[18px] text-[#98A2B3]"
                      >
                        <circle cx="5" cy="12" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="19" cy="12" r="1.8" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mobile view */}
          <div className="lg:hidden divide-y divide-[#F2F4F7]">
            {currentRows.length === 0 ? (
              <p className="py-16 text-center text-[14px] text-[#98A2B3]">
                Tidak ada data yang cocok.
              </p>
            ) : (
              currentRows.map((row) => (
                <div
                  key={row.id + row.unit}
                  className="p-6 hover:bg-[#F9FAFB] transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[16px] font-semibold text-[#101828] mb-1">
                        {row.unit}
                      </p>
                      <p className="text-[13px] text-[#98A2B3]">
                        {row.email}
                      </p>
                    </div>
                    <StatusBadge status={row.status} />
                  </div>

                  <div className="space-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-[#98A2B3]">ID:</span>
                      <span className="text-[#344054] font-medium">
                        {row.id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#98A2B3]">Terbit:</span>
                      <span className="text-[#344054]">{row.terbit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#98A2B3]">Jatuh Tempo:</span>
                      <span className="text-[#344054]">{row.jatuhTempo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#98A2B3]">Tgl Bayar:</span>
                      <span className="text-[#344054]">{row.tglBayar}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-[14px] text-[#98A2B3] order-2 sm:order-1">
            Showing{" "}
            {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} entri
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-[66px] h-[42px] rounded-[12px] border border-[#EAECF0] bg-white text-[14px] font-medium text-[#667085] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F9FAFB] transition"
            >
              Prev
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) =>
                  page === num ? (
                    <button
                      key={num}
                      className="w-[42px] h-[42px] rounded-[12px] text-white text-[14px] font-medium shadow-[0_4px_14px_rgba(0,52,255,0.25)]"
                      style={{
                        background:
                          "linear-gradient(180deg, #3FACFF 0%, #0034FF 100%)",
                      }}
                    >
                      {num}
                    </button>
                  ) : (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className="w-[42px] h-[42px] rounded-[12px] border border-[#EAECF0] bg-white text-[14px] font-medium text-[#667085] hover:bg-[#F9FAFB] transition"
                    >
                      {num}
                    </button>
                  )
              )}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-[66px] h-[42px] rounded-[12px] border border-[#EAECF0] bg-white text-[14px] font-medium text-[#667085] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F9FAFB] transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}