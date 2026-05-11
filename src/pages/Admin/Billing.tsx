import { useMemo, useState } from "react"

import lunas from "../../assets/AdminBilling/Paid.svg"
import Pending from "../../assets/AdminBilling/Pending.svg"
import jatuhTempo from "../../assets/AdminBilling/JatuhTempo.svg"
import Unduh from "../../assets/AdminBilling/Unduh.svg"
import gopay from "../../assets/Tagihan/Gopay.png"
import link from "../../assets/Tagihan/LinkAja.svg.png"
import dana from "../../assets/Tagihan/Dana.png"
import shopeepay from "../../assets/Tagihan/Shope.png"
import qris from "../../assets/Tagihan/Qr.svg"

type Status = "Lunas" | "Menunggu" | "Jatuh Tempo"
type Metode = "GoPay" | "LinkAja" | "DANA" | "ShopeePay" | "QRIS"

const METHOD_ICONS: Record<Metode, string> = {
  GoPay: gopay, LinkAja: link, DANA: dana, ShopeePay: shopeepay, QRIS: qris,
}

const data: {
  idFaktur: string
  unit: string
  penghuni: string
  tagihanTerbit: string
  jatuhTempo: string
  jumlah: number
  status: Status
  tglBayar: string | null
  metode: Metode
}[] = [
  { idFaktur: "INV-2602-001", unit: "Unit 101", penghuni: "Budi Santoso",  tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 182000, status: "Lunas",       tglBayar: "5 Feb 2026",  metode: "QRIS"      },
  { idFaktur: "INV-2602-002", unit: "Unit 102", penghuni: "Siti Rahayu",   tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 245000, status: "Menunggu",    tglBayar: null,          metode: "GoPay"     },
  { idFaktur: "INV-2602-003", unit: "Unit 103", penghuni: "Ahmad Fauzi",   tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 158000, status: "Jatuh Tempo", tglBayar: null,          metode: "LinkAja"   },
  { idFaktur: "INV-2602-004", unit: "Unit 201", penghuni: "Dewi Kusuma",   tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 200000, status: "Lunas",       tglBayar: "10 Feb 2026", metode: "DANA"      },
  { idFaktur: "INV-2602-005", unit: "Unit 202", penghuni: "Riko Pratama",  tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 210000, status: "Menunggu",    tglBayar: null,          metode: "ShopeePay" },
  { idFaktur: "INV-2602-006", unit: "Unit 203", penghuni: "Lina Susanti",  tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 175000, status: "Lunas",       tglBayar: "8 Feb 2026",  metode: "QRIS"      },
  { idFaktur: "INV-2602-007", unit: "Unit 301", penghuni: "Hendra Wijaya", tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 220000, status: "Jatuh Tempo", tglBayar: null,          metode: "GoPay"     },
  { idFaktur: "INV-2602-008", unit: "Unit 302", penghuni: "Maya Putri",    tagihanTerbit: "1 Feb 2026", jatuhTempo: "15 Feb 2026", jumlah: 195000, status: "Menunggu",    tglBayar: null,          metode: "DANA"      },
]

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID")

