import { useNavigate } from "react-router-dom";
import axios from "axios";

import Panah from "../../assets/Tagihan/Panah.svg";
import BelumBayar from "../../assets/beranda/Blumbayar.svg";
import Wallet from "../../assets/beranda/Wallet.svg";
import Unduh from "../../assets/Tagihan/Unduh.svg";

export default function BayarTagihan() {

  const navigate = useNavigate();
  const handlePayment = async () => {
  try {

    const response = await axios.post(
      "http://localhost:3000/api/v1/payment",
      {
        billId: "BILL-002"
      }
    );

    const paymentUrl = response.data.data.paymentUrl;

    // Redirect ke Xendit
    window.location.href = paymentUrl;

  } catch (error) {
    console.error(error);

    alert("Gagal membuat pembayaran");
  }
};

  return (
    <div className="min-h-screen bg-[#E5E7EB] font-geist flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F4F6] shadow-sm relative px-4 pt-10 pb-10">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">

       <button
        onClick={() => navigate(-1)}
        className="w-[36px] h-[36px] bg-white flex items-center justify-center shadow-sm"
        style={{ borderRadius: "34px" }}
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
onClick={handlePayment}
  className="w-full h-[40px] flex items-center justify-center gap-2 text-white text-[14px] font-medium active:scale-[0.97] transition"
  style={{
    borderRadius: "34px",
    border: "1px solid #70B9FF",
    background: "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow: "0 4px 4px 0 rgba(1, 101, 255, 0.20), 0 -4px 4px 0 rgba(255, 255, 255, 0.20) inset",
  }}
>
  <img src={Wallet} className="w-[18px] h-[18px]" />
  Bayar Tagihan
</button>

        {/* ================= BUTTON UNDUH ================= */}
        <button
        className="w-full h-[40px] flex items-center justify-center gap-2 text-gray-700 text-[14px] font-medium mt-3 border border-gray-200 bg-white"
        style={{
          borderRadius: "34px",
        }}
      >
        <img src={Unduh} className="w-[18px] h-[18px]" />
        Unduh Invoice
      </button>
      </div>
{/* ================= RIWAYAT TAGIHAN ================= */}
<div className="mt-6 bg-white rounded-[18px] p-5 shadow-sm">

  {/* Title */}
  <div className="mb-4">
    <h2 className="text-[16px] font-semibold text-gray-900">
      Riwayat Tagihan
    </h2>

    <p className="text-[12px] text-gray-400">
      3 bulan terakhir
    </p>
  </div>


  {/* Header Table */}
  <div className="grid grid-cols-4 text-[11px] text-gray-400 font-semibold border-b pb-2 mb-2">

    <p>PERIODE</p>
    <p>VOLUME</p>
    <p>TOTAL TAGIHAN</p>
    <p>TANGGAL BAYAR</p>

  </div>


  {/* Row 1 */}
  <div className="grid grid-cols-4 text-[13px] py-3 border-b">

    <p className="text-gray-700">
      Desember 2025
    </p>

    <p className="text-gray-500">
      11.8 m³
    </p>

    <p className="font-semibold text-gray-800">
      Rp 175.000
    </p>

    <p className="text-gray-500">
      20 Des 2025
    </p>

  </div>


  {/* Row 2 */}
  <div className="grid grid-cols-4 text-[13px] py-3 border-b">

    <p className="text-gray-700">
      November 2025
    </p>

    <p className="text-gray-500">
      9.8 m³
    </p>

    <p className="font-semibold text-gray-800">
      Rp 148.000
    </p>

    <p className="text-gray-500">
      19 Nov 2025
    </p>

  </div>


  {/* Row 3 */}
  <div className="grid grid-cols-4 text-[13px] py-3">

    <p className="text-gray-700">
      Oktober 2025
    </p>

    <p className="text-gray-500">
      11.5 m³
    </p>

    <p className="font-semibold text-gray-800">
      Rp 171.000
    </p>

    <p className="text-gray-500">
      22 Okt 2025
    </p>

  </div>

</div>
      </div>
    </div>
  );
}