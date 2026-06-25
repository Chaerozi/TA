import Gedung from "../../assets/Login/New.svg";
import Teks from "../../assets/Login/TeksAquora.svg";
import Logo from "../../assets/adminDasbord/Logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {

    try {

      // Validasi password
      if (
        formData.password !== formData.confirmPassword
      ) {
        alert("Konfirmasi password tidak sama");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            address: formData.address,
            phone: formData.phone,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {

        alert("Register berhasil");

        navigate("/login", {
          state: {
            activated: true,
          },
        });

      } else {

        alert(result.message);

      }

    } catch (error) {

      console.error(error);

      alert("Terjadi kesalahan");

    }

  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] flex items-start justify-center md:py-10">

      <div className="w-full max-w-[430px] min-h-screen md:min-h-0 md:overflow-hidden md:shadow-[0_32px_80px_rgba(0,0,0,0.25)] bg-[#F3F4F6]">

        {/* HEADER */}
        <div className="relative h-[254px] px-6 pt-14 bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden">

          {/* LOGO */}
          <div className="mt-2 mb-2">
            <img
              src={Teks}
              alt="Aquora Logo"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-white text-[12px] leading-[18px] w-[225px]">
            Aquora membantu kamu memantau
            penggunaan air secara real-time dan
            membayar tagihan dengan lebih
            transparan dan praktis.
          </p>

          {/* GEDUNG */}
          <div className="absolute right-0 bottom-0 w-[215px] h-[215px]">
            <img
              src={Gedung}
              alt="Gedung"
              className="w-full h-full object-contain"
            />
          </div>

        </div>

        {/* FORM */}
        <div className="relative z-20 -mt-[24px] rounded-t-[12px] bg-[#F3F4F6] px-4 pt-8 pb-10">

          {/* ICON */}
          <div className="mb-4">
            <img
              src={Logo}
              alt="Logo"
              className="w-[38px] h-[38px] object-contain"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-[24px] font-bold text-[#1B2340]">
            Daftar Akun
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-2 text-[#8B93A7] text-[14px] leading-[24px]">
            Silakan buat akun untuk mulai menggunakan Aquora.
          </p>

          {/* FORM INPUT */}
          <div className="mt-8 space-y-5">

            {/* NAMA */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Nama
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukan nama lengkap"
                className="w-full h-[48px] rounded-[12px] border border-[#D9E0EE] bg-white px-4 text-[14px] outline-none focus:border-[#2563FF]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukan email"
                className="w-full h-[48px] rounded-[12px] border border-[#D9E0EE] bg-white px-4 text-[14px] outline-none focus:border-[#2563FF]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Kata Sandi
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukan kata sandi"
                className="w-full h-[48px] rounded-[12px] border border-[#D9E0EE] bg-white px-4 text-[14px] outline-none focus:border-[#2563FF]"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Konfirmasi Kata Sandi
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Konfirmasi kata sandi"
                className="w-full h-[48px] rounded-[12px] border border-[#D9E0EE] bg-white px-4 text-[14px] outline-none focus:border-[#2563FF]"
              />
            </div>

            {/* ALAMAT */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Alamat
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Masukan alamat"
                className="w-full h-[48px] rounded-[12px] border border-[#D9E0EE] bg-white px-4 text-[14px] outline-none focus:border-[#2563FF]"
              />
            </div>

            {/* NOMOR HP */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Nomor HP
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Masukan nomor HP"
                className="w-full h-[48px] rounded-[12px] border border-[#D9E0EE] bg-white px-4 text-[14px] outline-none focus:border-[#2563FF]"
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full h-[48px] rounded-[34px] flex items-center justify-center text-white text-[14px] font-semibold mt-8 transition-all active:scale-[0.98]"
            style={{
              background:
                "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%)",
              boxShadow:
                "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
              border: "1px solid #70B9FF",
            }}
          >
            Daftar
          </button>

        </div>
      </div>
    </div>
  );
}