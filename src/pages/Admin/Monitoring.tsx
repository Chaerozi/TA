import { useMemo, useState } from "react"

import WaterIcon from "../../assets/adminDasbord/Konsumsi.svg"
import SearchIcon from "../../assets/adminMonitor/Search.svg"
import Normal from "../../assets/adminMonitor/Centang.svg"
import TerindeksAnomali from "../../assets/adminMonitor/Alert.svg"
import Update from "../../assets/adminMonitor/Jam.svg"

const data = [
  {
    unit: "Unit 101",
    lantai: "Lantai 1",
    nama: "Budi Santoso",
    flow: "12.4 L/min",
    konsumsi: "18.2 m³",
    status: "Normal",
    pembayaran: "Lunas",
    update: "2 menit lalu",
  },
  {
    unit: "Unit 102",
    lantai: "Lantai 1",
    nama: "Siti Rahayu",
    flow: "0.3 L/min",
    konsumsi: "24.5 m³",
    status: "Terindikasi Anomali",
    pembayaran: "Belum Bayar",
    update: "5 menit lalu",
  },
  {
    unit: "Unit 103",
    lantai: "Lantai 1",
    nama: "Ahmad Fauzi",
    flow: "Tidak Mengalir",
    konsumsi: "15.8 m³",
    status: "Normal",
    pembayaran: "Jatuh Tempo",
    update: "10 menit lalu",
  },
  {
    unit: "Unit 201",
    lantai: "Lantai 2",
    nama: "Dewi Kusuma",
    flow: "8.1 L/min",
    konsumsi: "19.3 m³",
    status: "Normal",
    pembayaran: "Lunas",
    update: "1 menit lalu",
  },
]

export default function Monitoring() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.unit.toLowerCase().includes(search.toLowerCase()) ||
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.lantai.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === "all" || item.status === statusFilter
      const matchPayment = paymentFilter === "all" || item.pembayaran === paymentFilter
      return matchSearch && matchStatus && matchPayment
    })
  }, [search, statusFilter, paymentFilter])

  return (
    <div className="min-h-screen bg-[#EEF1F6] p-8">
      <div className="max-w-[900px] mx-auto">

        {/* ── FILTER ROW ── */}
        <div className="flex items-center gap-3 mb-4">

          {/* SEARCH */}
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 h-[46px] shadow-sm">
            <img src={SearchIcon} className="w-[15px] h-[15px] opacity-30 shrink-0" />
            <input
              type="text"
              placeholder="Cari unit, penghuni, nomor meter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-[13px] text-gray-700 outline-none w-full placeholder:text-gray-400"
            />
          </div>

          {/* STATUS DROPDOWN */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-[46px] rounded-full border border-gray-200 bg-white pl-4 pr-10 text-[13px] text-gray-700 outline-none shadow-sm cursor-pointer appearance-none min-w-[160px]"
            >
              <option value="all">Semua Status</option>
              <option value="Normal">Normal</option>
              <option value="Terindikasi Anomali">Terindikasi Anomali</option>
              <option value="Offline">Offline</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* PAYMENT DROPDOWN */}
          <div className="relative">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="h-[46px] rounded-full border border-gray-200 bg-white pl-4 pr-10 text-[13px] text-gray-700 outline-none shadow-sm cursor-pointer appearance-none min-w-[180px]"
            >
              <option value="all">Semua Pembayaran</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum Bayar">Belum Bayar</option>
              <option value="Jatuh Tempo">Jatuh Tempo</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

        </div>

        {/* ── COUNT ── */}
        <p className="text-[13px] text-gray-600 mb-4 font-medium">
          Menampilkan{" "}
          <span className="font-bold text-gray-900">{filteredData.length}</span>{" "}
          unit
        </p>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden shadow-sm">

          {/* HEADER */}
          <div className="grid grid-cols-[1.8fr_0.9fr_1fr_1.1fr_1fr_1.2fr] px-6 py-4 border-b border-gray-100 bg-white">
            {[
              "UNIT",
              "FLOW\nRATE",
              "KONSUMSI\nBULAN INI",
              "STATUS",
              "PEMBAYARAN",
              "UPDATE",
            ].map((col) => (
              <span
                key={col}
                className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-pre-line leading-tight"
              >
                {col}
              </span>
            ))}
          </div>

          {/* EMPTY */}
          {filteredData.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[14px] text-gray-400">Data tidak ditemukan</p>
            </div>
          )}

          {/* ROWS */}
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.8fr_0.9fr_1fr_1.1fr_1fr_1.2fr] items-center px-6 py-5 border-b border-gray-50 last:border-none hover:bg-blue-50/20 transition"
            >

              {/* UNIT */}
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <img
                    src={WaterIcon}
                    className="w-[18px] h-[18px]"
                    style={{ filter: "invert(39%) sepia(99%) saturate(1820%) hue-rotate(206deg) brightness(100%) contrast(96%)" }}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900 leading-snug">{item.unit}</p>
                  <p className="text-[12px] text-gray-400 leading-snug">
                    {item.lantai} · {item.nama}
                  </p>
                </div>
              </div>

              {/* FLOW RATE */}
              <div className="flex items-start gap-1.5 mt-[2px]">
                {item.flow !== "Tidak Mengalir" && (
                  <span
                    className={`w-[7px] h-[7px] rounded-full shrink-0 mt-[4px] ${
                      item.flow === "0.3 L/min" ? "bg-orange-400" : "bg-blue-400"
                    }`}
                  />
                )}
                <span
                  className={`text-[13px] font-semibold leading-snug ${
                    item.flow === "Tidak Mengalir"
                      ? "text-gray-400"
                      : item.flow === "0.3 L/min"
                      ? "text-orange-500"
                      : "text-blue-500"
                  }`}
                >
                  {item.flow === "12.4 L/min" ? (
                    <>12.4<br />L/min</>
                  ) : item.flow === "8.1 L/min" ? (
                    <>8.1 L/min</>
                  ) : item.flow}
                </span>
              </div>

              {/* KONSUMSI */}
              <p className="text-[14px] font-bold text-gray-900">{item.konsumsi}</p>

              {/* STATUS */}
              <div>
                {item.status === "Normal" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-white text-green-600 border border-green-300">
                    <img src={Normal} className="w-[13px] h-[13px]" />
                    Normal
                  </span>
                )}
                {item.status === "Terindikasi Anomali" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[12px] font-semibold bg-red-50 text-red-500 border border-red-300 text-center leading-snug">
                    <img src={TerindeksAnomali} className="w-[13px] h-[13px] shrink-0" />
                    <span>Terindikasi<br />Anomali</span>
                  </span>
                )}
                {item.status === "Offline" && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-500">
                    Offline
                  </span>
                )}
              </div>

              {/* PEMBAYARAN */}
              <div>
                {item.pembayaran === "Lunas" && (
                  <span className="text-[13px] font-semibold text-green-500">Lunas</span>
                )}
                {item.pembayaran === "Belum Bayar" && (
                  <span className="text-[13px] font-semibold text-orange-500">Belum Bayar</span>
                )}
                {item.pembayaran === "Jatuh Tempo" && (
                  <span className="text-[13px] font-bold text-red-500 leading-snug">
                    Jatuh<br />Tempo
                  </span>
                )}
              </div>

              {/* UPDATE + DETAIL */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <img src={Update} className="w-[13px] h-[13px] opacity-30 shrink-0" />
                  <span className="text-[12px] text-gray-400 leading-snug">{item.update}</span>
                </div>
                <button className="text-[13px] font-bold text-blue-500 hover:text-blue-700 transition whitespace-nowrap">
                  Detail →
                </button>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}