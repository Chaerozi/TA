import { useNavigate } from "react-router-dom";
import Gedung from "../assets/Login/Gedung.svg";
import Logo from "../assets/Login/Logo.svg";
import Water from "../assets/Login/Water.svg";

export default function ActivateAccount() {
  const navigate = useNavigate();

  const handleActivate = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-[#F3F4F6] font-geist">

      {/* ================= LEFT ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-24">
        <div className="w-full max-w-[420px]">

          {/* Icon */}
          <div className="mb-10">
            <img src={Water} alt="Water Icon" className="w-12 h-12" />
          </div>

          {/* Heading */}
          <h1 className="text-[40px] leading-[48px] font-semibold text-[#0F172A] mb-4">
            Aktivasi Akun Anda
          </h1>

          <p className="text-[16px] text-[#64748B] mb-10">
            Silakan buat kata sandi untuk mulai menggunakan Aquora.
          </p>

          {/* Info Box */}
          <div className="bg-[#E2E8F0] rounded-[14px] p-6 mb-10">
            <div className="flex justify-between mb-4 text-[16px]">
              <span className="text-[#334155]">Email</span>
              <span className="font-medium text-[#0F172A]">
                christian@gmail.com
              </span>
            </div>
            <div className="flex justify-between text-[16px]">
              <span className="text-[#334155]">Unit</span>
              <span className="font-medium text-[#0F172A]">
                A-1203
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-[16px] font-medium text-[#0F172A] mb-2">
              Kata sandi
            </label>
            <input
              type="password"
              placeholder="Masukan kata sandi"
              className="w-full h-[52px] px-5 rounded-[12px]
              border border-[#CBD5E1]
              text-[16px]
              focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm */}
          <div className="mb-10">
            <label className="block text-[16px] font-medium text-[#0F172A] mb-2">
              Konfirmasi kata sandi
            </label>
            <input
              type="password"
              placeholder="Konfirmasi kata sandi"
              className="w-full h-[52px] px-5 rounded-[12px]
              border border-[#CBD5E1]
              text-[16px]
              focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleActivate}
            className="
              w-full h-[56px]
              rounded-[14px]
              text-white text-[20px] font-medium
              bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]
              shadow-[0_8px_20px_rgba(37,99,235,0.35)]
              hover:shadow-[0_10px_25px_rgba(37,99,235,0.45)]
              hover:brightness-105
              active:scale-[0.98]
              transition-all duration-300
            "
          >
            Aktivasi & Masuk
          </button>

        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="hidden md:flex w-1/2 relative 
  bg-gradient-to-b from-[#0096FF] to-[#0022FF] 
  overflow-hidden">

        {/* Logo */}
        <div className="absolute top-16 left-20 flex items-center gap-5">
          <img src={Logo} alt="Aquora Logo" className="h-[64px] w-auto" />
          <span className="text-white text-[44px] font-semibold tracking-[1.5px]">
          </span>
        </div>

        {/* Description */}
        <div className="absolute top-40 left-20 max-w-[600px]">
          <p className="text-white text-[20px] leading-[34px] font-medium">
            Aquora membantu kamu memantau penggunaan air secara real-time dan 
            membayar tagihan dengan lebih transparan dan praktis.
          </p>
        </div>

         {/* Illustration */}
      <div className="absolute bottom-[0px] right-[0px]">
        <img
          src={Gedung}
          alt="Gedung Illustration"
          className="w-[717px] h-[684px] object-contain"
        />
      </div>

      </div>
    </div>
  );
}