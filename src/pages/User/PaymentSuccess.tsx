import { useNavigate } from "react-router-dom"

import Panah from "../../assets/Tagihan/Panah.svg"
import SuccessIcon from "../../assets/Tagihan/check.svg"

export default function PaymentSuccess() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-white flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
<button
            onClick={() => navigate(-1)}
            className="w-[36px] h-[36px] rounded-[10px] bg-white flex items-center justify-center shadow-sm"
          >
            <img src={Panah} className="w-[29px] h-[29px]" />
          </button>

        <h1 className="text-[16px] font-semibold text-gray-900">
          Status Pembayaran
        </h1>

        <div className="w-[36px]" />

      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex flex-col items-center justify-start px-8 pt-20">

        {/* SUCCESS ICON */}
        <img
          src={SuccessIcon}
          alt="Success"
          className="w-[100px] h-[100px] mb-8"
        />

        {/* TITLE */}
        <h2 className="text-[22px] font-bold text-gray-900 text-center mb-3 leading-snug">
          Pembayaran Berhasil 🎉
        </h2>

        {/* SUBTITLE */}
        <p className="text-[14px] text-gray-400 text-center leading-relaxed">
  Tagihan Januari 2026 Anda telah 
  <br />
  berhasil dibayarkan.
</p>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-5 pb-10">

        <button
          type="button"
          onClick={() => navigate("/home")}
          className="w-full h-[40px] rounded-[14px] flex items-center justify-center gap-2 text-white text-[14px] font-medium"
  style={{
    background: "linear-gradient(180deg,#60A5FA 0%,#2563EB 100%)",
    boxShadow: "0 10px 28px rgba(37,99,235,0.38)",
  }}
>
          Kembali
        </button>

      </div>
    </div>
  )
}