const grad: React.CSSProperties = {
  background: "linear-gradient(135deg, #0096FF 0%, #0022FF 100%)",
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = {
    Lunas:         { label: "Lunas",       icon: lunas,      cls: "text-green-600 border-green-300 bg-green-50" },
    Menunggu:      { label: "Menunggu",    icon: Pending,    cls: "text-amber-500 border-amber-300 bg-amber-50" },
    "Jatuh Tempo": { label: "Jatuh Tempo", icon: jatuhTempo, cls: "text-red-500   border-red-300   bg-red-50"   },
  }[status]

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[14px] text-[12px] font-semibold border whitespace-nowrap w-fit ${cfg.cls}`}>
      <img src={cfg.icon} className="w-[12px] h-[12px]" />
      {cfg.label}
    </span>
  )
}

function Select({ value, onChange, children }: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[42px] rounded-full border border-gray-200 bg-white pl-4 pr-9 text-[13px] text-gray-600 outline-none cursor-pointer appearance-none focus:border-blue-400 transition shadow-sm"
      >
        {children}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function Billing() {
  const [search, setSearch]             = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage]                 = useState(1)
  const [detailModal, setDetailModal]   = useState<(typeof data)[0] | null>(null)

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const q = search.toLowerCase()
      const matchSearch =
        item.unit.toLowerCase().includes(q) ||
        item.penghuni.toLowerCase().includes(q) ||
        item.idFaktur.toLowerCase().includes(q)
      const matchStatus = statusFilter === "all" || item.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const ROWS_PER_PAGE = 5
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)

  const totalTagihan    = data.reduce((s, d) => s + d.jumlah, 0)
  const sudahTerbayar   = data.filter(d => d.status === "Lunas").reduce((s, d) => s + d.jumlah, 0)
  const belumTerbayar   = data.filter(d => d.status === "Menunggu").reduce((s, d) => s + d.jumlah, 0)
  const lewatJatuhTempo = data.filter(d => d.status === "Jatuh Tempo").reduce((s, d) => s + d.jumlah, 0)
  const unitLunas       = data.filter(d => d.status === "Lunas").length
  const unitMenunggak   = data.filter(d => d.status === "Menunggu").length
  const unitOverdue     = data.filter(d => d.status === "Jatuh Tempo").length
  const collectPct      = Math.round((sudahTerbayar / totalTagihan) * 100)

  return (
    <div className="min-h-screen bg-[#F3F6FB] p-8">
  <div className="w-full max-w-[1380px] mx-auto">

        {/* ── SUMMARY CARDS ── */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-[22px] border border-gray-100 p-8 shadow-sm">
            <p className="text-[12px] text-gray-400 mb-3">Total Tagihan Terbit</p>
            <p className="text-[20px] font-bold text-gray-900 mb-1">{fmt(totalTagihan)}</p>
            <p className="text-[12px] text-gray-400">{data.length} faktur</p>
          </div>
          <div className="bg-white rounded-[22px] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3">
              <img src={lunas} className="w-[13px] h-[13px]" />
              <p className="text-[12px] text-green-600 font-semibold">Sudah Terbayar</p>
            </div>
            <p className="text-[20px] font-bold text-green-600 mb-1">{fmt(sudahTerbayar)}</p>
            <p className="text-[12px] text-gray-400">{unitLunas} unit lunas</p>
          </div>
          <div className="bg-white rounded-[22px] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3">
              <img src={Pending} className="w-[13px] h-[13px]" />
              <p className="text-[12px] text-amber-500 font-semibold">Belum Terbayar</p>
            </div>
            <p className="text-[20px] font-bold text-amber-500 mb-1">{fmt(belumTerbayar)}</p>
            <p className="text-[12px] text-gray-400">{unitMenunggak} unit menunggak</p>
          </div>
          <div className="bg-white rounded-[22px] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3">
              <img src={jatuhTempo} className="w-[13px] h-[13px]" />
              <p className="text-[12px] text-red-500 font-semibold">Lewat Jatuh Tempo</p>
            </div>
            <p className="text-[20px] font-bold text-red-500 mb-1">{fmt(lewatJatuhTempo)}</p>
            <p className="text-[12px] text-gray-400">{unitOverdue} unit overdue</p>
          </div>
        </div>

        {/* ── REKAP COLLECTION ── */}
        <div className="bg-white rounded-[22px] border border-gray-100 p-8 shadow-sm mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[14px] font-bold text-gray-900">Rekap Collection Period</p>
              <p className="text-[12px] text-gray-400 mt-0.5">Februari 2026</p>
            </div>
            <p className="text-[13px] font-bold" style={{ color: "#0096FF" }}>
              {collectPct}% terkumpul
            </p>
          </div>
          <div className="w-full h-[8px] bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${collectPct}%`, background: "linear-gradient(90deg,#0096FF,#0022FF)" }}
            />
          </div>
          <div className="flex justify-end">
            <p className="text-[12px] text-gray-400">{fmt(sudahTerbayar)} / {fmt(totalTagihan)}</p>
          </div>
        </div>

        {/* ── FILTER ── */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 h-[42px] shadow-sm focus-within:border-blue-400 transition">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#bbb" strokeWidth="1.3"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="#bbb" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Cari unit, penghuni, ID faktur..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-300 hover:text-gray-500 text-[16px]">×</button>
            )}
          </div>
          <Select value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1) }}>
            <option value="all">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Jatuh Tempo">Jatuh Tempo</option>
          </Select>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-[24px] border border-[#E8EEF7] overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.05)] mb-4">

          {/* HEADER — 8 kolom: tambah kolom Unduh terpisah */}
          <div className="grid grid-cols-[1.2fr_1.4fr_0.9fr_0.9fr_1fr_1.6fr_1fr_0.7fr] px-8 py-4 bg-gray-50 border-b border-gray-100">
            {["ID FAKTUR", "UNIT & PENGHUNI", "TAGIHAN TERBIT", "JATUH TEMPO", "JUMLAH", "STATUS", "TGL BAYAR", ""].map((col, i) => (
              <span key={i} className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-tight">
                {col}
              </span>
            ))}
          </div>

          {/* EMPTY */}
          {paginated.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-[13px] text-gray-400">Tidak ada data yang sesuai</p>
              <button
                onClick={() => { setSearch(""); setStatusFilter("all"); setPage(1) }}
                className="mt-2 text-[12px] underline"
                style={{ color: "#0096FF" }}
              >
                Reset filter
              </button>
            </div>
          )}

          {/* ROWS */}
          {paginated.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.2fr_1.4fr_0.9fr_0.9fr_1fr_1.6fr_1fr_0.7fr] items-center px-8 py-4 border-b border-gray-50 last:border-none hover:bg-blue-50/20 transition group"
            >
              {/* ID Faktur */}
              <p className="text-[12px] font-bold text-gray-700 leading-snug">{item.idFaktur}</p>

              {/* Unit & Penghuni */}
              <div>
                <p className="text-[13px] font-bold text-gray-900">{item.unit}</p>
                <p className="text-[12px] text-gray-400">{item.penghuni}</p>
              </div>

              {/* Tagihan Terbit */}
              <p className="text-[12px] text-gray-600">{item.tagihanTerbit}</p>

              {/* Jatuh Tempo */}
              <p className="text-[12px] text-gray-600">{item.jatuhTempo}</p>

              {/* Jumlah */}
              <div>
                <p className="text-[11px] text-gray-400">Rp</p>
                <p className="text-[13px] font-bold text-gray-900">{item.jumlah.toLocaleString("id-ID")}</p>
              </div>

              {/* Status */}
         <div className="pr-6">
            <StatusBadge status={item.status} />
          </div>

              {/* TGL Bayar — kolom sendiri */}
              <p className="text-[12px] text-gray-500">{item.tglBayar ?? "—"}</p>

              {/* Unduh — kolom sendiri, pakai asset Unduh.svg */}
              <div className="flex justify-center">
                <button
                  onClick={() => setDetailModal(item)}
                  className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-blue-600 transition active:scale-95"
                >
                  <img src={Unduh} className="w-[14px] h-[14px]" />
                  Unduh
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── PAGINATION ── */}
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {Math.min((page - 1) * ROWS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-700">{filtered.length}</span> entri
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-[32px] px-4 rounded-[8px] text-[12px] font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-[32px] w-[32px] rounded-[8px] text-[12px] font-semibold transition ${
                  page === n ? "text-white shadow-sm" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
                style={page === n ? grad : undefined}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-[32px] px-4 rounded-[8px] text-[12px] font-medium bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
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
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[17px] font-bold text-gray-900">Detail Tagihan</h2>
              <button
                onClick={() => setDetailModal(null)}
                className="w-[30px] h-[30px] rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition text-[15px]"
              >
                ×
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-[14px] mb-4" style={{ background: "linear-gradient(135deg,#EEF6FF,#E0EEFF)" }}>
              <div className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-white font-bold text-[14px] shadow" style={grad}>
                {detailModal.unit.replace("Unit ", "")}
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900">{detailModal.unit}</p>
                <p className="text-[12px] text-gray-500">{detailModal.penghuni}</p>
              </div>
              <div className="ml-auto">
                <StatusBadge status={detailModal.status} />
              </div>
            </div>

            {[
              { label: "ID Faktur",      value: detailModal.idFaktur },
              { label: "Jumlah Tagihan", value: fmt(detailModal.jumlah), bold: true },
              { label: "Tagihan Terbit", value: detailModal.tagihanTerbit },
              { label: "Jatuh Tempo",    value: detailModal.jatuhTempo },
              { label: "Tgl Bayar",      value: detailModal.tglBayar ?? "—" },
            ].map(({ label, value, bold }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-none">
                <span className="text-[12px] text-gray-400">{label}</span>
                <span className={`text-[13px] ${bold ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>
                  {value}
                </span>
              </div>
            ))}

            <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
              <span className="text-[12px] text-gray-400">Metode Pembayaran</span>
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] rounded-[6px] bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={METHOD_ICONS[detailModal.metode]} className="w-[16px] h-[16px] object-contain"/>
                </div>
                <span className="text-[13px] font-medium text-gray-700">{detailModal.metode}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setDetailModal(null)}
                className="flex-1 h-[48px] rounded-[12px] border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition active:scale-[0.97]"
              >
                Tutup
              </button>
              <button
                className="flex-1 h-[48px] rounded-[12px] text-white text-[13px] font-semibold shadow-md active:scale-[0.97] transition-transform"
                style={grad}
                onClick={() => alert(`Kirim reminder ke ${detailModal.penghuni}`)}
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