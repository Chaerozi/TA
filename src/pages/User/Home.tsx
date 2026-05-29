import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WaterChart from "../../components/WaterChart";
import WaterChartBar from "../../components/WaterChartBar";

import Air from "../../assets/beranda/Air.svg";
import Belumbayar from "../../assets/beranda/Blumbayar.svg";
import Wallet from "../../assets/beranda/Wallet.svg";
import Graph from "../../assets/beranda/Graph.svg";
import Line from "../../assets/beranda/Line.svg";
import Persen from "../../assets/beranda/persen.svg";
import LogoutIcon from "../../assets/beranda/Logout.svg";
import IconLogout from "../../assets/beranda/IconLogout.svg";

export default function Home() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState<"line" | "graph">("line");
  const [activeTab, setActiveTab] = useState<"Harian" | "Mingguan" | "Bulanan">("Harian");
  const [chartData, setChartData] = useState([]);
  const [userName, setUserName] = useState("");
  const [monthlyVolume, setMonthlyVolume] =
  useState(0);
  const [monthlyDifference, setMonthlyDifference] =
  useState(0);
  const [estimatedBill, setEstimatedBill] =
  useState(0);
  
  const [showLogoutPopup, setShowLogoutPopup] =
  useState(false);

  useEffect(() => {

    const loadMonthlyVolume =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await fetch(
            "http://localhost:3000/api/v1/dashboard/monthly-volume",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const result =
          await response.json();

        setMonthlyVolume(
          result.currentVolume
        );

        setMonthlyDifference(
  result.difference
);

        setEstimatedBill(
          result.estimatedBill
        );

      } catch (error) {

        console.error(error);

      }

    };

  loadMonthlyVolume();

const user =
      localStorage.getItem("user");

    if (user) {

      const parsedUser =
        JSON.parse(user);

      setUserName(
        parsedUser.name
      );

    }

    const loadChart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/v1/dashboard/chart?range=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadChart();
  }, [activeTab]);

  console.log(chartData);

const nextMonthDate =
    new Date();

  nextMonthDate.setMonth(
    nextMonthDate.getMonth() + 1
  );

  nextMonthDate.setDate(1);

  const dueDateText =
    nextMonthDate.toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
      }
    );

