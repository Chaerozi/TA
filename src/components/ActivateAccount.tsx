import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Gedung from "../assets/Login/Gedung.svg";
import Logo from "../assets/Login/Logo.svg";
import Water from "../assets/Login/Water.svg";
import Mobile from "../assets/Login/Mobile.svg";

export default function ActivateAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const [email, setEmail] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.email || "");
      setUnit(payload.unit || "");
      setName(payload.name || "");
    } catch {
      console.error("Invalid token");
    }
  }, [token]);

  const handleActivate = async () => {
    if (password !== confirmPassword) {
      setPopup({ open: true, message: "Password tidak sama", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/v1/auth/activate-account", {
        token,
        password,
      });
      setPopup({ open: true, message: "Akun berhasil diaktivasi!", type: "success" });
    } catch (error: any) {
      setPopup({
        open: true,
        message: error.response?.data?.message || "Gagal aktivasi akun",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    const isSuccess = popup.type === "success";
    setPopup({ open: false, message: "", type: "success" });
    if (isSuccess) navigate("/login"); // ✅ navigate hanya jika sukses
  };

  return (
    <div className="min-h-screen font-geist bg-[#F3F4F6]">

      {/* ================= POPUP ================= */}
      {/* ✅ Di level atas, bukan di dalam div desktop */}
      {popup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div
              className={`px-6 py-5 text-white ${
                popup.type === "success"
                  ? "bg-gradient-to-r from-[#0096FF] to-[#0022FF]"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
              }`}
            >
              <h2 className="text-2xl font-bold">
                {popup.type === "success" ? "Berhasil" : "Terjadi Kesalahan"}
              </h2>
              <p className="text-sm opacity-80 mt-1">AQUORA System Notification</p>
            </div>

            {/* CONTENT */}
            <div className="px-6 py-8">
              <p className="text-gray-700 text-base leading-relaxed">{popup.message}</p>
              <button
                onClick={handleClosePopup}
                className="mt-8 w-full rounded-2xl py-3 text-white font-semibold transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(to right, #0096FF, #0022FF)",
                  boxShadow: "0 8px 20px rgba(0,34,255,0.25)",
                }}
              >
                OK
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden min-h-screen bg-[#F3F4F6]">

        {/* HEADER */}
        <div className="relative h-[254px] px-6 pt-12 bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden">
          <div className="max-w-[190px]">
            <div className="mt-[22px] mb-4">
              <img src={Logo} alt="Aquora Logo" className="h-7 w-auto object-contain" />
            </div>
            <p className="mt-4 text-white text-[12px] leading-[20px] w-[228px] h-[108px]">
              Aquora membantu kamu memantau penggunaan air secara real-time dan
              membayar tagihan dengan lebih transparan dan praktis.
            </p>
          </div>
          <div className="absolute right-0 -bottom-4 w-[240px]">
            <img src={Mobile} alt="Gedung" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* FLOATING CARD */}
        <div className="relative -mt-18 bg-[#F3F4F6] rounded-t-[12px] px-4 pt-8 pb-10 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-10">

          <div className="mb-4">
            <img src={Water} alt="Water Icon" className="w-8 h-8" />
          </div>

          {/* ✅ Hanya 1x, tidak duplikat */}
          {name && (
            <p className="text-[14px] text-[#2563EB] font-medium mb-2">Halo, {name}</p>
          )}

          <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2">
            Aktivasi Akun Anda
          </h1>

          <p className="text-[14px] text-[#64748B] mb-5">
            Silakan buat kata sandi untuk mulai menggunakan Aquora.
          </p>

          <div className="bg-[#E2E8F0] rounded-[14px] p-4 mb-6 text-[13px]">
            <div className="flex justify-between mb-2">
              <span className="text-[#64748B]">Email</span>
              <span className="font-medium text-[#0F172A]">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Unit</span>
              <span className="font-medium text-[#0F172A]">{unit}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[13px] font-medium mb-1">Kata sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan kata sandi"
              className="w-full h-[44px] px-3 rounded-[12px] border border-[#CBD5E1] bg-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-medium mb-1">Konfirmasi kata sandi</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi kata sandi"
              className="w-full h-[44px] px-3 rounded-[12px] border border-[#CBD5E1] bg-white"
            />
          </div>

          <button
            onClick={handleActivate}
            disabled={loading}
            className="w-full h-[48px] rounded-full text-white text-[15px] font-semibold active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
            style={{
              background: "linear-gradient(to right, #0096FF, #0022FF)",
              boxShadow: "0 8px 20px rgba(0,34,255,0.30)",
            }}
          >
            {loading ? "Loading..." : "Aktivasi & Masuk"}
          </button>

        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex min-h-screen">

        {/* LEFT */}
        <div className="w-full md:w-[55%] xl:w-1/2 flex items-center justify-center px-6 md:px-12 xl:px-24">
          <div className="w-full max-w-[420px]">

            <div className="mb-10">
              <img src={Water} alt="Water Icon" className="w-12 h-12" />
            </div>

            {/* ✅ Hanya 1x */}
            {name && (
              <p className="text-[16px] text-[#2563EB] font-medium mb-3">Halo, {name}</p>
            )}

            <h1 className="text-[40px] leading-[48px] font-semibold text-[#0F172A] mb-4">
              Aktivasi Akun Anda
            </h1>

            <p className="text-[18px] text-[#64748B] mb-10">
              Silakan buat kata sandi untuk mulai menggunakan Aquora.
            </p>

            <div className="bg-[#E2E8F0] rounded-[14px] p-6 mb-10">
              <div className="flex justify-between mb-4 text-[16px]">
                <span className="text-[#334155]">Email</span>
                <span className="font-medium text-[#0F172A]">{email}</span>
              </div>
              <div className="flex justify-between text-[16px]">
                <span className="text-[#334155]">Unit</span>
                <span className="font-medium text-[#0F172A]">{unit}</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[16px] font-medium text-[#0F172A] mb-2">Kata sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukan kata sandi"
                className="w-full h-[52px] px-5 rounded-[12px] border border-[#CBD5E1]"
              />
            </div>

            <div className="mb-10">
              <label className="block text-[16px] font-medium text-[#0F172A] mb-2">Konfirmasi kata sandi</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi kata sandi"
                className="w-full h-[52px] px-5 rounded-[12px] border border-[#CBD5E1]"
              />
            </div>

            <button
              onClick={handleActivate}
              disabled={loading}
              className="w-full h-[56px] rounded-full text-white text-[18px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
              style={{
                background: "linear-gradient(to right, #0096FF, #0022FF)",
                boxShadow: "0 10px 28px rgba(0,34,255,0.32)",
              }}
            >
              {loading ? "Loading..." : "Aktivasi & Masuk"}
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="md:w-[45%] xl:w-1/2 relative bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden">
          <div className="absolute top-16 left-20 flex items-center gap-5">
            <img src={Logo} alt="Aquora Logo" className="h-[64px] w-auto" />
          </div>
          <div className="absolute top-40 left-16 max-w-[560px]">
            <p className="text-white text-[24px] leading-[32px] font-medium">
              Aquora membantu kamu memantau penggunaan air secara real-time dan
              membayar tagihan dengan lebih transparan dan praktis.
            </p>
          </div>
          <div className="absolute bottom-0 right-0">
            <img src={Gedung} alt="Gedung Illustration" />
          </div>
        </div>

      </div>
    </div>
  );
}