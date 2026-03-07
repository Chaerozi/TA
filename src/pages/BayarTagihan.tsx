import { useNavigate } from "react-router-dom";

import Panah from "../assets/Tagihan/panah.svg";
import BelumBayar from "../assets/beranda/Blumbayar.svg";
import Wallet from "../assets/beranda/Wallet.svg";
import Unduh from "../assets/Tagihan/Unduh.svg";

export default function BayarTagihan() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 pt-10 pb-10">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">

       <button
        onClick={() => navigate(-1)}
        className="w-[36px] h-[36px] rounded-[10px] bg-white flex items-center justify-center shadow-sm"
      >
        <img src={Panah} className="w-[29px] h-[29px]" />
      </button>
        <h1 className="text-[16px] font-semibold">
          Bayar Tagihan
        </h1>

        <div className="w-[36px]" />

      </div>


      {/* ================= CARD TAGIHAN ================= */}
      <div className="bg-white rounded-[18px] p-5 shadow-sm">

        {/* Header Card */}
<div className="flex items-center gap-3 mb-5">

  <img src={BelumBayar} className="w-[40px] h-[40px]" />

  <div>
    <h2 className="text-[16px] font-semibold">
      Tagihan Januari 2026
    </h2>

    <p className="text-[12px] text-gray-400">
      Periode: 1 – 31 Januari 2026
    </p>
  </div>

</div>


        {/* DETAIL GRID */}
        <div className="grid grid-cols-2 gap-y-4 text-[13px] mb-5">

          <div>
            <p className="text-gray-400">Jatuh Tempo</p>
            <p className="font-semibold">25 Jan 2026</p>
          </div>

          <div>
            <p className="text-gray-400">Biaya Administrasi</p>
            <p className="font-semibold">Rp 2.500</p>
          </div>

          <div>
            <p className="text-gray-400">Pemakaian</p>
            <p className="font-semibold">12.4 m³</p>
          </div>

          <div>
            <p className="text-gray-400">Pajak</p>
            <p className="font-semibold">Rp 18.700</p>
          </div>

          <div>
            <p className="text-gray-400">Harga /m³</p>
            <p className="font-semibold">Rp 14.920</p>
          </div>

          <div>
            <p className="text-gray-400">Denda (jika terlambat)</p>
            <p className="font-semibold">Rp 0</p>
          </div>

        </div>


        {/* TOTAL PEMBAYARAN */}
        <div className="w-full h-[58px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[14px] px-5 flex items-center justify-between mb-5">

        <p className="text-gray-400 text-[14px]">
          Total Pembayaran
        </p>

        <p className="text-[18px] font-semibold text-gray-900">
          Rp 185.000
        </p>

      </div>

        {/* ================= BUTTON BAYAR ================= */}
        <button
        className="w-full h-[40px] rounded-[14px] flex items-center justify-center gap-2 text-white text-[14px] font-medium"
        style={{
          background: "linear-gradient(180deg,#60A5FA 0%,#2563EB 100%)",
          boxShadow: "0 10px 28px rgba(37,99,235,0.38)",
        }}
      >
        <img src={Wallet} className="w-[18px] h-[18px]" />
        Bayar Tagihan
      </button>

        {/* ================= BUTTON UNDUH ================= */}
        <button
        className="w-full h-[40px] rounded-[14px] flex items-center justify-center gap-2 text-gray-700 text-[14px] font-medium mt-3 border border-gray-200 bg-white"
      >
        <img src={Unduh} className="w-[18px] h-[18px]" />
        Unduh Invoice
      </button>
      </div>

    </div>
  );
}