import { useState } from "react";
import LineWave from "../assets/beranda/Line.svg";
import TagihIcon from "../assets/beranda/Tagih.svg";
import VolumIcon from "../assets/beranda/Volum.svg";

const BarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end justify-between gap-4 h-56 pt-8 px-2 md:h-64 md:gap-6">
      {data.map((item) => {
        const height = (item.value / max) * 100;

        return (
          <div key={item.label} className="flex flex-col items-center gap-3 flex-1">
            <div className="w-full h-44 md:h-52 flex items-end">
              <div
                className="w-full rounded-2xl"
                style={{
                  height: `${height}%`,
                  background:
                    "linear-gradient(180deg,#1F6FFF 0%, #0022FF 100%)",
                }}
              />
            </div>
            <span className="text-xs md:text-sm text-gray-500 font-medium">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function Home() {
  const [period, setPeriod] = useState("1 Bulan");

  const weeklyData = [
    { label: "Minggu 1", value: 75 },
    { label: "Minggu 2", value: 45 },
    { label: "Minggu 3", value: 38 },
    { label: "Minggu 4", value: 90 },
  ];

  return (
    <div className="min-h-screen bg-[#EDEFF4] flex justify-center">

      {/* MOBILE WRAPPER TETAP */}
      <div className="w-[390px] md:w-full bg-[#F6F7FB] min-h-screen overflow-hidden">

        {/* ================= HEADER ================= */}
        <div
          className="relative px-6 pt-16 pb-28 md:pt-32 md:pb-36 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg,#3EA6FF 0%,#1F6FFF 55%,#0022FF 100%)",
          }}
        >
          <p className="text-white text-base md:text-lg font-medium mb-3">
            Pemakaian Bulan Ini
          </p>

          <div className="flex items-center justify-center gap-2 mb-3">
            <svg
              className="w-4 md:w-5 h-4 md:h-5"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.85)"
            >
              <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0014 0c0-4.5-7-12-7-12z" />
            </svg>
            <span className="text-sm md:text-base text-white/80">
              Air Bersih
            </span>
          </div>

          <div className="flex justify-center items-start gap-1 mb-3">
            <span className="text-white font-bold text-[56px] md:text-[72px] leading-none">
              12.4
            </span>
            <span className="text-white text-xl md:text-2xl font-semibold mt-3 md:mt-4">
              m³
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-white/90 text-sm md:text-base">
            <svg
              className="w-4 md:w-5 h-4 md:h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            +12% dari bulan lalu
          </div>

          <img
            src={LineWave}
            alt="wave"
            className="absolute bottom-0 left-0 w-full opacity-70"
          />
        </div>

        {/* ================= BODY ================= */}
        <div className="bg-[#F6F7FB] rounded-t-[28px] md:rounded-none px-5 md:px-20 pt-6 md:pt-16 pb-12 space-y-6 md:space-y-0">

          {/* DESKTOP GRID */}
          <div className="md:grid md:grid-cols-2 md:gap-10">

            {/* ================= TAGIHAN CARD ================= */}
            <div className="bg-white rounded-3xl shadow-md p-6 md:p-8">
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-600 text-sm md:text-base font-medium">
                  Tagihan kamu
                </span>
                <span className="bg-red-50 text-red-500 text-xs md:text-sm px-3 py-1 rounded-full font-medium">
                  Belum Bayar
                </span>
              </div>

              <div className="flex items-center gap-4 md:gap-6 mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <img src={TagihIcon} className="w-7 h-7 md:w-8 md:h-8" />
                </div>

                <div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    Rp 185.000
                  </p>
                  <p className="text-sm text-gray-400">
                    Jatuh tempo pada 25 Januari 2026
                  </p>
                </div>
              </div>

              <button
                className="w-full h-[52px] md:h-[56px] rounded-2xl text-white font-semibold text-[15px] md:text-base"
                style={{
                  background:
                    "linear-gradient(180deg,#1F6FFF 0%,#0022FF 100%)",
                }}
              >
                Bayar Tagihan
              </button>
            </div>

            {/* ================= VOLUME CARD ================= */}
            <div className="bg-white rounded-3xl shadow-md px-6 pt-6 pb-8 mt-6 md:mt-0 md:p-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={VolumIcon} className="w-4 md:w-5 h-4 md:h-5" />
                  <span className="text-gray-700 text-sm md:text-base font-medium">
                    Volume pemakaian
                  </span>
                </div>

                <button
                  onClick={() =>
                    setPeriod(period === "1 Bulan" ? "3 Bulan" : "1 Bulan")
                  }
                  className="border border-gray-200 text-sm md:text-base px-3 py-1.5 rounded-lg text-gray-600"
                >
                  {period}
                </button>
              </div>

              <BarChart data={weeklyData} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}