const formattedBill =
  new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  ).format(estimatedBill);

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
              {userName}
            </h1>

            <button
  onClick={() => setShowLogoutPopup(true)}
              className="
                absolute top-6 right-5
                w-[46px] h-[46px]
                rounded-[12px] bg-[#2D7DFF]
                flex items-center justify-center
                shadow-md active:scale-[0.96] transition-all
              "
            >
              <img src={LogoutIcon} alt="Logout" className="w-[22px] h-[22px]" />
            </button>
          </div>

          {/* ===== CARDS ===== */}
          <div className="flex gap-3 mt-6">

            {/* Card Pemakaian */}
            <div className="bg-white rounded-[18px] p-4 flex-1 shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
              <div className="flex items-center gap-2 mb-3 h-[30px]">
                <img src={Air} className="w-[30px] h-[30px]" />
                <div className="flex items-center h-[22px] bg-blue-50 text-blue-600 rounded-[8px] px-[8px]">
                  <span className="text-[9px] font-semibold whitespace-nowrap">
                    Rata-rata {(monthlyVolume / 30000).toFixed(1)} m³/hari
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-[10px]">Pemakaian Bulan Ini</p>
              <h2 className="text-[22px] font-bold mt-1 text-gray-900">{(monthlyVolume/1000).toFixed(1)} m³</h2>
              <p
  className={`text-[10px] font-semibold mt-2 ${
    monthlyDifference >= 0
      ? "text-green-500"
      : "text-red-500"
  }`}
>
  {monthlyDifference >= 0 ? "↑" : "↓"}{" "}
  {(Math.abs(monthlyDifference)/1000).toFixed(1)} m³
  dari bulan lalu
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
              <p className="text-gray-400 text-[10px]">Tagihan Berjalan</p>
              <h2 className="text-[22px] font-bold mt-1 text-gray-900">{formattedBill}</h2>
              <p className="text-[10px] font-semibold text-gray-500 mt-2">Jatuh tempo {dueDateText}</p>
            </div>

          </div>
        </div>


        {/* ================= SECTION BAWAH ================= */}
        <div className="bg-[#F3F4F6] rounded-t-[28px] px-4 pt-6 pb-16 -mt-[96px]">

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
                {(["Harian", "Mingguan", "Bulanan"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      h-[30px] px-[12px] text-[12px] font-medium rounded-[6px]
                      flex items-center justify-center transition-all
                      ${activeTab === tab
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
                      : ""
                    }`}
                >
                  <img
                    src={Line}
                    className={`w-[16px] ${chartType === "line" ? "brightness-0 invert" : "opacity-40"}`}
                  />
                </button>

                {/* Graph */}
                <button
                  onClick={() => setChartType("graph")}
                  className={`w-[30px] h-[30px] flex items-center justify-center rounded-[8px]
                    ${chartType === "graph"
                      ? "bg-gradient-to-b from-[#0096FF] to-[#0022FF] shadow-md"
                      : ""
                    }`}
                >
                  <img
                    src={Graph}
                    className={`w-[16px] ${chartType === "graph" ? "brightness-0 invert" : "opacity-40"}`}
                  />
                </button>

              </div>
            </div>

            {/* Usage Stats */}
            <div className="mt-5">
              <p className="text-[12px] text-gray-400">Pemakaian Air Bersih</p>
              <div className="flex items-center gap-3 mt-1">
                <h2 className="text-[30px] font-bold text-gray-900">{(monthlyVolume/1000).toFixed(1)} m³</h2>
                <div className="flex items-center gap-1">
                  <span
  className={`text-[10px] font-semibold mt-2 ${
    monthlyDifference >= 0
      ? "text-green-500"
      : "text-red-500"
  }`}
>
  {monthlyDifference >= 0 ? "↑" : "↓"}{" "}
  {(Math.abs(monthlyDifference)/1000).toFixed(1)} m³
  dari bulan lalu
</span>
                  <img src={Persen} className="w-[14px]" />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="mt-8">
              {chartType === "line"
                  ? <WaterChart range={activeTab} />
                : <WaterChartBar range={activeTab} />
              }
            </div>

          </div>
        </div>
        
{/* POPUP LOGOUT */}
{showLogoutPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">

    <div
      className="
        w-[272px]
        h-[325.16px]
        rounded-[12px]
        bg-white
        shadow-xl
        px-6
        pt-7
      "
    >

      {/* ICON */}
      <div className="flex justify-center">
        <img
          src={IconLogout}
          alt="Logout"
          className="w-[65.41px] h-[65.41px] object-contain"
        />
      </div>

      {/* TITLE */}
      <h2 className="mt-4 text-center text-[16px] font-bold text-[#1B2340]">
        Keluar dari Akun?
      </h2>

      {/* DESC */}
      <p className="mt-4 text-center text-[12px] leading-[14px] text-[#8B93A7]">
        Anda akan keluar dari sesi saat ini dan
        perlu masuk kembali untuk mengakses
        akun Anda.
      </p>

    {/* BUTTON KELUAR */}
<button
  onClick={() => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  }}
  className="
    mt-6
    w-[220.19px]
    h-[36.72px]
    rounded-[34px]
    mx-auto
    block
    text-white
    text-[14px]
    font-medium
    transition-all
    active:scale-[0.98]
  "
  style={{
    background:
      "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow:
      "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
  }}
>
  Keluar
</button>

{/* BUTTON BATAL */}
<button
  onClick={() => setShowLogoutPopup(false)}
  className="
    mt-4
    w-[220.19px]
    h-[36.72px]
    rounded-[34px]
    mx-auto
    block
    border
    border-[#E5E7EB]
    bg-white
    text-[#1B2340]
    text-[14px]
    font-medium
  "
>
  Batal
</button>

    </div>
  </div>
)}
      </div>
    </div>
  );
}