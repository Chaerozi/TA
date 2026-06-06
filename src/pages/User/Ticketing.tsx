import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Panah from "../../assets/Tagihan/Panah.svg";
import Berhasil from "../../assets/adminDasbord/Berhasil.svg";

export default function Ticketing() {
  const navigate = useNavigate();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<"buat" | "daftar">("buat");
  const [kategori, setKategori] = useState("");
  const [keluhan, setKeluhan] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* HEADER */}
      <div className="px-5 pt-6">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 w-[32px] h-[32px] rounded-[10px] border border-[#E4E7EC] flex items-center justify-center bg-white"
          >
            <img src={Panah} alt="Back" className="w-[18px] h-[18px]" />
          </button>

          <h1 className="text-[16px] font-semibold text-[#101828]">
            Buat Laporan
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-5 pt-8">

        {/* TAB */}
        <div className="h-[48px] bg-[#EAF0F8] rounded-[10px] p-[3px] flex">
          <button
            onClick={() => setActiveTab("buat")}
            className={`
              flex-1 rounded-[8px] text-[14px] font-medium transition-all
              ${activeTab === "buat" ? "bg-white text-[#1B2340]" : "text-[#98A2B3]"}
            `}
          >
            Buat Ticket
          </button>

          <button
            onClick={() => setActiveTab("daftar")}
            className={`
              flex-1 rounded-[8px] text-[14px] font-medium transition-all
              ${activeTab === "daftar" ? "bg-white text-[#1B2340]" : "text-[#98A2B3]"}
            `}
          >
            Daftar Ticket
          </button>
        </div>

        {/* FORM BUAT TICKET */}
        {activeTab === "buat" && (
          <>
            {/* Kategori Kendala */}
            <div className="mt-6">
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Kategori Kendala
              </label>

              <div className="relative">
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full h-[48px] rounded-[10px] border border-[#D0D5DD] px-4 pr-14 text-[14px] text-[#667085] outline-none appearance-none bg-white"
                >
                  <option value="">Pilih Kendala</option>
                  <option value="Meter Rusak">Meter Rusak</option>
                  <option value="Kebocoran">Kebocoran</option>
                  <option value="Air Tidak Mengalir">Air Tidak Mengalir</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                <svg
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3] pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* Deskripsi Keluhan */}
            <div className="mt-6">
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Deskripsi Keluhan
              </label>

              <textarea
                value={keluhan}
                onChange={(e) => setKeluhan(e.target.value)}
                placeholder="Tulis Keluhan"
                className="w-full h-[140px] rounded-[10px] border border-[#D0D5DD] p-4 text-[14px] text-[#667085] resize-none outline-none"
              />
            </div>

            {/* Upload Foto */}
            <div className="mt-6">
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Upload Foto (opsional)
              </label>

              <input type="file" id="upload" className="hidden" />

              <label
                htmlFor="upload"
                className="inline-flex items-center justify-center w-[74px] h-[32px] rounded-[6px] border border-[#D0D5DD] text-[14px] text-[#98A2B3] cursor-pointer"
              >
                Upload
              </label>
            </div>
          </>
        )}

        {/* DAFTAR TICKET */}
        {activeTab === "daftar" && (
          <div className="mt-4 border border-[#D0D5DD] rounded-[6px] overflow-hidden">

            {/* Ticket 1 - Open */}
            <div className="p-3 border-b border-dashed border-[#D0D5DD]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#98A2B3]">TK-0001</span>
                  <span className="text-[12px] font-semibold text-[#1B2340]">Unit 101</span>
                </div>
                <span className="text-[12px] font-medium text-[#2563FF]">Open</span>
              </div>

              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-[12px] leading-[16px] text-[#667085]">
                  Kebocoran Penggunaan air meningkat secara tiba-tiba meskipun pemakaian normal.
                </p>
                <span className="text-[10px] text-[#98A2B3] shrink-0">15 Apr 2026</span>
              </div>
            </div>

            {/* Ticket 2 - Solved */}
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[#98A2B3]">TK-0002</span>
                  <span className="text-[12px] font-semibold text-[#1B2340]">Unit 101</span>
                </div>
                <span className="text-[12px] font-medium text-[#34C759]">Solved</span>
              </div>

              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-[12px] leading-[16px] text-[#667085]">
                  Kebocoran Penggunaan air meningkat secara tiba-tiba meskipun pemakaian normal.
                </p>
                <span className="text-[10px] text-[#98A2B3] shrink-0">15 Apr 2026</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* BUTTON KIRIM TICKET */}
      {activeTab === "buat" && (
        <div className="px-5 pb-8">
          <button
            onClick={() => setShowSuccessPopup(true)}
            className="w-full h-[40px] rounded-[34px] flex items-center justify-center text-white text-[14px] font-medium active:scale-[0.98]"
            style={{
              background:
                "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
              boxShadow:
                "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
            }}
          >
            Kirim Ticket
          </button>
        </div>
      )}

      {/* POPUP BERHASIL */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6">
          <div className="w-[272px] rounded-[16px] bg-white px-6 pt-7 pb-6 shadow-xl">
            <div className="flex justify-center">
              <img
                src={Berhasil}
                alt="Berhasil"
                className="w-[72px] h-[72px] object-contain"
              />
            </div>

            <h2 className="mt-5 text-center text-[18px] font-bold text-[#1B2340]">
              Ticket Berhasil Dibuat
            </h2>

            <p className="mt-2 text-center text-[14px] leading-[22px] text-[#8B93A7]">
              Ticket Anda sedang diproses admin.
            </p>

            <button
              onClick={() => {
                setShowSuccessPopup(false);
                setActiveTab("daftar");
              }}
              className="mt-6 h-[40px] w-full rounded-[34px] text-[14px] font-medium text-white active:scale-[0.98]"
              style={{
                background:
                  "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
                boxShadow:
                  "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
              }}
            >
              Lihat Ticket
            </button>

            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-3 h-[40px] w-full rounded-[34px] border border-[#E5E7EB] bg-white text-[14px] font-medium text-[#1B2340] active:scale-[0.98]"
            >
              Kembali
            </button>
          </div>
        </div>
      )}

    </div>
  );
}