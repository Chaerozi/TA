import { useState, useRef, useEffect } from "react"
import {
  ComposedChart, Line, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts"

import totalIcon    from "../../assets/adminDasbord/Total.svg"
import konsumsiIcon from "../../assets/adminDasbord/Konsumsi.svg"
import bulanIcon    from "../../assets/adminDasbord/Bulan.svg"
import kelolaIcon   from "../../assets/adminDasbord/Kelola.svg"
import smartIcon    from "../../assets/adminDasbord/Smart.svg"
import succesIcon   from "../../assets/adminDasbord/Berhasil.svg"

/* ===================== DATA ===================== */
const monthlyData: Record<string, { day: string; value: number }[]> = {
  Januari:   Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 600 + Math.floor(Math.random() * 300) })),
  Februari:  Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 620 + Math.floor(Math.random() * 280) })),
  Maret:     Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 650 + Math.floor(Math.random() * 300) })),
  April:     Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 700 + Math.floor(Math.random() * 250) })),
  Mei:       Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 720 + Math.floor(Math.random() * 270) })),
  Juni:      Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 710 + Math.floor(Math.random() * 260) })),
  Juli:      Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 730 + Math.floor(Math.random() * 200) })),
  Agustus:   Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 740 + Math.floor(Math.random() * 220) })),
  September: Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 760 + Math.floor(Math.random() * 240) })),
  Oktober:   Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 750 + Math.floor(Math.random() * 230) })),
  November:  Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 730 + Math.floor(Math.random() * 210) })),
  Desember:  Array.from({ length: 26 }, (_, i) => ({ day: String(i + 1), value: 720 + Math.floor(Math.random() * 200) })),
}
const MONTHS = Object.keys(monthlyData)

const pieData = [
  { name: "Sudah bayar", value: 80 },
  { name: "Belum bayar", value: 20 },
]
const COLORS = ["url(#donutGradient)", "#E5E7EB"]

const allPaymentHistory = [
  { id: "567GH8",  pemakaian: "84.5 m³",  status: "Lunas",         tagihan: "IDR 49.000"  },
  { id: "567GH9",  pemakaian: "92.0 m³",  status: "Belum Dibayar", tagihan: "IDR 99.000"  },
  { id: "567GH10", pemakaian: "78.3 m³",  status: "Lunas",         tagihan: "IDR 49.000"  },
  { id: "567GH11", pemakaian: "110.1 m³", status: "Belum Dibayar", tagihan: "IDR 120.000" },
  { id: "567GH12", pemakaian: "65.7 m³",  status: "Lunas",         tagihan: "IDR 40.000"  },
  { id: "567GH13", pemakaian: "88.2 m³",  status: "Lunas",         tagihan: "IDR 55.000"  },
]

// Unit list — nanti bisa diganti fetch dari API
const UNIT_LIST = ["Unit A-10", "Unit A-11", "Unit A-12", "Unit B-01", "Unit B-02", "Unit C-05"]

type FilterType = "All" | "Lunas" | "Belum Dibayar"

/* ===================== MODAL TAMBAH USER ===================== */
function TambahUserModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: (email: string) => void
}) {
  const [unit, setUnit]   = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  const handleSubmit = async () => {
  if (!unit) { setError("Pilih unit terlebih dahulu."); return }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Masukkan email yang valid.")
    return
  }

  setError("")
  setLoading(true)

  try {
    const token = localStorage.getItem("token")

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        email,
        unit,
        name: "",
        role: "customer",
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || "Gagal menambahkan user.")
      setLoading(false)
      return
    }

    onSuccess(email)

  } catch (err) {
    // Ini yang muncul — biasanya CORS atau URL salah
    setError("Gagal terhubung ke server. Coba lagi.")
    setLoading(false)
  }
}
  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      <div
        className="w-[500px] bg-white rounded-[20px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-500 text-[14px]"
        >
          ✕
        </button>

        <h2 className="text-[18px] font-bold text-gray-800 mb-1">Tambah User</h2>
        <p className="text-[13px] text-gray-400 mb-5">
          User akan menerima email untuk aktivasi akun dan membuat kata sandi.
        </p>

        <div className="space-y-4">

          {/* UNIT */}
          <div>
            <label className="text-[13px] font-semibold text-gray-700 mb-1.5 block">
              Pilih Unit
            </label>
            <div className="relative">
              <select
                value={unit}
                onChange={(e) => { setUnit(e.target.value); setError("") }}
                className="w-full h-[46px] px-4 pr-10 rounded-[12px] border border-gray-200 text-[13px] text-gray-700 outline-none focus:border-blue-500 transition appearance-none bg-white cursor-pointer"
              >
                <option value="">-- Pilih unit --</option>
                {UNIT_LIST.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[13px] font-semibold text-gray-700 mb-1.5 block">
              Email Pengguna Baru
            </label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError("") }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full h-[46px] px-4 rounded-[12px] border border-gray-200 text-[13px] text-gray-700 outline-none focus:border-blue-500 transition placeholder:text-gray-400"
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-[10px] px-4 py-2.5">
              <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <p className="text-[12px] text-red-600">{error}</p>
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[48px] rounded-[14px] text-white text-[14px] font-semibold bg-gradient-to-r from-[#0096FF] via-[#60A5FA] to-[#0022FF] shadow-[0_8px_20px_rgba(37,99,235,0.35)] active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Mengirim...
              </>
            ) : (
              "Tambah User & Kirim Email"
            )}
          </button>

        </div>
      </div>
    </div>
  )
}

