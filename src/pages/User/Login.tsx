import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Gedung from "../../assets/Login/Gedung.svg";
import Logo from "../../assets/Login/Logo.svg";
import Water from "../../assets/Login/Water.svg";

export default function Login() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      // simpan token login
      localStorage.setItem(
        "token",
        response.data.data.token
      );

      // simpan data user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );

      setPopup({
        open: true,
        message: "Login berhasil",
        type: "success",
      });

    } catch (error: any) {
      setPopup({
        open: true,
        message:
          error.response?.data?.message ||
          "Login gagal",
        type: "error",
      });
    }
  };

  const handleClosePopup = () => {
    const isSuccess = popup.type === "success";

    setPopup({
      open: false,
      message: "",
      type: "success",
    });

    if (isSuccess) {
      navigate("/home");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              text-white text-[15px] font-medium
              active:scale-[0.97]
              transition-all
            "
            style={{
              borderRadius: "34px",
              border: "1px solid #70B9FF",
              background: "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
              boxShadow: "0 4px 4px 0 rgba(1, 101, 255, 0.20), 0 -4px 4px 0 rgba(255, 255, 255, 0.20) inset",
            }}
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
      {/* ================= POPUP ================= */}
      {popup.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div
              className={`px-6 py-5 text-white ${popup.type === "success"
                  ? "bg-gradient-to-r from-[#0096FF] to-[#0022FF]"
                  : "bg-gradient-to-r from-red-500 to-rose-600"
                }`}
            >
              <h2 className="text-2xl font-bold">
                {popup.type === "success"
                  ? "Berhasil"
                  : "Terjadi Kesalahan"}
              </h2>

              <p className="text-sm opacity-80 mt-1">
                AQUORA System Notification
              </p>
            </div>

            {/* CONTENT */}
            <div className="px-6 py-8">
              <p className="text-gray-700 text-base leading-relaxed">
                {popup.message}
              </p>

              <button
                onClick={handleClosePopup}
                className="mt-8 w-full rounded-2xl py-3 text-white font-semibold transition-all duration-200 active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(to right, #0096FF, #0022FF)",
                  boxShadow:
                    "0 8px 20px rgba(0,34,255,0.25)",
                }}
              >
                OK
              </button>
            </div>

          </div>
        </div>
      )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                text-white text-[20px] font-medium
                active:scale-[0.98]
                transition-all duration-300
              "
              style={{
                borderRadius: "34px",
                border: "1px solid #70B9FF",
                background: "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
                boxShadow: "0 4px 4px 0 rgba(1, 101, 255, 0.20), 0 -4px 4px 0 rgba(255, 255, 255, 0.20) inset",
              }}
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