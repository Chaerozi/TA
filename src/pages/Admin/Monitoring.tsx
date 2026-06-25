import { useState, useEffect } from "react"
import delate from "../../assets/adminMonitor/Trash.svg";

/* ===================== DATA ===================== */

const PAYMENT_OPTIONS = ["Semua Pembayaran", "Lunas", "Belum Dibayar"] as const
const PER_PAGE = 10
type UnitType = {
  id: string
  unit: string
  idMeter: string
  konsumsi: string
  email: string
  status: string
}

export default function Monitoring() {
  const [search,        setSearch]        = useState("")
  const [paymentFilter, setPaymentFilter] = useState<string>("Semua Pembayaran")
  const [statusOpen,    setStatusOpen]    = useState(false)
  const [paymentOpen,   setPaymentOpen]   = useState(false)
  const [page,          setPage]          = useState(1)

  const [allUnits, setAllUnits] = useState<UnitType[]>([])
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    id: string | null;
  }>({
    open: false,
    id: null,
  });
  const [actionOpen, setActionOpen] = useState<string | null>(null);

  /* ---- filtered data ---- */
  const filtered = allUnits.filter((row) => {
    const matchSearch =
      row.unit.toLowerCase().includes(search.toLowerCase()) ||
      row.idMeter.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())

    const matchPayment =
      paymentFilter === "Semua Pembayaran" || row.status === paymentFilter

    return matchSearch && matchPayment
  })

  /* ---- pagination ---- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * PER_PAGE
  const paginated  = filtered.slice(start, start + PER_PAGE)
  const goPage     = (p: number) => setPage(Math.max(1, Math.min(p, totalPages)))

  const handlePayment = (v: string) => { setPaymentFilter(v); setPaymentOpen(false); setPage(1) }
  const handleSearch  = (v: string) => { setSearch(v);        setPage(1) }

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${API_URL}/api/v1/admin/monitoring-units/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus unit");
      }

      setAllUnits((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus unit");
    } finally {
      setDeleteModal({ open: false, id: null });
    }
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await fetch(
          "http://localhost:3000/api/v1/admin/monitoring-units",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const result = await response.json()

        setAllUnits(result)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUnits()
  }, [])

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
        <div className="grid grid-cols-[1fr_1.4fr_1fr_1.6fr_1fr_0.5fr] px-8 py-5 border-b border-[#F2F4F7]">
          <p className="text-[14px] font-medium text-[#98A2B3]">Unit</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">ID Meter</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">Konsumsi Bulan Ini</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">Email Penghuni</p>
          <p className="text-[14px] font-medium text-[#98A2B3]">Pembayaran</p>
          <p className="text-[14px] font-medium text-[#98A2B3] text-center">Action</p>
        </div>

        {/* BODY */}
        <div className="divide-y divide-[#F2F4F7]">
          {paginated.length > 0 ? (
            paginated.map(row => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_1.4fr_1fr_1.6fr_1fr_0.5fr] items-center px-8 py-6 hover:bg-[#F9FAFB] transition"
              >
                <p className="text-[16px] font-medium text-[#344054]">{row.unit}</p>
                <p className="text-[16px] font-medium text-[#344054]">{row.idMeter}</p>
                <p className="text-[16px] font-medium text-[#344054]">{row.konsumsi}</p>
                <p className="text-[14px] font-normal text-[#98A2B3] truncate pr-4">{row.email}</p>

                <div>
                  <span
                    className={`inline-flex items-center justify-center px-[14px] h-[30px] rounded-full text-[13px] font-medium ${
                      row.status === "Belum Dibayar"
                        ? "bg-[#FEE4E2] text-[#F04438]"
                        : "bg-[#D9F0A3] text-[#5F7A00]"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>

                <div className="relative flex justify-center">
                  <button
                    onClick={() =>
                      setActionOpen(actionOpen === row.id ? null : row.id)
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#667085]">
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>

                  {actionOpen === row.id && (
                    <div className="absolute top-9 right-0 w-[120px] bg-white rounded-[16px] border border-[#E4E7EC] shadow-lg overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setActionOpen(null);
                          setDeleteModal({
                            open: true,
                            id: row.id,
                          });
                        }}
                        className="w-full text-left px-5 py-3 text-[14px] text-[#F04438] hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-8 py-10 text-center text-[14px] text-[#98A2B3]">
              Tidak ada data unit ditemukan.
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

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <div className="relative w-[420px] bg-white rounded-[24px] shadow-xl p-8 flex flex-col items-center text-center">
            <button
              onClick={() => setDeleteModal({ open: false, id: null })}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#667085]"
            >
              ×
            </button>

            <img src={delate} alt="Hapus" className="w-14 h-14 mb-4" />

            <h2 className="text-[18px] font-semibold text-[#101828] mb-1">
              Hapus unit ini?
            </h2>
            <p className="text-[14px] text-[#667085] mb-6">
              Unit yang dihapus tidak dapat dikembalikan lagi.
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setDeleteModal({ open: false, id: null })}
                className="flex-1 h-[44px] rounded-full border border-[#EAECF0] bg-white text-[14px] font-medium text-[#344054] hover:bg-gray-50 transition"
              >
                Tidak
              </button>
              <button
                onClick={() => deleteModal.id && handleDelete(deleteModal.id)}
                className="flex-1 h-[44px] rounded-full text-[14px] font-medium text-white transition"
                style={{ background: "linear-gradient(180deg, #3FACFF 0%, #0034FF 100%)" }}
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}