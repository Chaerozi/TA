import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import Generate from "../../assets/AdminBilling/Generate.svg"
import lunas from "../../assets/AdminBilling/Paid.svg"
import Pending from "../../assets/AdminBilling/Pending.svg"
import jatuhTempo from "../../assets/AdminBilling/JatuhTempo.svg"
import gopay from "../../assets/Tagihan/Gopay.png"
import link from "../../assets/Tagihan/LinkAja.svg.png"
import dana from "../../assets/Tagihan/Dana.png"
import shopeepay from "../../assets/Tagihan/Shope.png"
import qris from "../../assets/Tagihan/Qr.svg"

// ── Types ──────────────────────────────────────────────────
type Status = "Lunas" | "Belum Bayar" | "Jatuh Tempo"
type Metode = "GoPay" | "LinkAja" | "DANA" | "ShopeePay" | "QRIS"

const METHOD_ICONS: Record<Metode, string> = {
  GoPay: gopay,
  LinkAja: link,
  DANA: dana,
  ShopeePay: shopeepay,
  QRIS: qris,
}

const data: {
  unit: string
  penghuni: string
  penggunaan: string
  total: string
  status: Status
  jatuhTempo: string
  metode: Metode
}[] = [
  {
    unit: "Unit 101",
    penghuni: "Budi Santoso",
    penggunaan: "18.2 m³",
    total: "Rp 185.000",
    status: "Lunas",
    jatuhTempo: "10 Okt 2025",
    metode: "QRIS",
  },
  {
    unit: "Unit 102",
    penghuni: "Siti Rahayu",
    penggunaan: "24.5 m³",
    total: "Rp 240.000",
    status: "Belum Bayar",
    jatuhTempo: "15 Okt 2025",
    metode: "GoPay",
  },
  {
    unit: "Unit 103",
    penghuni: "Ahmad Fauzi",
    penggunaan: "15.8 m³",
    total: "Rp 150.000",
    status: "Jatuh Tempo",
    jatuhTempo: "05 Okt 2025",
    metode: "LinkAja",
  },
  {
    unit: "Unit 201",
    penghuni: "Dewi Kusuma",
    penggunaan: "19.3 m³",
    total: "Rp 200.000",
    status: "Lunas",
    jatuhTempo: "12 Okt 2025",
    metode: "DANA",
  },
  {
    unit: "Unit 202",
    penghuni: "Riko Pratama",
    penggunaan: "21.0 m³",
    total: "Rp 210.000",
    status: "Belum Bayar",
    jatuhTempo: "18 Okt 2025",
    metode: "ShopeePay",
  },
]

const grad: React.CSSProperties = {
  background: "linear-gradient(135deg, #0096FF 0%, #0022FF 100%)",
}

