import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WaterChart from "../../components/WaterChart";
import AlertUsage from "../../components/AlertUsage";
import WaterChartBar from "../../components/WaterChartBar";

import Air from "../../assets/beranda/Air.svg";
import Meetran from "../../assets/beranda/Meetran.svg";
import Belumbayar from "../../assets/beranda/Blumbayar.svg";
import Wallet from "../../assets/beranda/Wallet.svg";
import Graph from "../../assets/beranda/Graph.svg";
import Line from "../../assets/beranda/Line.svg";
import Persen from "../../assets/beranda/persen.svg";

export default function Home() {

  const navigate = useNavigate();
  const [chartType, setChartType] = useState<"line" | "graph">("line");
  const [activeTab, setActiveTab] = useState<"Harian" | "Mingguan" | "Bulanan">("Harian");

  const isAnomaly = true; // simulasi dari backend

  return (
    <div className="min-h-screen bg-[#E5E7EB] font-geist flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F4F6] shadow-sm relative overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-b from-[#0096FF] to-[#0022FF] px-5 pt-12 pb-32 text-white">

        {/* Greeting */}
        <p className="text-[12px] opacity-80">
          Halo selamat datang,
        </p>

        <div className="flex justify-between items-center mt-0">

          <h1 className="text-[24px] font-semibold tracking-tight">
            Ardhika 👋
          </h1>

          {/* Meteran aktif */}
          <div className="bg-white rounded-[14px] px-3 py-2 flex items-center gap-2 shadow-lg">

            <img src={Meetran} className="w-[22px] h-[22px]" />

            <div>
              <p className="text-green-600 text-[11px] font-semibold">
                Meteran aktif
              </p>

              <p className="text-gray-400 text-[10px]">
                Update 5 menit lalu
              </p>
            </div>

          </div>

        </div>

        {/* ALERT */}
        {isAnomaly && <AlertUsage />}

        {/* ===== CARDS ===== */}
        <div className="flex gap-3 mt-6">

          {/* Card Pemakaian */}
<div className="bg-white rounded-[18px] p-4 flex-1 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">

  <div className="flex items-center gap-2 mb-3 h-[30px]">

    <img src={Air} className="w-[30px] h-[30px]" />

    <div className="flex items-center h-[22px] bg-blue-50 text-blue-600 rounded-[8px] px-[8px]">
      <span className="text-[9px] font-semibold whitespace-nowrap">
        Rata-rata 0.4 m³/hari
      </span>
    </div>

  </div>

  <p className="text-gray-400 text-[10px]">
    Pemakaian Bulan Ini
  </p>

  <h2 className="text-[22px] font-bold mt-1 text-gray-900">
    12.4 m³
  </h2>

  <p className="text-green-500 text-[10px] font-semibold mt-2">
    ↑ 18% dari bulan lalu
  </p>

</div>

         {/* Card Tagihan */}
<div className="bg-white rounded-[18px] p-4 flex-1 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">

  <div className="flex items-center gap-2 mb-3 h-[30px]">

    <img src={Belumbayar} className="w-[30px] h-[30px]" />

    <div className="flex items-center h-[22px] bg-red-50 text-red-500 rounded-[8px] px-[8px]">
      <span className="text-[9px] font-semibold whitespace-nowrap">
        Belum dibayar
      </span>
    </div>

  </div>

  <p className="text-gray-400 text-[10px]">
    Tagihan Berjalan
  </p>

  <h2 className="text-[22px] font-bold mt-1 text-gray-900">
    Rp 185.000
  </h2>

  <p className="text-[10px] font-semibold text-gray-500 mt-2">
    Jatuh tempo 25 Jan
  </p>

</div>

        </div>

      </div>


      {/* ================= SECTION BAWAH ================= */}
      <div className="bg-[#F3F4F6] rounded-t-[28px] px-4 pt-6 pb-16 -mt-[96px]">

        {/* Bayar Tagihan */}
     
  {/* Bayar Tagihan */}
<button
  onClick={() => navigate("/bayar-tagihan")}
  className="w-full h-[40px] rounded-[34px] flex items-center justify-center gap-3 text-white text-[14px] font-medium"
  style={{
    background:
      "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow:
      "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
  }}
>
  <img src={Wallet} className="w-[18px] h-[18px]" />
  Bayar Tagihan
</button>



        {/* ===== CHART CONTAINER ===== */}
      <div className="mt-5">

 {/* Tabs + Chart Switch */}
<div className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-[16px] p-[6px] flex items-center justify-between">

  {/* Tabs */}
  <div className="flex items-center gap-[10px]">

    {(["Harian","Mingguan","Bulanan"] as const).map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`
          h-[30px]
          px-[12px]
          text-[12px]
          font-medium
          rounded-[6px]
          flex items-center justify-center
          transition-all
          ${
            activeTab === tab
              ? "bg-[#D0E7FF] border border-[#3B82F6] text-black"
              : "text-gray-400"
          }
        `}
      >
        {tab}
      </button>
    ))}

  </div>


  {/* Chart Switch */}
  <div className="flex items-center gap-1 bg-[#E5E7EB] rounded-[10px] p-[3px]">

    {/* Line */}
    <button
      onClick={() => setChartType("line")}
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-[8px]
      ${chartType === "line"
        ? "bg-gradient-to-b from-[#0096FF] to-[#0022FF] shadow-md"
        : ""}`}
    >
      <img
        src={Line}
        className={`w-[16px]
        ${chartType === "line"
          ? "brightness-0 invert"
          : "opacity-40"}`}
      />
    </button>


    {/* Graph */}
    <button
      onClick={() => setChartType("graph")}
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-[8px]
      ${chartType === "graph"
        ? "bg-gradient-to-b from-[#0096FF] to-[#0022FF] shadow-md"
        : ""}`}
    >
      <img
        src={Graph}
        className={`w-[16px]
        ${chartType === "graph"
          ? "brightness-0 invert"
          : "opacity-40"}`}
      />
    </button>

  </div>

</div>


          {/* Usage Stats */}
          <div className="mt-5">

            <p className="text-[12px] text-gray-400">
              Pemakaian Air Bersih
            </p>

            <div className="flex items-center gap-3 mt-1">

              <h2 className="text-[30px] font-bold text-gray-900">
                12.4 m³
              </h2>

              <div className="flex items-center gap-1">

                <span className="text-green-500 text-[12px] font-semibold">
                  +12% dari bulan lalu
                </span>

                <img src={Persen} className="w-[14px]" />

              </div>

            </div>

          </div>


  {/* Chart */}
<div className="mt-8">

  {activeTab === "Harian" && (
    chartType === "line" ? <WaterChart range={activeTab} /> : <WaterChartBar range={activeTab} />
  )}

  {activeTab === "Mingguan" && (
    chartType === "line" ? <WaterChart range={activeTab} /> : <WaterChartBar range={activeTab} />
  )}

  {activeTab === "Bulanan" && (
    chartType === "line" ? <WaterChart range={activeTab} /> : <WaterChartBar range={activeTab} />
  )}

</div>

        </div>

      </div>

      </div>
    </div>
  );
}