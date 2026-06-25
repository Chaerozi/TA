import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Gedung from "../../assets/Login/New.svg";
import Logo from "../../assets/Login/TeksAquora.svg";
import Teks from "../../assets/adminDasbord/Logo.svg";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState({
    open: false,
    message: "",
  });

  const handleLogin = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email,
      password,
    });

    const user = response.data.user;

    if (user.role !== "admin") {
      setPopup({
        open: true,
        message: "Akun ini bukan akun admin",
      });
      return;
    }

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/admin");
  } catch (error: any) {
    setPopup({
      open: true,
      message: error.response?.data?.message || "Login admin gagal",
    });
  }
};

  return (
    <div className="min-h-screen bg-[#F3F4F6] md:grid md:grid-cols-2">
      {/* LEFT */}
      <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden p-12">
        <img src={Logo} alt="Aquora" className="w-[150px]" />

        <div className="relative z-10">
          <h1 className="text-white text-[42px] leading-[52px] font-semibold">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-white/80 text-[16px] leading-[26px] max-w-[420px]">
            Kelola data pelanggan, pemakaian air, tagihan, dan pembayaran
            Aquora secara mudah dalam satu dashboard.
          </p>
        </div>

        <img
          src={Gedung}
          alt="Gedung"
          className="absolute right-0 bottom-0 w-[430px]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-[420px] bg-white rounded-[28px] p-8 shadow-[0_20px_40px_rgba(16,24,40,0.08)]">
          <img src={Teks} alt="Logo" className="w-[44px] h-[44px] mb-5" />

          <h1 className="text-[30px] font-semibold text-[#0F172A]">
            Login Admin
          </h1>

          <p className="mt-2 text-[14px] text-[#64748B] leading-[22px]">
            Masuk untuk mengelola sistem Smart Water Meter Aquora.
          </p>

          <div className="mt-7">
            <label className="block text-[14px] font-medium text-[#344054] mb-2">
              Email Admin
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email admin"
              className="w-full h-[48px] px-4 rounded-[14px] border border-[#CBD5E1] outline-none focus:border-[#2173FF]"
            />
          </div>

          <div className="mt-4">
            <label className="block text-[14px] font-medium text-[#344054] mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
              className="w-full h-[48px] px-4 rounded-[14px] border border-[#CBD5E1] outline-none focus:border-[#2173FF]"
            />
          </div>

          {popup.open && (
            <div className="mt-4 rounded-[12px] bg-red-50 px-4 py-3 text-[13px] text-red-600">
              {popup.message}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="mt-6 w-full h-[50px] rounded-[34px] text-white text-[15px] font-medium active:scale-[0.98] transition"
            style={{
              border: "1px solid #70B9FF",
              background:
                "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
              boxShadow:
                "0 4px 4px rgba(1,101,255,0.2), inset 0 -4px 4px rgba(255,255,255,0.2)",
            }}
          >
            Masuk Dashboard
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-5 w-full text-[14px] text-[#64748B] hover:text-[#2173FF]"
          >
            Kembali ke Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}