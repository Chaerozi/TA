import { useState, useRef, useEffect } from "react"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts"

import WaterChart from "../../components/WaterChart"
import { getDashboardChart } from "../../services/dashboardService"

import totalIcon    from "../../assets/adminDasbord/Total.svg"
import konsumsiIcon from "../../assets/adminDasbord/Konsumsi.svg"
import bulanIcon    from "../../assets/adminDasbord/Bulan.svg"
import kelolaIcon   from "../../assets/adminDasbord/Kelola.svg"
import notifIcon    from "../../assets/adminDasbord/Lonceng.svg"

/* ===================== DATA ===================== */
const barData = {
  "1 Bulan Terakhir": [
    { month: "Jan", values: [10000, 3000, 1200, 100] },
  ],
  "3 Bulan Terakhir": [
    { month: "Jan", values: [10000, 3000, 1200, 100] },
    { month: "Feb", values: [10000, 1200, 600, 300] },
    { month: "Mar", values: [900, 600, 1200, 3000] },
  ],
  "6 Bulan Terakhir": [
    { month: "Jan", values: [10000, 3000, 1200, 100] },
    { month: "Feb", values: [10000, 1200, 600, 300] },
    { month: "Mar", values: [900, 600, 1200, 3000] },
    { month: "Apr", values: [600, 900, 5200, 3000] },
    { month: "May", values: [3000, 1200, 5200, 3000] },
    { month: "Jun", values: [1200, 3000, 1000, 2800] },
  ],
}

const RANGE_OPTIONS = ["3 Bulan Terakhir", "6 Bulan Terakhir"] as const
type RangeType = typeof RANGE_OPTIONS[number]

const pieData = [
  { name: "Sudah bayar", value: 80 },
  { name: "Belum bayar", value: 20 },
]

const allPaymentHistory = [
  { id: "567GH8",  pemakaian: "84.5 m³",  status: "Lunas",         tagihan: "IDR 49.000"  },
  { id: "567GH8",  pemakaian: "84.5 m³",  status: "Belum Dibayar", tagihan: "IDR 99.000"  },
  { id: "567GH8",  pemakaian: "84.5 m³",  status: "Lunas",         tagihan: "IDR 49.000"  },
  { id: "567GH8",  pemakaian: "84.5 m³",  status: "Belum Dibayar", tagihan: "IDR 99.000"  },
  { id: "567GH9",  pemakaian: "92.0 m³",  status: "Lunas",         tagihan: "IDR 99.000"  },
  { id: "567GH10", pemakaian: "78.3 m³",  status: "Lunas",         tagihan: "IDR 49.000"  },
]

const UNIT_LIST = ["Unit A-10", "Unit A-11", "Unit A-12", "Unit B-01", "Unit B-02", "Unit C-05"]
type FilterType = "All" | "Lunas" | "Belum Dibayar"

/* ===================== CUSTOM ROUNDED BAR ===================== */
function RoundedBar(props: any) {
  const { x, y, height, fill } = props
  if (!height || height <= 0) return null
  return (
    <rect x={x} y={y} width={36.06} height={height} rx={18} ry={18} fill={fill} />
  )
}

/* ===================== CUSTOM TOOLTIP ===================== */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg px-3 py-2">
      <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-[13px] font-semibold text-gray-800">
        {payload[0].value.toLocaleString()} m³
      </p>
    </div>
  )
}

/* ===================== STAT CARD ===================== */
type StatCardProps = {
  title: string
  value: string
  subtext?: string
  badge?: string
  badgeType?: "green" | "red"
  icon: string
}

function StatCard({ title, value, subtext, badge, badgeType, icon }: StatCardProps) {
  return (
    <div className="w-full h-[158px] rounded-[20px] border border-[#EAEEF3] bg-white px-7 flex items-center justify-between shadow-sm">
      <div className="flex flex-col justify-center">
        <p className="text-[14px] leading-[20px] text-[#667085] font-medium mb-[18px]">{title}</p>
        <h2 className="text-[22px] leading-none tracking-[-0.02em] text-[#101828] font-semibold">{value}</h2>
        {subtext && (
          <p className="mt-[10px] text-[13px] leading-[18px] text-[#98A2B3]">{subtext}</p>
        )}
        {badge && (
          <span className={`inline-flex items-center w-fit px-[10px] py-[4px] rounded-full text-[12px] font-medium mt-[12px] ${
            badgeType === "green" ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#D92D20]"
          }`}>
            {badge}
          </span>
        )}
      </div>
      <div className="w-[44px] h-[44px] rounded-[12px] bg-[#E5E7EB] flex items-center justify-center shrink-0">
        <img src={icon} className="w-[20px] h-[20px] object-contain opacity-70" alt="icon" />
      </div>
    </div>
  )
}

