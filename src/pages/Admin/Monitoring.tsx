import { useState } from "react"
import succesIcon from "../../assets/adminDasbord/Berhasil.svg"
import notifIcon from "../../assets/adminDasbord/Lonceng.svg"

/* ===================== DATA ===================== */
const allUnits = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  unit: `Unit ${101 + i}`,
  idMeter: "OsBJxsqznl2frgSwNd4",
  konsumsi: "18.2 m³",
  email: "christianbryan263@gmail.com",
  status: i === 1 || i === 4 || i === 5 || i === 9 || i === 13 ? "Belum Dibayar" : "Lunas",
}))

const STATUS_OPTIONS  = ["Semua Status",     "Lunas", "Belum Dibayar"] as const
const PAYMENT_OPTIONS = ["Semua Pembayaran", "Lunas", "Belum Dibayar"] as const
const PER_PAGE = 10

export default function Monitoring() {
  const [search,        setSearch]        = useState("")
  const [statusFilter,  setStatusFilter]  = useState<string>("Semua Status")
  const [paymentFilter, setPaymentFilter] = useState<string>("Semua Pembayaran")
  const [statusOpen,    setStatusOpen]    = useState(false)
  const [paymentOpen,   setPaymentOpen]   = useState(false)
  const [page,          setPage]          = useState(1)

  /* modal state */
  const [openModal,     setOpenModal]     = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [namaUnit,   setNamaUnit]   = useState("")
  const [idMeterVal, setIdMeterVal] = useState("")

  /* ---- filtered data ---- */
  const filtered = allUnits.filter(row => {
    const matchSearch =
      row.unit.toLowerCase().includes(search.toLowerCase()) ||
      row.idMeter.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus  = statusFilter  === "Semua Status"     || row.status === statusFilter
    const matchPayment = paymentFilter === "Semua Pembayaran" || row.status === paymentFilter
    return matchSearch && matchStatus && matchPayment
  })

  /* ---- pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * PER_PAGE
  const paginated  = filtered.slice(start, start + PER_PAGE)
  const goPage     = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)))

  const handleStatus  = (v: string) => { setStatusFilter(v);  setStatusOpen(false);  setPage(1) }
  const handlePayment = (v: string) => { setPaymentFilter(v); setPaymentOpen(false); setPage(1) }
  const handleSearch  = (v: string) => { setSearch(v);        setPage(1) }

  const handleOpenModal  = () => { setNamaUnit(""); setIdMeterVal(""); setOpenModal(true) }
  const handleCloseModal = () => setOpenModal(false)

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">

        {/* LEFT */}
        <div className="flex flex-col">
          <div className="w-[215px]">
            <p className="text-[24px] leading-[33px] font-normal text-[#98A2B3] tracking-[-0.02em]">
              Smart Water Meter
            </p>
            <h1 className="text-[32px] leading-[33px] font-medium text-[#344054] tracking-[-0.03em] mt-[2px]">
              Daftar Unit
            </h1>
          </div>

          {/* ✅ onClick terhubung ke handleOpenModal */}
          <button
            onClick={handleOpenModal}
            className="mt-[28px] w-[178px] h-[53px] rounded-[34px] flex items-center justify-center gap-3 text-white transition-all active:scale-[0.98] hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #0034FF 0%, #3FACFF 100%)", boxShadow: "0 8px 24px rgba(0,52,255,0.25)" }}
          >
            <span className="text-[28px] leading-none font-light">+</span>
            <span className="text-[14px] font-medium">Tambah Unit</span>
          </button>
        </div>

        {/* PROFILE PILL */}
        <div className="w-[302px] h-[68px] rounded-full border border-[#EAECF0] bg-white px-[14px] flex items-center justify-between shadow-[0_1px_2px_rgba(16,24,40,0.05)] shrink-0">
          <div className="flex items-center gap-[14px]">
            <div className="w-[52px] h-[52px] rounded-full bg-[#F2F4F7] flex items-center justify-center">
              <img src={notifIcon} className="w-[24px] h-[24px] opacity-60" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[20px] leading-[22px] font-medium text-[#344054]">Hi, Admin</p>
              <p className="mt-[6px] text-[14px] leading-[22px] font-normal text-[#98A2B3]">Welcome to Aquora</p>
            </div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px] text-[#98A2B3]">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

      </div>

      {/* ================= FILTER SECTION ================= */}
      <div className="flex items-center justify-between gap-6">

        {/* SEARCH */}
        <div className="w-[450px] h-[50px] rounded-full border border-[#EAECF0] bg-white px-5 flex items-center gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[#98A2B3] shrink-0">
            <circle cx="11" cy="11" r="7" /><path d="M20 20L17 17" />
          </svg>
          <input type="text" placeholder="Cari unit, penghuni, nomor meter..." value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-[14px] text-[#344054] placeholder:text-[#98A2B3]" />
          {search && (
            <button onClick={() => handleSearch("")} className="text-[#98A2B3] hover:text-[#344054] text-[18px] leading-none">×</button>
          )}
        </div>

        {/* RIGHT FILTERS */}
        <div className="flex items-center gap-4">

          {/* STATUS */}
          <div className="relative">
            <button
              onClick={() => { setStatusOpen(!statusOpen); setPaymentOpen(false) }}
              className="w-[190px] h-[50px] rounded-full border border-[#EAECF0] bg-white px-5 flex items-center justify-between shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition"
            >
              <span className="text-[14px] text-[#344054]">{statusFilter}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`w-[16px] h-[16px] text-[#98A2B3] transition-transform ${statusOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {statusOpen && (
              <div className="absolute right-0 top-[56px] w-full bg-white rounded-[16px] shadow-lg border border-[#EAECF0] p-1.5 z-50">
                {STATUS_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => handleStatus(opt)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] rounded-[12px] transition font-medium ${statusFilter === opt ? "bg-blue-50 text-blue-600" : "text-[#344054] hover:bg-gray-50"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PEMBAYARAN */}
          <div className="relative">
            <button
              onClick={() => { setPaymentOpen(!paymentOpen); setStatusOpen(false) }}
              className="w-[210px] h-[50px] rounded-full border border-[#EAECF0] bg-white px-5 flex items-center justify-between shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-gray-50 transition"
            >
              <span className="text-[14px] text-[#344054]">{paymentFilter}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`w-[16px] h-[16px] text-[#98A2B3] transition-transform ${paymentOpen ? "rotate-180" : ""}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {paymentOpen && (
              <div className="absolute right-0 top-[56px] w-full bg-white rounded-[16px] shadow-lg border border-[#EAECF0] p-1.5 z-50">
                {PAYMENT_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => handlePayment(opt)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] rounded-[12px] transition font-medium ${paymentFilter === opt ? "bg-blue-50 text-blue-600" : "text-[#344054] hover:bg-gray-50"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full bg-white rounded-[24px] border border-[#EEF2F6] overflow-hidden shadow-[0_1px_2px_rgba(16,24,40,0.04)]">

        {/* HEADER */}
        <div className="grid grid-cols-[1fr_1.4fr_1fr_1.6fr_1fr_60px] px-8 py-5 border-b border-[#F2F4F7]">
          <p className="text-[14px] font-medium text-[#98A2B3]">Unit</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">ID Meter</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">Konsumsi Bulan Ini</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">Email Penghuni</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">Pembayaran</p>
          <div />
        </div>

        {/* BODY */}
        <div className="divide-y divide-[#F2F4F7]">
          {paginated.length > 0 ? paginated.map(row => (
            <div key={row.id}
              className="grid grid-cols-[1fr_1.4fr_1fr_1.6fr_1fr_60px] items-center px-8 py-6 hover:bg-[#F9FAFB] transition">
              <p className="text-[16px] font-medium text-[#344054]">{row.unit}</p>
              <p className="text-[16px] font-medium text-[#344054]">{row.idMeter}</p>
              <p className="text-[16px] font-medium text-[#344054]">{row.konsumsi}</p>
              <p className="text-[14px] font-normal text-[#98A2B3] truncate pr-4">{row.email}</p>
              <div>
                <span className={`inline-flex items-center justify-center px-[14px] h-[30px] rounded-full text-[13px] font-medium ${
                  row.status === "Belum Dibayar" ? "bg-[#FEE4E2] text-[#F04438]" : "bg-[#D9F0A3] text-[#5F7A00]"
                }`}>
                  {row.status}
                </span>
              </div>
              <button className="flex items-center justify-center hover:opacity-60 transition">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#98A2B3]">
                  <circle cx="5"  cy="12" r="1.8" />
                  <circle cx="12" cy="12" r="1.8" />
                  <circle cx="19" cy="12" r="1.8" />
                </svg>
              </button>
            </div>
          )) : (
            <div className="px-8 py-12 text-center text-[14px] text-[#98A2B3]">
              Tidak ada data yang cocok
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#F2F4F7]">
          <p className="text-[14px] text-[#98A2B3] font-normal">
            Showing {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of {filtered.length} entri
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => goPage(safePage - 1)} disabled={safePage === 1}
              className="w-[58px] h-[38px] rounded-[10px] border border-[#EAECF0] bg-white text-[14px] font-medium transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ color: safePage === 1 ? "#D0D5DD" : "#667085" }}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => goPage(p)}
                className="w-[38px] h-[38px] rounded-[10px] text-[14px] font-medium transition"
                style={p === safePage
                  ? { background: "linear-gradient(180deg, #3FACFF 0%, #0034FF 100%)", color: "#fff", boxShadow: "0 4px 14px rgba(0,52,255,0.25)" }
                  : { background: "#fff", color: "#667085", border: "1px solid #EAECF0" }}>
                {p}
              </button>
            ))}
            <button onClick={() => goPage(safePage + 1)} disabled={safePage === totalPages}
              className="w-[58px] h-[38px] rounded-[10px] border border-[#EAECF0] bg-white text-[14px] font-medium text-[#667085] transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>

      </div>


      {/* ================= MODAL TAMBAH UNIT ================= */}
      {openModal && (
        <div
          className="fixed inset-0 bg-black/20  flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="w-[510px] rounded-[32px] bg-white px-8 pt-8 pb-7 relative shadow-[0_20px_60px_rgba(16,24,40,0.18)]"
            onClick={e => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 w-[48px] h-[48px] rounded-full bg-[#F2F4F7] flex items-center justify-center hover:bg-[#E4E7EC] transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[18px] h-[18px] text-[#101828]">
                <path d="M6 6L18 18" /><path d="M18 6L6 18" />
              </svg>
            </button>

            {/* TITLE */}
            <h2 className="text-[24px] font-semibold text-[#101828] mb-8">Tambah Unit</h2>

            {/* INPUT NAMA UNIT */}
            <div className="mb-6">
              <p className="text-[16px] font-semibold text-[#101828] mb-3">Nama Unit</p>
              <input
                type="text"
                placeholder="Nama Unit"
                value={namaUnit}
                onChange={e => setNamaUnit(e.target.value)}
                className="w-full h-[64px] rounded-[16px] border border-[#D0D5DD] px-6 text-[16px] text-[#344054] outline-none placeholder:text-[#98A2B3] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* INPUT ID METER */}
            <div className="mb-8">
              <p className="text-[16px] font-semibold text-[#101828] mb-3">ID Meter</p>
              <input
                type="text"
                placeholder="Masukan ID Meter"
                value={idMeterVal}
                onChange={e => setIdMeterVal(e.target.value)}
                className="w-full h-[64px] rounded-[16px] border border-[#D0D5DD] px-6 text-[16px] text-[#344054] outline-none placeholder:text-[#98A2B3] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* SUBMIT BUTTON — klik → tutup form, buka success */}
            <button
              onClick={() => { setOpenModal(false); setSuccessModal(true) }}
              className="w-full h-[64px] rounded-[38px] text-white text-[17px] font-medium transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #0034FF 0%, #3FACFF 100%)", boxShadow: "0 8px 24px rgba(0,52,255,0.25)" }}
            >
              Tambah Unit
            </button>
          </div>
        </div>
      )}

      {/* ================= SUCCESS MODAL ================= */}
      {successModal && (
        <div
          className="fixed inset-0 bg-black/40  flex items-center justify-center z-50"
          onClick={() => setSuccessModal(false)}
        >
          <div
            className="w-[440px] rounded-[32px] bg-white px-6 pt-10 pb-6 flex flex-col items-center text-center shadow-[0_20px_60px_rgba(16,24,40,0.18)]"
            onClick={e => e.stopPropagation()}
          >
            {/* SUCCESS ICON */}
            <img src={succesIcon} className="w-[80px] h-[80px] mb-8" alt="success" />

            {/* TITLE */}
            <h2 className="text-[24px] font-semibold text-[#101828] mb-3">
              Unit berhasil ditambahkan
            </h2>

            {/* DESC */}
            <p className="text-[14px] text-[#98A2B3] leading-[1.6] mb-8 max-w-[280px]">
              Unit sudah bisa ditambahkan dan digunakan oleh penghuni
            </p>

            {/* KEMBALI BUTTON */}
            <button
              onClick={() => setSuccessModal(false)}
              className="w-full h-[58px] rounded-[38px] text-white text-[16px] font-medium transition-all active:scale-[0.98] hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #0034FF 0%, #3FACFF 100%)", boxShadow: "0 8px 24px rgba(0,52,255,0.25)" }}
            >
              Kembali
            </button>
          </div>
        </div>
      )}

    </div>
  )
}