import { useEffect, useState } from "react";
import axios from "axios";

import notifIcon from "../../assets/adminDasbord/Lonceng.svg";
import Mata from "../../assets/Pesan/Mata.svg";
import Berhasil from "../../assets/adminDasbord/Berhasil.svg";

// ─── Types ───────────────────────────────────────────────────────────────────
type StatusType  = "Semua Status"     | "Aktif"       | "Selesai";
type PaymentType = "Semua Pembayaran" | "Sudah Bayar" | "Belum Bayar";

interface Ticket {
  id: string;

  ticketNumber: string;

  address: string;

  category: string;

  complaint: string;

  imageUrl: string | null;

  status: "Aktif" | "Selesai";

  createdAt: string;
}

const STATUS_OPTIONS:  StatusType[]  = ["Semua Status", "Aktif", "Selesai"];
const PAYMENT_OPTIONS: PaymentType[] = ["Semua Pembayaran", "Sudah Bayar", "Belum Bayar"];

// ─── PillDropdown ─────────────────────────────────────────────────────────────
function PillDropdown<T extends string>({
  value, options, open, onToggle, onSelect, width,
}: {
  value: T; options: T[]; open: boolean;
  onToggle: () => void; onSelect: (v: T) => void; width: string;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        style={{ width }}
        className="h-[40px] rounded-full border border-[#EAECF0] bg-white px-4 flex items-center justify-between gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
      >
        <span className="text-[13px] text-[#344054] truncate">{value}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`w-[14px] h-[14px] text-[#98A2B3] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-[46px] w-full bg-white rounded-[12px] shadow-lg border border-[#EAECF0] p-1 z-50">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`w-full text-left px-3 py-2 text-[13px] rounded-[8px] transition font-medium ${
                value === opt ? "bg-blue-50 text-blue-600" : "text-[#344054] hover:bg-[#F9FAFB]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Success Popup ────────────────────────────────────────────────────────────
function SuccessPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/20 px-6">
      <div className="w-[272px] rounded-[16px] bg-white px-6 pt-7 pb-6 shadow-xl">
        {/* Icon */}
        <div className="flex justify-center">
          <img
            src={Berhasil}
            alt="Berhasil"
            className="w-[72px] h-[72px] object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-[16px] font-bold text-[#1B2340]">
          Ticket berhasil diselesaikan
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-center text-[14px] leading-[22px] text-[#8B93A7]">
          Status ticket telah diperbarui menjadi selesai.
        </p>

        {/* Button Kembali */}
        <button
          onClick={onClose}
          className="mt-6 h-[44px] w-full rounded-[34px] text-[14px] font-semibold text-white active:scale-[0.98] transition-transform"
          style={{
            background:
              "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
            boxShadow:
              "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
          }}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

// ─── Ticket Detail Modal ──────────────────────────────────────────────────────
function TicketModal({
  ticket, onClose, onTandaiSelesai,
}: {
  ticket: Ticket;
  onClose: () => void;
  onTandaiSelesai: (id: string) => void;
}) {
  const [imgOpen, setImgOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
        onClick={onClose}
      >
        {/* Modal card */}
        <div
          className="w-full max-w-[360px] bg-white rounded-[20px] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F2F4F7]">
            <h2 className="text-[17px] font-bold text-[#101828]">Informasi Ticket</h2>
            <button
              onClick={onClose}
              className="w-[28px] h-[28px] rounded-full bg-[#F2F4F7] flex items-center justify-center hover:bg-[#E4E7EC] transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className="w-[14px] h-[14px] text-[#667085]"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-5 space-y-5">

            {/* Row 1: Ticket ID + Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] font-semibold text-[#101828] mb-[3px]">Ticket ID</p>
                <p className="text-[13px] text-[#667085]">{ticket.ticketNumber
  .split("-")
  .slice(0, 2)
  .join("-")}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#101828] mb-[3px]">Status</p>
                <p className={`text-[13px] font-semibold ${
                  ticket.status === "Aktif" ? "text-[#0022FF]" : "text-[#34C759]"
                }`}>
                  {ticket.status === "Aktif" ? "Aktif" : "Selesai"}
                </p>
              </div>
            </div>

            {/* Row 2: Unit + Deskripsi */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] font-semibold text-[#101828] mb-[3px]">Unit</p>
                <p className="text-[13px] text-[#667085]">{ticket.address}</p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#101828] mb-[3px]">Deskripsi Keluhan</p>
                <p className="text-[13px] text-[#667085] leading-[18px]">{ticket.complaint}</p>
              </div>
            </div>

            {/* Kategori */}
            <div>
              <p className="text-[12px] font-semibold text-[#101828] mb-[3px]">Kategori</p>
              <p className="text-[13px] text-[#667085]">{ticket.category}</p>
            </div>

            {/* Tanggal */}
            <div>
              <p className="text-[12px] font-semibold text-[#101828] mb-[3px]">Tanggal Lapor</p>
              <p className="text-[13px] text-[#667085]">{new Date(ticket.createdAt)
  .toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  )}</p>
            </div>

            {/* Foto Keluhan */}
            {ticket.imageUrl && (
              <div>
                <p className="text-[12px] font-semibold text-[#101828] mb-[6px]">Foto Keluhan</p>
                <div
                  className="relative rounded-[10px] overflow-hidden border border-[#EAECF0] cursor-pointer group"
                  onClick={() => setImgOpen(true)}
                >
                  <img
                    src={ticket.imageUrl || undefined}
                    alt="Foto Keluhan"
                    className="w-full h-[140px] object-cover group-hover:opacity-90 transition"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
                    <div className="bg-white/90 rounded-full px-3 py-1 flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="w-[14px] h-[14px] text-[#344054]"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20L17 17" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                      <span className="text-[12px] font-medium text-[#344054]">Perbesar</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Button */}
            {ticket.status === "Aktif" ? (
              <button
                onClick={() => onTandaiSelesai(ticket.id)}
                className="w-full h-[44px] rounded-[34px] text-[14px] font-semibold text-white mt-1 active:scale-[0.98] transition-transform"
                style={{
                  background: "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%)",
                  boxShadow: "0px 4px 4px rgba(1,101,255,0.2), inset 0px -4px 4px rgba(255,255,255,0.2)",
                }}
              >
                Tandai Selesai
              </button>
            ) : (
              <div className="w-full h-[44px] rounded-[34px] bg-[#F2F4F7] flex items-center justify-center mt-1">
                <span className="text-[14px] font-semibold text-[#34C759]">✓ Sudah Selesai</span>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Lightbox full-screen image */}
      {imgOpen && ticket.imageUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 px-4"
          onClick={() => setImgOpen(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={ticket.imageUrl || undefined}
              alt="Foto Keluhan"
              className="rounded-[12px] max-w-[90vw] max-h-[80vh] object-contain shadow-2xl"
            />
            <button
              onClick={() => setImgOpen(false)}
              className="absolute top-3 right-3 w-[32px] h-[32px] rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                className="w-[16px] h-[16px]"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Pesan() {
  const [search,          setSearch]          = useState("");
  const [statusFilter,    setStatusFilter]    = useState<StatusType>("Semua Status");
  const [paymentFilter,   setPaymentFilter]   = useState<PaymentType>("Semua Pembayaran");
  const [statusOpen,      setStatusOpen]      = useState(false);
  const [paymentOpen,     setPaymentOpen]     = useState(false);
  const [selectedTicket,  setSelectedTicket]  = useState<Ticket | null>(null);
  const [showSuccess,     setShowSuccess]     = useState(false);
  const [ticketData, setTicketData] =
  useState<Ticket[]>([]);
  const loadTickets = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        "http://localhost:3000/api/v1/admin/tickets",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setTicketData(
      response.data.data
    );

  } catch (error) {

    console.error(error);

  }

};
useEffect(() => {

  loadTickets();

}, []);

  const filteredTickets = ticketData.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
  item.id.toLowerCase().includes(q) ||
  item.address.toLowerCase().includes(q) ||
  item.category.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "Semua Status" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleTandaiSelesai =
  async (id: string) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.patch(
        `http://localhost:3000/api/v1/admin/tickets/${id}/status`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setSelectedTicket(
        null
      );

      setShowSuccess(
        true
      );

      await loadTickets();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal memperbarui status"
      );

    }

  };

  const closeAll = () => {
    setStatusOpen(false);
    setPaymentOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto" onClick={closeAll}>

      {/* ── HEADER ── */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-[15px] font-normal text-[#98A2B3] tracking-[-0.01em]">Smart Water Meter</p>
          <h1 className="text-[28px] font-semibold text-[#344054] tracking-[-0.03em] mt-[2px]">Daftar Ticketing</h1>
        </div>

        <div className="h-[56px] rounded-full border border-[#EAECF0] bg-white px-4 flex items-center gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] shrink-0">
          <div className="w-[40px] h-[40px] rounded-full bg-[#F2F4F7] flex items-center justify-center">
            <img src={notifIcon} className="w-[20px] h-[20px] opacity-60" alt="notification" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[15px] leading-[20px] font-semibold text-[#344054]">Hi, Admin</p>
            <p className="text-[12px] leading-[18px] font-normal text-[#98A2B3]">Welcome to Aquora</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className="w-[14px] h-[14px] text-[#98A2B3] ml-1"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="w-[300px] h-[40px] rounded-full border border-[#EAECF0] bg-white px-4 flex items-center gap-2 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className="w-[16px] h-[16px] text-[#98A2B3] shrink-0"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20L17 17" />
          </svg>
          <input
            type="text"
            placeholder="Cari unit, penghuni, nomor meter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-[13px] text-[#344054] placeholder:text-[#98A2B3]"
          />
        </div>

        <div className="flex items-center gap-3">
          <PillDropdown
            value={statusFilter} options={STATUS_OPTIONS} open={statusOpen} width="170px"
            onToggle={() => { setStatusOpen(!statusOpen); setPaymentOpen(false); }}
            onSelect={(v) => { setStatusFilter(v); setStatusOpen(false); }}
          />
          <PillDropdown
            value={paymentFilter} options={PAYMENT_OPTIONS} open={paymentOpen} width="195px"
            onToggle={() => { setPaymentOpen(!paymentOpen); setStatusOpen(false); }}
            onSelect={(v) => { setPaymentFilter(v); setPaymentOpen(false); }}
          />
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="rounded-[12px] border border-[#EAECF0] bg-white overflow-hidden shadow-[0_1px_2px_rgba(16,24,40,0.03)]">

        {/* Head */}
        <div className="grid grid-cols-[56px_1fr_1fr_1fr_1fr_1fr] h-[44px] bg-[#FCFCFD] border-b border-[#EAECF0] items-center px-6">
          <p />
          <p className="text-center text-[12px] font-medium text-[#98A2B3]">Ticket ID</p>
          <p className="text-center text-[12px] font-medium text-[#98A2B3]">Unit</p>
          <p className="text-center text-[12px] font-medium text-[#98A2B3]">Kategori</p>
          <p className="text-center text-[12px] font-medium text-[#98A2B3]">Status</p>
          <p className="text-center text-[12px] font-medium text-[#98A2B3]">Tanggal</p>
        </div>

        {/* Rows */}
        {filteredTickets.length === 0 ? (
          <div className="flex items-center justify-center h-[120px] text-[13px] text-[#98A2B3]">
            Tidak ada ticket ditemukan.
          </div>
        ) : (
          filteredTickets.map((ticket, index) => (
            <div
              key={index}
              className="grid grid-cols-[56px_1fr_1fr_1fr_1fr_1fr] h-[54px] items-center px-6 border-b border-[#F2F4F7] last:border-b-0 hover:bg-[#FAFAFA] transition-colors"
            >
              {/* Eye button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="w-[28px] h-[28px] rounded-[6px] border border-[#EAECF0] flex items-center justify-center hover:bg-[#F2F4F7] transition"
                >
                  <img src={Mata} alt="preview" className="w-[14px] h-[14px]" />
                </button>
              </div>

              {/* Ticket ID — klikable */}
              <p
                className="text-center text-[13px] font-semibold text-[#101828] cursor-pointer hover:text-[#0022FF] transition-colors"
                onClick={() => setSelectedTicket(ticket)}
              >
                {ticket.ticketNumber
  .split("-")
  .slice(0, 2)
  .join("-")}
              </p>

              <p className="text-center text-[13px] font-medium text-[#101828]">{ticket.address}</p>
              <p className="text-center text-[13px] font-medium text-[#344054]">{ticket.category}</p>

              <p className={`text-center text-[13px] font-semibold ${
                ticket.status === "Aktif" ? "text-[#0022FF]" : "text-[#34C759]"
              }`}>
                {ticket.status}
              </p>

              <p className="text-center text-[13px] font-medium text-[#667085]">{new Date(ticket.createdAt)
  .toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  )}</p>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL DETAIL TICKET ── */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onTandaiSelesai={handleTandaiSelesai}
        />
      )}

      {/* ── POPUP SUKSES ── */}
      {showSuccess && (
        <SuccessPopup onClose={() => setShowSuccess(false)} />
      )}

    </div>
  );
}