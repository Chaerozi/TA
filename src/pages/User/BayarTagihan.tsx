import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Panah from "../../assets/Tagihan/Panah.svg";
import BelumBayar from "../../assets/beranda/Blumbayar.svg";
import Wallet from "../../assets/beranda/Wallet.svg";
import Unduh from "../../assets/Tagihan/Unduh.svg";

export default function BayarTagihan() {
const handleDownloadInvoice =
async () => {

  if (
    currentBill?.status !== "PAID"
  ) {
    return;
  }

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await fetch(
        `http://localhost:3000/api/v1/payment/invoice/${currentBill.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const blob =
      await response.blob();

    const url =
      window.URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      `invoice-${currentBill.billNumber}.pdf`;

    document.body.appendChild(
      a
    );

    a.click();

    a.remove();

    window.URL.revokeObjectURL(
      url
    );

  } catch (error) {

    console.error(error);

    alert(
      "Gagal mengunduh invoice"
    );

  }

};
  const navigate = useNavigate();
  const [monthlyVolume, setMonthlyVolume] =
  useState(0);

const [unitPrice, setUnitPrice] =
  useState(0);

const [historyBills, setHistoryBills] =
  useState<any[]>([]);

  const [currentBill, setCurrentBill] =
  useState<any>(null);
  const isPaidOff =
  currentBill?.isCompleted;
  const canDownloadInvoice =
  currentBill?.status === "PAID";

  useEffect(() => {

  const loadBillData = async () => {

    try {

      const token =
        localStorage.getItem("token");

const currentBillResponse =
  await fetch(
    "http://localhost:3000/api/v1/dashboard/current-bill",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

const currentBillData =
  await currentBillResponse.json();

setCurrentBill(
  currentBillData.data
);

      // DASHBOARD
      const dashboardResponse =
        await fetch(
          "http://localhost:3000/api/v1/dashboard/monthly-volume",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const dashboardData =
        await dashboardResponse.json();

      setMonthlyVolume(
        dashboardData.currentVolume
      );

      setUnitPrice(
        dashboardData.unitPrice
      );

      // USER
      const user =
        JSON.parse(
          localStorage.getItem("user") || "{}"
        );
        console.log(user);

      // BILL HISTORY
      const billsResponse =
        await fetch(
          `http://localhost:3000/api/v1/billing/user/${user.id}`
        );

      const billsData =
        await billsResponse.json();
        console.log(billsData);

      setHistoryBills(
        billsData.data.slice(0, 3)
      );

    } catch (error) {

      console.error(error);

    }

  };

  loadBillData();

}, []);

const handlePay = async () => {

  if (isPaidOff) {
    return;
  }
  try {

    console.log("CURRENT BILL", currentBill);
console.log("BILL ID", currentBill?.id);

   const response = await axios.post(
  "http://localhost:3000/api/v1/payment",
  {
    billId: currentBill.id,
  }
);
    const paymentUrl =
      response.data.data.paymentUrl;

    window.location.href = paymentUrl;

  } catch (error) {
    console.error(error);

    alert("Gagal membuat pembayaran");
  }
};
const adminFee = 2500;

const waterPrice =
  monthlyVolume * unitPrice;

const tax =
  waterPrice * 0.1;

const penalty = 0;

const totalPayment =
  waterPrice +
  adminFee +
  tax +
  penalty;
  const dueDate =
  new Date();

dueDate.setMonth(
  dueDate.getMonth() + 1
);

dueDate.setDate(1);

const formattedDueDate =
  dueDate.toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );
  const rupiah = (value: number) =>
  new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  ).format(value);
  const now = new Date();

const currentMonthYear =
  now.toLocaleDateString(
    "id-ID",
    {
      month: "long",
      year: "numeric"
    }
  );
  const lastDayOfMonth =
  new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();
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
      Tagihan {currentBill?.billingPeriod}
    </h2>

    <p className="text-[12px] text-gray-400">
      Periode: 1 – {lastDayOfMonth} {" "} {currentBill?.billingPeriod}
    </p>
  </div>

