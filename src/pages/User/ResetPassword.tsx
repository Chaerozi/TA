import Gedung from "../../assets/Login/New.svg";
import Teks from "../../assets/Login/TeksAquora.svg";
import Logo from "../../assets/adminDasbord/Logo.svg";
import Berhasil from "../../assets/adminDasbord/Berhasil.svg";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPopup, setShowPopup] =
    useState(false);

const handleSavePassword = async () => {

  if (!password || !confirmPassword) {
    alert("Semua field wajib diisi");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password tidak sama");
    return;
  }

  try {

    await axios.post(
      "http://localhost:3000/api/v1/auth/reset-password",
      {
        token: localStorage.getItem("resetToken"),
        password,
      }
    );

    setShowPopup(true);

  } catch (error: any) {

    alert(
      error.response?.data?.message ||
      "Gagal reset password"
    );

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

        {/* CONTENT */}
        <div
          className="
            relative
            z-20
            -mt-[24px]
            rounded-t-[12px]
            bg-[#F3F4F6]
            px-5
            pt-8
            pb-10
            min-h-[calc(100vh-230px)]
          "
        >

          {/* ICON */}
          <div className="mb-5">
            <img
              src={Logo}
              alt="Logo"
              className="w-[38px] h-[38px] object-contain"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-[24px] font-bold text-[#1B2340]">
            Buat Password Baru
          </h1>

          {/* DESC */}
          <p className="mt-2 text-[#8B93A7] text-[14px] leading-[24px]">
            Masukkan password baru untuk akun Anda.
          </p>

          {/* FORM */}
          <div className="mt-10 space-y-6">

            {/* PASSWORD */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Password Baru
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Masukkan password baru"
                className="
                  w-full
                  h-[48px]
                  rounded-[12px]
                  border
                  border-[#D9E0EE]
                  bg-white
                  px-4
                  text-[14px]
                  outline-none
                  focus:border-[#2563FF]
                "
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Konfirmasi Password Baru
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Masukkan password baru"
                className="
                  w-full
                  h-[48px]
                  rounded-[12px]
                  border
                  border-[#D9E0EE]
                  bg-white
                  px-4
                  text-[14px]
                  outline-none
                  focus:border-[#2563FF]
                "
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleSavePassword}
            className="
              w-full
              h-[40px]
              rounded-[34px]
              flex
              items-center
              justify-center
              text-white
              text-[14px]
              font-medium
              mt-8
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
            Simpan Password
          </button>

        </div>

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6">

            <div className="w-[272px] rounded-[16px] bg-white px-6 pt-7 pb-6 shadow-xl">

              {/* ICON */}
              <div className="flex justify-center">
                <img
                  src={Berhasil}
                  alt="Berhasil"
                  className="w-[72px] h-[72px] object-contain"
                />
              </div>

              {/* TITLE */}
              <h2 className="mt-5 text-center text-[18px] font-bold text-[#1B2340]">
                Password Berhasil Diubah
              </h2>

              {/* DESC */}
              <p className="mt-2 text-center text-[14px] leading-[22px] text-[#8B93A7]">
                Password baru kamu berhasil disimpan dan siap digunakan.
              </p>

              {/* BUTTON */}
              <button
                onClick={() => {

                  setShowPopup(false);

                  navigate("/login");

                }}
                className="
                  mt-6
                  h-[40px]
                  w-full
                  rounded-[34px]
                  text-[14px]
                  font-medium
                  text-white
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
                Masuk
              </button>

            </div>

          </div>
        )}

      </div>

    </div>

  );
}