// ── Mini bar chart ─────────────────────────────────────────
function MiniBarChart() {
  const bars = [38, 52, 33, 62, 47, 68, 58]
  return (
    <div className="flex items-end gap-[3px] h-[32px]">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-[2px]"
          style={{
            height: `${h}%`,
            background: "linear-gradient(180deg,#0096FF,#0022FF)",
            opacity: 0.35 + i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

// ── Status badge ───────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  const cfg = {
    Lunas: {
      icon: lunas,
      label: "Paid",
      cls: "bg-green-50 text-green-600 border-green-200",
    },
    "Belum Bayar": {
      icon: Pending,
      label: "Pending",
      cls: "bg-amber-50 text-amber-600 border-amber-200",
    },
    "Jatuh Tempo": {
      icon: jatuhTempo,
      label: "Overdue",
      cls: "bg-red-50 text-red-500 border-red-200",
    },
  }[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full text-[11px] font-semibold border ${cfg.cls}`}
    >
      <img src={cfg.icon} className="w-[11px] h-[11px]" />
      {cfg.label}
    </span>
  )
}

// ── Select wrapper ─────────────────────────────────────────
function Select({
  value,
  onChange,
  children,
}: {
  value?: string
  onChange?: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[40px] rounded-[10px] border border-gray-200 bg-white pl-3 pr-8 text-[13px] text-gray-600 outline-none cursor-pointer appearance-none focus:border-blue-400 transition"
      >
        {children}
      </select>
      <svg
        className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2 4l4 4 4-4"
          stroke="#aaa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ── Summary card ───────────────────────────────────────────
function SummaryCard({
  label,
  value,
  sub,
  valueColor = "text-gray-900",
  icon,
  badge,
  chart,
}: {
  label: string
  value: string
  sub: string
  valueColor?: string
  icon?: string
  badge?: React.ReactNode
  chart?: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-[20px] border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <p className="text-[12px] font-medium text-gray-400">{label}</p>
        {badge ?? (icon && <img src={icon} className="w-[18px] h-[18px] opacity-40" />)}
      </div>
      {chart && <div className="mb-3">{chart}</div>}
      <p className={`text-[22px] font-bold leading-tight ${valueColor}`}>{value}</p>
      <p className="text-[12px] text-gray-400 mt-1">{sub}</p>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function Billing() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("Oktober 2025")
  const [methodFilter, setMethodFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [detailModal, setDetailModal] = useState<(typeof data)[0] | null>(null)

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const q = search.toLowerCase()
      const matchSearch =
        item.unit.toLowerCase().includes(q) ||
        item.penghuni.toLowerCase().includes(q)
      const matchStatus =
        statusFilter === "all" || item.status === statusFilter
      const matchMethod =
        methodFilter === "all" || item.metode === methodFilter
      return matchSearch && matchStatus && matchMethod
    })
  }, [search, statusFilter, methodFilter])

  const ROWS_PER_PAGE = 4
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-6">
      <div className="max-w-[1080px] mx-auto">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[26px] font-bold text-gray-900">
              Billing Overview
            </h1>
            <p className="text-[13px] text-gray-400 mt-0.5">
              Manage property invoices and utility collections
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/billing-settings")}
            className="flex items-center gap-2 h-[44px] px-5 rounded-[12px] text-white text-[13px] font-semibold shadow-lg active:scale-[0.97] transition-transform"
            style={grad}
          >
            <img src={Generate} className="w-[16px] h-[16px]" />
            Generate Monthly Bills
          </button>
        </div>

        {/* ── SUMMARY CARDS ── */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <SummaryCard
            label="Total Revenue"
            value="Rp 12,5jt"
            sub="Bulan Oktober 2025"
            badge={
              <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                +12.5%
              </span>
            }
            chart={<MiniBarChart />}
          />
          <SummaryCard
            label="Pending Payments"
            value="Rp 2,8jt"
            sub="42 pending invoices"
            icon={Pending}
          />
          <SummaryCard
            label="Paid Bills"
            value="Rp 9,7jt"
            sub="86% completion rate"
            icon={lunas}
          />
          <SummaryCard
            label="Overdue Bills"
            value="Rp 11,9jt"
            valueColor="text-red-500"
            sub="12 accounts at risk"
            icon={jatuhTempo}
          />
        </div>

        {/* ── FILTER BAR ── */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-[10px] px-3 h-[40px] flex-1 min-w-[200px] focus-within:border-blue-400 transition">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#bbb" strokeWidth="1.3" />
              <path
                d="M9.5 9.5l2.5 2.5"
                stroke="#bbb"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-300 hover:text-gray-500 text-[16px] leading-none"
              >
                ×
              </button>
            )}
          </div>

          <Select
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v)
              setPage(1)
            }}
          >
            <option value="all">Status: All</option>
            <option value="Lunas">Lunas</option>
            <option value="Belum Bayar">Belum Bayar</option>
            <option value="Jatuh Tempo">Jatuh Tempo</option>
          </Select>

          <Select value={monthFilter} onChange={setMonthFilter}>
            <option value="Oktober 2025">Oktober 2025</option>
            <option value="September 2025">September 2025</option>
            <option value="Agustus 2025">Agustus 2025</option>
          </Select>

          <Select
            value={methodFilter}
            onChange={(v) => {
              setMethodFilter(v)
              setPage(1)
            }}
          >
            <option value="all">Payment: All Methods</option>
            <option value="GoPay">GoPay</option>
            <option value="LinkAja">LinkAja</option>
            <option value="DANA">DANA</option>
            <option value="ShopeePay">ShopeePay</option>
            <option value="QRIS">QRIS</option>
          </Select>

          <button
            onClick={() => {
              setSearch("")
              setStatusFilter("all")
              setMethodFilter("all")
              setPage(1)
            }}
            className="h-[40px] px-4 text-[13px] font-medium rounded-[10px] border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition active:scale-[0.97]"
          >
            Clear All
          </button>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-sm mb-4">
          <div className="grid grid-cols-[0.8fr_1.1fr_0.8fr_0.9fr_0.85fr_0.8fr_1.2fr] px-5 py-3 bg-gray-50/80 border-b border-gray-100">
            {[
              "UNIT",
              "PENGHUNI",
              "PEMAKAIAN",
              "TOTAL BILL",
              "STATUS",
              "JATUH TEMPO",
              "METODE",
            ].map((col) => (
              <span
                key={col}
                className="text-[10px] font-bold text-gray-400 uppercase tracking-wider"
              >
                {col}
              </span>
            ))}
          </div>

          {paginated.length === 0 && (
            <div className="py-14 text-center">
              <p className="text-[14px] text-gray-400">
                Tidak ada data yang sesuai filter
              </p>
              <button
                onClick={() => {
                  setSearch("")
                  setStatusFilter("all")
                  setMethodFilter("all")
                  setPage(1)
                }}
                className="mt-3 text-[13px] font-medium underline"
                style={{ color: "#0096FF" }}
              >
                Reset filter
              </button>
            </div>
          )}

          {paginated.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[0.8fr_1.1fr_0.8fr_0.9fr_0.85fr_0.8fr_1.2fr] items-center px-5 py-4 border-b border-gray-50 last:border-none hover:bg-blue-50/20 transition group"
            >
              <p className="text-[13px] font-bold text-gray-900">{item.unit}</p>
              <p className="text-[13px] text-gray-700">{item.penghuni}</p>
              <p className="text-[13px] text-gray-600">{item.penggunaan}</p>
              <p className="text-[14px] font-bold text-gray-900">{item.total}</p>
              <StatusBadge status={item.status} />
              <p className="text-[12px] text-gray-500">{item.jatuhTempo}</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-[28px] h-[28px] rounded-[8px] bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={METHOD_ICONS[item.metode]}
                      className="w-[20px] h-[20px] object-contain"
                      alt={item.metode}
                    />
                  </div>
                  <p className="text-[12px] text-gray-600 font-medium">
                    {item.metode}
                  </p>
                </div>
                <button
                  onClick={() => setDetailModal(item)}
                  className="px-3 h-[30px] rounded-[8px] text-white text-[11px] font-semibold shadow-sm active:scale-[0.96] transition-transform opacity-80 group-hover:opacity-100"
                  style={grad}
                >
                  Detail →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── PAGINATION ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[12px] text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {Math.min((page - 1) * ROWS_PER_PAGE + 1, filtered.length)}–
              {Math.min(page * ROWS_PER_PAGE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
            entri
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-[32px] px-3 rounded-[8px] text-[12px] font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-[32px] w-[32px] rounded-[8px] text-[12px] font-semibold transition active:scale-95 ${
                  page === n
                    ? "text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
                style={page === n ? grad : undefined}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-[32px] px-3 rounded-[8px] text-[12px] font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* ── DETAIL MODAL ── */}
      {detailModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setDetailModal(null)}
        >
          <div
            className="bg-white rounded-[24px] shadow-2xl w-full max-w-[420px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[17px] font-bold text-gray-900">
                Detail Tagihan
              </h2>
              <button
                onClick={() => setDetailModal(null)}
                className="w-[30px] h-[30px] rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition text-[16px] font-medium"
              >
                ×
              </button>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-[14px] mb-4"
              style={{ background: "linear-gradient(135deg,#EEF6FF,#E0EEFF)" }}
            >
              <div
                className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-white font-bold text-[16px] shadow"
                style={grad}
              >
                {detailModal.unit.replace("Unit ", "")}
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900">
                  {detailModal.unit}
                </p>
                <p className="text-[13px] text-gray-500">{detailModal.penghuni}</p>
              </div>
              <div className="ml-auto">
                <StatusBadge status={detailModal.status} />
              </div>
            </div>

            {[
              { label: "Total Tagihan", value: detailModal.total, bold: true },
              { label: "Pemakaian", value: detailModal.penggunaan },
              { label: "Jatuh Tempo", value: detailModal.jatuhTempo },
            ].map(({ label, value, bold }) => (
              <div
                key={label}
                className="flex justify-between items-center py-3 border-b border-gray-50 last:border-none"
              >
                <span className="text-[13px] text-gray-400">{label}</span>
                <span
                  className={`text-[13px] ${
                    bold
                      ? "font-bold text-gray-900 text-[15px]"
                      : "font-medium text-gray-700"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center py-3 border-b border-gray-50">
              <span className="text-[13px] text-gray-400">
                Metode Pembayaran
              </span>
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] rounded-[7px] bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={METHOD_ICONS[detailModal.metode]}
                    className="w-[18px] h-[18px] object-contain"
                  />
                </div>
                <span className="text-[13px] font-medium text-gray-700">
                  {detailModal.metode}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setDetailModal(null)}
                className="flex-1 h-[42px] rounded-[12px] border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition active:scale-[0.97]"
              >
                Tutup
              </button>
              <button
                className="flex-1 h-[42px] rounded-[12px] text-white text-[13px] font-semibold shadow-md active:scale-[0.97] transition-transform"
                style={grad}
                onClick={() =>
                  alert(`Kirim reminder ke ${detailModal.penghuni}`)
                }
              >
                Kirim Reminder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}