</div>


        {/* DETAIL GRID */}
        <div className="grid grid-cols-2 gap-y-4 text-[13px] mb-5">

          <div>
            <p className="text-gray-400">Jatuh Tempo</p>
            <p className="font-semibold">{
  isPaidOff
    ? "-"
    : currentBill?.dueDate
    ? new Date(
        currentBill.dueDate
      ).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      )
    : "-"
}</p>
          </div>

          <div>
            <p className="text-gray-400">Biaya Administrasi</p>
            <p className="font-semibold">{
  isPaidOff
    ? "-"
    : `Rp 2.500`
}</p>
          </div>

          <div>
            <p className="text-gray-400">Pemakaian</p>
            <p className="font-semibold">{
  isPaidOff
    ? "-"
    : `${currentBill?.waterUsage} m³`
}</p>
          </div>

          <div>
            <p className="text-gray-400">Pajak</p>
            <p className="font-semibold">{
  isPaidOff
    ? "-"
    : rupiah(currentBill?.totalAmount * 0.1)
}</p>
          </div>

          <div>
            <p className="text-gray-400">Harga /m³</p>
            <p className="font-semibold">{
  isPaidOff
    ? "-"
    : rupiah(currentBill?.unitPrice)
}</p>
          </div>

          <div>
            <p className="text-gray-400">Harga Awal</p>
            <p className="font-semibold">{
  isPaidOff
    ? "-"
    : rupiah(currentBill?.totalAmount)
}</p>
          </div>

        </div>


        {/* TOTAL PEMBAYARAN */}
        <div className="w-full h-[58px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-[14px] px-5 flex items-center justify-between mb-5">

        <p className="text-gray-400 text-[14px]">
          Total Pembayaran
        </p>

        <p className="text-[18px] font-semibold text-gray-900">
          {
  isPaidOff
    ? "Lunas"
    : rupiah(currentBill?.totalAmount + 2500 + (currentBill?.totalAmount * 0.1))
}
        </p>

      </div>

        {/* ================= BUTTON BAYAR ================= */}
<button
  onClick={handlePay}
  disabled={isPaidOff}
  className="w-full h-[40px] flex items-center justify-center gap-2 text-white text-[14px] font-medium active:scale-[0.97] transition"
  style={{
    borderRadius: "34px",
    border: "1px solid #70B9FF",
    background:
      "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow:
      "0 4px 4px 0 rgba(1, 101, 255, 0.20), 0 -4px 4px 0 rgba(255, 255, 255, 0.20) inset",
  }}
>
  <img src={Wallet} className="w-[18px] h-[18px]" />
  {
    isPaidOff
      ? "Sudah Lunas"
      : "Bayar Tagihan"
  }
</button>

        {/* ================= BUTTON UNDUH ================= */}
        <button
        onClick={handleDownloadInvoice}
        disabled={!canDownloadInvoice}
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

<div className="grid grid-cols-4 text-[11px] text-gray-400 font-semibold border-b pb-2 mb-2">

  <p>PERIODE</p>
  <p>VOLUME</p>
  <p>TOTAL TAGIHAN</p>
  <p>TANGGAL BAYAR</p>

</div>

{historyBills.length === 0 ? (

  <p className="text-[12px] text-gray-400">
    Belum ada riwayat tagihan
  </p>

) : (

  historyBills.map((bill) => (

  <div
    key={bill.id}
    className="grid grid-cols-4 text-[13px] py-3 border-b"
  >

    <p className="text-gray-700">
      {bill.billingPeriod}
    </p>

    <p className="text-gray-500">
      {bill.waterUsage} m³
    </p>

    <p className="font-semibold text-gray-800">
      {rupiah(bill.totalAmount)}
    </p>

    <p className="text-gray-500">
      {
        new Date(
          bill.updatedAt
        ).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "short",
            year: "numeric"
          }
        )
      }
    </p>

  </div>

)))}

</div>
      </div>
    </div>
  );
}