/* ===================== SUCCESS MODAL ===================== */
function SuccessModal({
  email,
  onClose,
}: {
  email: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      <div
        className="w-[420px] bg-white rounded-[20px] p-7 text-center shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <img src={succesIcon} className="w-[80px]" />
        </div>

        <h2 className="text-[18px] font-bold text-gray-800 mb-2">
          Akun berhasil ditambahkan!
        </h2>

        <p className="text-[13px] text-gray-400 mb-1">
          Email aktivasi telah dikirim ke:
        </p>
        <p className="text-[14px] font-semibold text-blue-600 mb-5 break-all">
          {email}
        </p>
        <p className="text-[13px] text-gray-400 mb-6">
          Minta pengguna cek inbox-nya dan buat kata sandi untuk mengaktifkan akun.
        </p>

        <button
          onClick={onClose}
          className="w-full h-[48px] rounded-[14px] text-white text-[14px] font-semibold bg-gradient-to-r from-[#0096FF] via-[#60A5FA] to-[#0022FF] shadow-[0_8px_20px_rgba(37,99,235,0.35)] active:scale-[0.97] transition-all"
        >
          Selesai
        </button>
      </div>
    </div>
  )
}

/* ===================== MAIN DASHBOARD ===================== */
export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState("Juli")
  const [monthOpen, setMonthOpen]         = useState(false)
  const monthRef  = useRef<HTMLDivElement>(null)

  const [paymentSearch, setPaymentSearch] = useState("")
  const [filterStatus, setFilterStatus]   = useState<FilterType>("All")
  const [filterOpen, setFilterOpen]       = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  // Modal state
  const [openModal, setOpenModal]       = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [addedEmail, setAddedEmail]     = useState("")

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (monthRef.current  && !monthRef.current.contains(e.target as Node))  setMonthOpen(false)
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const lineData = monthlyData[selectedMonth]

  const filteredPayments = allPaymentHistory.filter(row => {
    const matchSearch = row.id.toLowerCase().includes(paymentSearch.toLowerCase())
    const matchFilter = filterStatus === "All" || row.status === filterStatus
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-4 max-w-[1320px] mx-auto">

      {/* HERO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:h-[60px]">
        <div>
          <h1 className="text-[20px] font-semibold text-gray-800 leading-tight">
            Pantau konsumsi & tagihan air secara real-time
          </h1>
          <p className="text-[14px] text-gray-400 mt-[2px]">
            Lihat semua statistik dari pengguna dan laporannya
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-[40px] px-4 rounded-[12px] bg-white border border-gray-200 text-gray-700 text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <div className="w-[26px] h-[26px] bg-white rounded-[8px] flex items-center justify-center">
              <img src={kelolaIcon} className="w-4" />
            </div>
            Kelola Air
          </button>

          <button
            onClick={() => setOpenModal(true)}
            className="h-[40px] px-4 rounded-[14px] text-white text-[14px] font-semibold bg-gradient-to-r from-[#0096FF] via-[#60A5FA] to-[#0022FF] shadow-[0_6px_18px_rgba(0,34,255,0.35)] hover:shadow-[0_8px_24px_rgba(0,34,255,0.5)] active:scale-[0.97] transition-all flex items-center gap-1.5"
          >
            <span className="text-[16px] font-light">+</span>
            Tambah User
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Unit Aktif"      value="48"            desc="Dari 50 unit terdaftar" icon={totalIcon} />
        <StatCard title="Konsumsi Hari Ini"     value="842.5 m³"      extra="+3.2%" extraType="green" icon={konsumsiIcon} />
        <StatCard title="Konsumsi Bulan Ini"    value="18,320 m³"     extra="-1.8%" extraType="red"   icon={bulanIcon} />
        <StatCard title="Tagihan Belum Dibayar" value="Rp 52.450.000" desc="8 unit menunggak"        icon={totalIcon} />
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_365px] gap-4 items-start w-full">

        {/* LEFT */}
        <div className="space-y-4 h-full">

          {/* LINE CHART */}
          <div className="w-full bg-white rounded-[12px] border border-slate-200 flex flex-col" style={{ height: "300px", padding: "20px", gap: "10px" }}>
            <div className="flex justify-between items-center">
              <h3 className="text-[14px] font-semibold text-gray-700">Volume pemakaian air</h3>
              <div className="relative" ref={monthRef}>
                <button
                  onClick={() => setMonthOpen(!monthOpen)}
                  className="flex items-center gap-1.5 text-[12px] text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 h-[30px] rounded-[8px] transition"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  {selectedMonth}
                </button>
                {monthOpen && (
                  <div className="absolute right-0 top-[36px] w-[140px] bg-white rounded-[12px] shadow-lg border border-gray-100 p-1.5 z-50 max-h-[260px] overflow-y-auto">
                    {MONTHS.map(month => (
                      <button
                        key={month}
                        onClick={() => { setSelectedMonth(month); setMonthOpen(false) }}
                        className={`w-full text-left px-3 py-2 text-[12px] rounded-[8px] transition ${
                          selectedMonth === month ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={lineData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#3B82F6" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#0096FF" />
                      <stop offset="100%" stopColor="#0022FF" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                  <YAxis domain={[0, 1000]} ticks={[0, 250, 500, 750, 1000]} tickLine={false} axisLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} width={35} />
                  <Tooltip contentStyle={{ borderRadius: "10px", border: "1px solid #E5E7EB", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="value" stroke="none" fill="url(#areaGradient)" />
                  <Line type="monotone" dataKey="value" stroke="url(#lineGradient)" strokeWidth={2.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PAYMENT TABLE */}
          <div className="w-full bg-white rounded-[12px] border border-slate-200 overflow-hidden">
            <div className="flex justify-between items-center px-[20px] py-[14px]">
              <h3 className="text-[14px] font-semibold text-gray-700">Riwayat pembayaran</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-gray-100 px-3 h-[34px] rounded-[10px] w-[160px]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={paymentSearch}
                    onChange={e => setPaymentSearch(e.target.value)}
                    className="bg-transparent outline-none text-[12px] w-full text-gray-600 placeholder-gray-400"
                  />
                </div>
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-1.5 text-[12px] text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 h-[34px] rounded-[10px] transition"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    {filterStatus}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-[40px] w-[160px] bg-white rounded-[12px] shadow-lg border border-gray-100 p-1.5 z-50">
                      {(["All", "Lunas", "Belum Dibayar"] as FilterType[]).map(f => (
                        <button
                          key={f}
                          onClick={() => { setFilterStatus(f); setFilterOpen(false) }}
                          className={`w-full text-left px-3 py-2 text-[12px] rounded-[8px] transition ${
                            filterStatus === f ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-t border-slate-200 border-b border-slate-200">
                  <th className="text-left text-[12px] text-gray-400 font-medium py-3 px-[20px]">ID</th>
                  <th className="text-left text-[12px] text-gray-400 font-medium py-3">Pemakaian</th>
                  <th className="text-left text-[12px] text-gray-400 font-medium py-3">Status</th>
                  <th className="text-left text-[12px] text-gray-400 font-medium py-3 pr-[20px]">Tagihan</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? filteredPayments.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedRow(selectedRow === i ? null : i)}
                    className={`border-b border-slate-100 last:border-0 cursor-pointer transition ${
                      selectedRow === i ? "bg-blue-50" : "hover:bg-gray-50/50"
                    }`}
                  >
                    <td className="py-3 px-[20px] text-[13px] text-gray-700 font-medium">{row.id}</td>
                    <td className="py-3 text-[13px] text-gray-600">{row.pemakaian}</td>
                    <td className="py-3">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        row.status === "Lunas" ? "text-green-600 bg-green-100" : "text-red-500 bg-red-100"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 pr-[20px] text-[13px] text-gray-600">{row.tagihan}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-[13px] text-gray-400">
                      Tidak ada data yang cocok
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-[12px] w-full lg:w-[365px]">
          <div className="bg-white rounded-[12px] p-[20px] border border-slate-200 flex flex-col gap-[10px]" style={{ height: "427px" }}>
            <h3 className="text-[14px] font-semibold text-gray-700 text-center">Sebaran Status Pembayaran</h3>
            <div className="flex items-center justify-center flex-1">
              <div className="relative">
                <PieChart width={325} height={325}>
                  <defs>
                    <linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0096FF" />
                      <stop offset="100%" stopColor="#0022FF" />
                    </linearGradient>
                  </defs>
                  <Pie data={pieData} innerRadius={90} outerRadius={140} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-[24px] font-semibold text-gray-800 leading-none">80%</p>
                  <p className="text-[12px] text-gray-400 text-center leading-tight mt-[4px]">Sudah bayar 40<br />dari 50 unit</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-5 pb-1">
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] rounded-full bg-[#0096FF]" />
                <span className="text-[12px] text-gray-500">Sudah bayar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[10px] h-[10px] rounded-full bg-gray-200" />
                <span className="text-[12px] text-gray-500">Belum bayar</span>
              </div>
            </div>
          </div>

          <div
            className="rounded-[12px] p-[20px] flex flex-col gap-[10px] relative overflow-hidden"
            style={{ height: "171px", background: "linear-gradient(135deg, #0096FF 0%, #0022FF 100%)", boxShadow: "0 8px 24px rgba(0,34,255,0.35)" }}
          >
            <img src={smartIcon} className="absolute -top-4 -right-4 w-[184px] opacity-28 pointer-events-none z-0" />
            <p className="text-[14px] font-semibold text-white relative z-10">Smart Alerts</p>
            <div className="bg-blue-400/50 rounded-[10px] h-[44px] flex items-center justify-center relative z-10">
              <p className="text-[13px] text-white font-medium">3 anomali terdeteksi hari ini</p>
            </div>
            <button className="w-full h-[44px] bg-white rounded-[999px] text-[14px] font-semibold text-gray-700 hover:bg-gray-50 transition active:scale-[0.98] relative z-10">
              Lihat detail
            </button>
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {openModal && (
        <TambahUserModal
          onClose={() => setOpenModal(false)}
          onSuccess={(email) => {
            setAddedEmail(email)
            setOpenModal(false)
            setSuccessModal(true)
          }}
        />
      )}

      {successModal && (
        <SuccessModal
          email={addedEmail}
          onClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  )
}

/* ===================== STAT CARD ===================== */
function StatCard({ title, value, desc, extra, extraType, icon }: {
  title: string; value: string; desc?: string; extra?: string; extraType?: "green" | "red"; icon: string
}) {
  return (
    <div className="bg-white rounded-[16px] h-[128px] px-[20px] py-[16px] border border-slate-200 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <p className="text-[16px] font-medium text-gray-700 leading-tight">{title}</p>
        <div className="w-[36px] h-[36px] bg-gray-100 rounded-[10px] flex items-center justify-center hover:bg-gray-200 transition cursor-pointer">
          <img src={icon} className="w-5 opacity-80" />
        </div>
      </div>
      <div>
        <h2 className="text-[24px] font-semibold text-gray-900 leading-tight">{value}</h2>
        {desc  && <p className="text-[14px] text-gray-400 mt-[2px]">{desc}</p>}
        {extra && (
          <span className={`inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full mt-1 ${
            extraType === "green" ? "text-green-600 bg-green-100" : "text-red-500 bg-red-100"
          }`}>
            {extra}
          </span>
        )}
      </div>
    </div>
  )
}