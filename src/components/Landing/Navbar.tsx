import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Water from "../../assets/Login/Water.svg"

export default function Navbar() {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <nav className="w-full h-[88px] bg-white border-b border-[#E5E7EB] flex items-center justify-center sticky top-0 z-50">

      {/* ================= CONTAINER ================= */}
      <div className="w-full max-w-[1280px] px-4 md:px-6 flex items-center justify-between">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-12">

          {/* LOGO */}
          <a
            href="#home"
            className="flex items-center gap-3 cursor-pointer"
          >

            <img
              src={Water}
              className="w-[34px] h-[34px] object-contain"
            />

            <h1 className="text-[18px] font-semibold text-[#0F172A]">
              Aquora
            </h1>

          </a>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-10">

            <a
              href="#home"
              className="text-[16px] text-[#94A3B8] hover:text-[#2173FF] transition"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-[16px] text-[#94A3B8] hover:text-[#2173FF] transition"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-[16px] text-[#94A3B8] hover:text-[#2173FF] transition"
            >
              Contact Us
            </a>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-5">

          <button className="text-[16px] text-[#94A3B8] hover:text-[#2173FF] transition">
            Get Started
          </button>

          {/* LOGIN BUTTON */}
          <button
            onClick={() => navigate("/login")}
            className="
              w-[158px]
              h-[45px]
              rounded-[34px]
              text-white
              text-[16px]
              font-medium
              active:scale-[0.98]
              transition
            "
            style={{
              background: `
                radial-gradient(
                  circle at top,
                  rgba(255,255,255,0.28),
                  transparent 55%
                ),
                linear-gradient(
                  180deg,
                  #4DA2FF 0%,
                  #2173FF 100%
                )
              `,
              boxShadow: `
                0 8px 22px rgba(33,115,255,0.38),
                inset 0 1px 0 rgba(255,255,255,0.35)
              `,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            Coba sekarang
          </button>

        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-[#0F172A]" />
          <span className="w-6 h-[2px] bg-[#0F172A]" />
          <span className="w-6 h-[2px] bg-[#0F172A]" />
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}
      {openMenu && (
        <div className="absolute top-[88px] left-0 w-full bg-white border-b border-[#E5E7EB] md:hidden">

          <div className="flex flex-col px-6 py-5 gap-5">

            <a
              href="#home"
              onClick={() => setOpenMenu(false)}
              className="text-left text-[15px] text-[#64748B]"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setOpenMenu(false)}
              className="text-left text-[15px] text-[#64748B]"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setOpenMenu(false)}
              className="text-left text-[15px] text-[#64748B]"
            >
              Contact Us
            </a>

            <button className="text-left text-[15px] text-[#64748B]">
              Get Started
            </button>

            {/* LOGIN BUTTON MOBILE */}
            <button
              onClick={() => navigate("/login")}
              className="w-full h-[48px] rounded-[30px] text-white text-[15px] font-medium"
              style={{
                background: `
                  radial-gradient(circle at top, rgba(255,255,255,0.28), transparent 55%),
                  linear-gradient(180deg, #60A5FA 0%, #2173FF 100%)
                `,
                boxShadow: "0 8px 22px rgba(33,115,255,0.38)",
              }}
            >
              Login
            </button>

          </div>

        </div>
      )}

    </nav>
  )
}