/* ===================== MAIN DASHBOARD ===================== */
export default function Dashboard() {
  const [range, setRange] = useState<RangeType>("6 Bulan Terakhir")
  const [waterData, setWaterData] = useState<any[]>([])
  
  const chartData = barData[range as keyof typeof barData].flatMap((item) => {
    const highest = Math.max(...item.values)
    return item.values.map((value, index) => ({
      month: index === 0 ? item.month : "",
      value,
      active: value === highest,
    }))
  })

  const [rangeOpen, setRangeOpen] = useState(false)
  const rangeRef = useRef<HTMLDivElement>(null)

  const [paymentSearch, setPaymentSearch] = useState("")
  const [filterStatus, setFilterStatus]   = useState<FilterType>("All")
  const [filterOpen, setFilterOpen]       = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (rangeRef.current  && !rangeRef.current.contains(e.target as Node))  setRangeOpen(false)
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredPayments = allPaymentHistory.filter(row => {
    const matchSearch = row.id.toLowerCase().includes(paymentSearch.toLowerCase())
    const matchFilter = filterStatus === "All" || row.status === filterStatus
    return matchSearch && matchFilter
  })

  useEffect(() => {
  const fetchChart = async () => {
    const token = localStorage.getItem("token")
    
    console.log("TOKEN VALUE:", token)  // ← cek ini dulu
    
    if (!token) {
      console.log("TOKEN NULL - fetch dibatalkan")  // ← kalau ini muncul, ketemu masalahnya
      return
    }
    
    try {
      const result = await getDashboardChart(token)
      console.log("RESULT:", result)
      setWaterData(result)
    } catch (err) {
      console.error("FETCH ERROR:", err)
    }
  }
  fetchChart()
}, [])

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-[215px]">
          <p className="text-[24px] leading-[33px] font-normal text-[#98A2B3] tracking-[-0.02em]">
            Smart Water Meter
          </p>
          <h1 className="text-[32px] leading-[33px] font-medium text-[#344054] tracking-[-0.03em] mt-[2px]">
            Dashboard
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

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex items-center gap-4">
        <button className="w-[200px] h-[53px] rounded-[34px] bg-white border border-[#E4E7EC] flex items-center justify-center gap-2.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition-all">
          <img src={kelolaIcon} className="w-[18px] h-[18px] opacity-70" alt="kelola" />
          <span className="text-[14px] font-medium text-[#344054]">Kelola Harga Air</span>
        </button>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Unit Aktif"      value="48"            subtext="Dari 50 unit terdaftar" icon={totalIcon} />
        <StatCard title="Konsumsi Hari Ini"     value="842.5 m³"      badge="+3.2%"  badgeType="green" icon={konsumsiIcon} />
        <StatCard title="Konsumsi Bulan Ini"    value="18,320 m³"     badge="-1.8%"  badgeType="red"   icon={bulanIcon} />
        <StatCard title="Tagihan Belum Dibayar" value="Rp 52.450.000" subtext="8 unit menunggak"        icon={totalIcon} />
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_347px] gap-6 items-start">

        {/* ===== LEFT COLUMN ===== */}
        <div className="space-y-4 min-w-0">

          {/* BAR CHART CARD */}
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[15px] font-bold text-gray-800">Volume pemakaian air</h3>

              <div className="relative" ref={rangeRef}>
                <button
                  onClick={() => setRangeOpen(!rangeOpen)}
                  className="flex items-center gap-2 text-[12px] font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 h-[32px] rounded-[10px] transition"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  {range}
                </button>
                {rangeOpen && (
                  <div className="absolute right-0 top-[38px] w-[180px] bg-white rounded-[14px] shadow-lg border border-gray-100 p-1.5 z-50">
                    {RANGE_OPTIONS.map(r => (
                      <button key={r} onClick={() => { setRange(r); setRangeOpen(false) }}
                        className={`w-full text-left px-3 py-2.5 text-[12px] rounded-[10px] transition font-medium ${range === r ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative" style={{ height: "360px" }}>
              <div className="absolute left-0 top-[58px] h-[250px] flex flex-col justify-between text-[#98A2B3] text-[12px] z-10">
                <span>10000 m³</span>
                <span>1000 m³</span>
                <span>100 m³</span>
                <span>0 m³</span>
              </div>

<div className="pl-[75px] h-[300px]">
  <WaterChart data={waterData?.[0]?.data ?? []} />
</div>
            </div>
          </div>

          {/* PAYMENT TABLE */}
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-50">
              <h3 className="text-[15px] font-bold text-gray-800">Riwayat pembayaran</h3>
              <div className="flex items-center gap-2">

                <div className="flex items-center gap-2 bg-gray-100 px-3 h-[34px] rounded-[10px] w-[150px]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="w-3.5 h-3.5 shrink-0">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input type="text" placeholder="Search..." value={paymentSearch}
                    onChange={e => setPaymentSearch(e.target.value)}
                    className="bg-transparent outline-none text-[12px] w-full text-gray-600 placeholder-gray-400" />
                </div>

                <div className="relative" ref={filterRef}>
                  <button onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 h-[34px] rounded-[10px] transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    {filterStatus}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-[40px] w-[160px] bg-white rounded-[14px] shadow-lg border border-gray-100 p-1.5 z-50">
                      {(["All", "Lunas", "Belum Dibayar"] as FilterType[]).map(f => (
                        <button key={f} onClick={() => { setFilterStatus(f); setFilterOpen(false) }}
                          className={`w-full text-left px-3 py-2.5 text-[12px] rounded-[10px] transition font-medium ${filterStatus === f ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}>
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
                <tr className="bg-gray-50/80">
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wide py-3 px-5">ID</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wide py-3">Pemakaian</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wide py-3">Status</th>
                  <th className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wide py-3 pr-5">Tagihan</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? filteredPayments.map((row, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-blue-50/30 transition cursor-default">
                    <td className="py-3.5 px-5 text-[13px] font-semibold text-gray-800">{row.id}</td>
                    <td className="py-3.5 text-[13px] text-gray-500">{row.pemakaian}</td>
                    <td className="py-3.5">
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
                        row.status === "Lunas"
                          ? "text-emerald-600 bg-emerald-50 border border-emerald-100"
                          : "text-rose-500 bg-rose-50 border border-rose-100"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-5 text-[13px] text-gray-500 font-medium">{row.tagihan}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-[13px] text-gray-400">Tidak ada data yang cocok</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="space-y-4">

          {/* PIE CHART */}
          <div className="w-full h-[464px] rounded-[20px] border border-[#EEF2F6] bg-white px-6 pt-7 pb-6 flex flex-col shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <h3 className="text-[16px] leading-[24px] font-medium text-[#344054] mb-[34px]">
              Sebaran Status Pembayaran
            </h3>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <PieChart width={270} height={270}>
                  <defs>
                    <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4F9CF9" />
                      <stop offset="100%" stopColor="#0034FF" />
                    </linearGradient>
                  </defs>

                  <Pie
                    data={pieData}
                    innerRadius={74}
                    outerRadius={114}
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="url(#donutGrad)" />
                    <Cell fill="#E4E7EC" />
                  </Pie>
                </PieChart>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-[26px] leading-none font-semibold text-[#344054]">80%</p>
                  <p className="mt-[10px] text-[14px] leading-[22px] text-[#98A2B3] text-center font-normal">
                    Sudah bayar 40<br />dari 50 unit
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-[16px] h-[16px] rounded-full bg-[#245BFF]" />
                <span className="text-[14px] leading-[22px] font-normal text-[#344054]">Sudah bayar</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-[16px] h-[16px] rounded-full bg-[#E4E7EC]" />
                <span className="text-[14px] leading-[22px] font-normal text-[#344054]">Belum bayar</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}