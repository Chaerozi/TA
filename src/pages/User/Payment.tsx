import { useNavigate } from "react-router-dom"

import Panah from "../../assets/Tagihan/Panah.svg"
import qris from "../../assets/Tagihan/Qr.svg"
import codeqris from "../../assets/Tagihan/scan.svg"

export default function QrisPayment() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-white flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">

     <button
            onClick={() => navigate(-1)}
            className="w-[36px] h-[36px] bg-white flex items-center justify-center shadow-sm"
            style={{ borderRadius: "34px" }}
          >
            <img src={Panah} className="w-[29px] h-[29px]" />
          </button>
        <h1 className="text-[16px] font-semibold text-gray-900">
          Status Pembayaran
        </h1>

        <div className="w-[36px]" />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex flex-col px-5 pt-3">

        {/* METHOD LABEL */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-8">
          <img src={qris} className="w-[28px] h-[28px] object-contain" />
          <p className="text-[14px] font-bold text-blue-600">
            Qris
          </p>
        </div>

        {/* QR CODE — pakai asset scan.svg */}
        <div className="flex justify-center mb-8">
          <img
            src={codeqris}
            className="w-[230px] h-[230px] object-contain"
            alt="QR Code QRIS"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="px-2">
          <p className="text-[14px] font-bold text-gray-900 text-center leading-snug mb-3">
            Scan QR ini menggunakan aplikasi e-wallet atau mobile banking yang mendukung QRIS.
          </p>

          <p className="text-[12px] text-gray-400 text-center leading-relaxed mb-2">
            Sekarang tidak terlihat berapa yang harus dibayar. Ini penting untuk kepercayaan user.
          </p>

          <p className="text-[12px] text-gray-400 text-center italic">
            "Total Pembayaran: Rp 185.000"
          </p>
        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-5 pt-4 pb-8">

        {/* BUTTON CEK STATUS */}
        <button
          onClick={() => navigate("/payment-success")}
            className="w-full h-[40px] flex items-center justify-center gap-2 text-white text-[14px] font-medium"
  style={{
    borderRadius: "34px",
    border: "1px solid #70B9FF",
    background: "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow: "0 4px 4px 0 rgba(1, 101, 255, 0.20), 0 -4px 4px 0 rgba(255, 255, 255, 0.20) inset",
  }}
>
          Cek Status Pembayaran
        </button>

        {/* BUTTON KEMBALI */}
        <button
          onClick={() => navigate(-1)}
           className="w-full h-[40px] flex items-center justify-center gap-2 text-gray-700 text-[14px] font-medium mt-3 border border-gray-200 bg-white"
           style={{
             borderRadius: "34px",
           }}
      >
          Kembali
        </button>

      </div>
    </div>
  )
}