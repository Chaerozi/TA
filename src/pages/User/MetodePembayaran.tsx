import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Wallet from "../../assets/beranda/Wallet.svg"
import Panah from "../../assets/Tagihan/Panah.svg"
import gopay from "../../assets/Tagihan/Gopay.png"
import link from "../../assets/Tagihan/LinkAja.svg.png"
import dana from "../../assets/Tagihan/Dana.png"
import shopeepay from "../../assets/Tagihan/Shope.png"
import qris from "../../assets/Tagihan/Qr.svg"

export default function MetodePembayaran() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("GoPay")

  const methods = [
    {
      name: "GoPay",
      icon: gopay,
      selectable: true,
    },
    {
      name: "LinkAja",
      icon: link,
      action: "Hubungkan",
      desc: "Bonus Data 500MB",
    },
    {
      name: "DANA",
      icon: dana,
      action: "Sambungkan",
    },
    {
      name: "ShopeePay",
      icon: shopeepay,
      selectable: true,
      desc: "Diskon sd 50K\nDiskon ShopeePay hingga 25K",
    },
    {
      name: "QRIS",
      icon: qris,
      selectable: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[#E5E7EB] font-geist flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F6FA] shadow-sm relative flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-8 bg-white shadow-sm">

       <button
        onClick={() => navigate(-1)}
        className="w-[36px] h-[36px] bg-white flex items-center justify-center shadow-sm"
        style={{ borderRadius: "34px" }}
      >
        <img src={Panah} className="w-[29px] h-[29px]" />
      </button>
        <h1 className="text-[16px] font-semibold text-gray-900">
          Metode Pembayaran
        </h1>

        <div className="w-[36px]" />

      </div>

      {/* ================= LIST ================= */}
      <div className="mt-2 bg-white flex-1">

        {methods.map((item, i) => (
          <div
            key={i}
            onClick={() => item.selectable && setSelected(item.name)}
            className={`flex items-center justify-between px-5 border-b border-gray-100 last:border-0 ${
              item.selectable ? "cursor-pointer active:bg-gray-50" : ""
            }`}
            style={{ paddingTop: 16, paddingBottom: 16 }}
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <img
                src={item.icon}
                className="w-9 h-9 object-contain"
              />

              <div>
                <p className="text-[14px] font-semibold text-gray-900 leading-snug">
                  {item.name}
                </p>

                {item.desc && (
                  <p className="text-[11px] text-gray-400 whitespace-pre-line leading-snug mt-[2px]">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT */}
            {item.action ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  alert(`${item.action} ${item.name}`)
                }}
                className="flex items-center gap-[2px] text-red-500 text-[13px] font-semibold active:opacity-70 transition"
              >
                {item.action}
                <span className="text-[16px] leading-none">›</span>
              </button>
            ) : (
              <div
                className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-all ${
                  selected === item.name
                    ? "border-[2px] border-blue-500"
                    : "border-[1.5px] border-gray-300"
                }`}
              >
                {selected === item.name && (
                  <div className="w-[11px] h-[11px] bg-blue-500 rounded-full" />
                )}
              </div>
            )}
          </div>
        ))}

      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-white px-4 pt-4 pb-8 border-t border-gray-100">

        <div className="flex justify-between items-center mb-4">
          <p className="text-[12px] text-gray-400">
            Harga Total
          </p>
          <p className="text-[15px] font-bold text-gray-900">
            Rp 175.000
          </p>
        </div>

        <button
          onClick={() => {
  if (selected === "QRIS") {
    navigate("/qris-payment")
  } else {
    navigate("/payment-success") // untuk metode lain (simulasi)
  }
}}
           className="w-full h-[40px] flex items-center justify-center gap-2 text-white text-[14px] font-medium"
  style={{
    borderRadius: "34px",
    border: "1px solid #70B9FF",
    background: "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow: "0 4px 4px 0 rgba(1, 101, 255, 0.20), 0 -4px 4px 0 rgba(255, 255, 255, 0.20) inset",
  }}
>

          <img src={Wallet} className="w-[20px] h-[20px]" />
          Bayar Tagihan
        </button>

      </div>
      </div>
    </div>
  )
}