import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Gedung from "../assets/Login/Gedung.svg";
import Logo from "../assets/Login/Logo.svg";
import Water from "../assets/Login/Water.svg";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="block md:hidden min-h-screen bg-[#F3F4F6]">

        {/* HEADER */}
        <div className="relative h-[254px] px-6 pt-14 bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden">

          {/* LOGO */}
          <div className="mt-5 mb-4">
            <img src={Logo} alt="Aquora Logo" className="h-7 w-auto object-contain" />
          </div>

          {/* DESCRIPTION */}
          <p className="mt-3 text-white text-[12px] leading-[20px] w-[228px]">
            Aquora membantu kamu memantau
            penggunaan air secara real-time dan
            membayar tagihan dengan lebih
            transparan dan praktis.
          </p>

          {/* GEDUNG */}
          <div className="absolute right-0 -bottom-6 w-[210px]">
            <img src={Gedung} alt="Gedung" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* FLOATING LOGIN CARD */}
        <div className="-mt-16 bg-[#F3F4F6] rounded-t-[12px] px-5 pt-8 pb-10">

          {/* ICON */}
          <div className="mb-4">
            <img src={Water} alt="Water Icon" className="w-8 h-8" />
          </div>

          {/* TITLE */}
          <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2">
            Selamat Datang
          </h1>

          <p className="text-[13px] text-[#64748B] mb-6">
            Masuk untuk melihat pemakaian dan tagihan air unit Anda.
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-[13px] font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukan email"
              className="w-full h-[44px] px-3 rounded-[12px] border border-[#CBD5E1]"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-[13px] font-medium mb-1">
              Kata sandi
            </label>

            <input
              type="password"
              placeholder="Masukan kata sandi"
              className="w-full h-[44px] px-3 rounded-[12px] border border-[#CBD5E1]"
            />
          </div>

          {/* REMEMBER */}
          <div className="flex items-center justify-between mb-6 text-[13px]">

            <label className="flex items-center gap-2 text-[#334155]">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-blue-600 w-4 h-4"
              />
              Ingat saya
            </label>

            <a href="#" className="text-blue-600 font-medium">
              Lupa kata sandi?
            </a>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="
              w-full h-[48px]
              rounded-[14px]
              text-white text-[15px] font-medium
              bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]
              shadow-[0_8px_20px_rgba(37,99,235,0.35)]
              active:scale-[0.97]
              transition-all
            "
          >
            Masuk
          </button>

          {/* REGISTER */}
          <p className="text-center text-[13px] text-[#334155] mt-6">
            Belum punya akun?{" "}
            <span className="text-blue-600 font-medium cursor-pointer">
              Daftar
            </span>
          </p>

        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex min-h-screen bg-[#F3F4F6] font-geist">

        {/* LEFT */}
        <div className="
          w-full 
          md:w-[55%] 
          xl:w-1/2 
          flex items-center justify-center 
          px-6 md:px-12 xl:px-24
        ">
          <div className="w-full max-w-[420px]">

            <div className="mb-10">
              <img src={Water} alt="Water Icon" className="w-12 h-12" />
            </div>

            <h1 className="text-[40px] leading-[48px] font-semibold text-[#0F172A] mb-4">
              Selamat Datang di Aquora
            </h1>

            <p className="text-[18px] text-[#64748B] mb-10">
              Masuk untuk melihat pemakaian dan tagihan air unit Anda.
            </p>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-[16px] font-medium text-[#0F172A] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukan email"
                className="w-full h-[52px] px-5 rounded-[12px]
                border border-[#CBD5E1]
                text-[16px]
                focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* PASSWORD */}
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

            {/* REMEMBER */}
            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-2 text-[16px] text-[#334155]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-blue-600 w-4 h-4"
                />
                Ingat saya
              </label>

              <a
                href="#"
                className="text-[16px] text-blue-600 font-medium hover:opacity-80"
              >
                Lupa kata sandi?
              </a>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
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
              Masuk
            </button>

            <p className="text-center text-[16px] text-[#334155] mt-8">
              Belum punya akun?{" "}
              <span className="text-blue-600 font-medium cursor-pointer">
                Daftar
              </span>
            </p>

          </div>
        </div>

        {/* RIGHT */}
        <div className="
          md:w-[45%] 
          xl:w-1/2 
          relative
          bg-gradient-to-b 
          from-[#0096FF] 
          to-[#0022FF]
          overflow-hidden
        ">

          <div className="absolute top-16 left-20">
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
    </>
  );
}