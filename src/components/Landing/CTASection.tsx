import { useNavigate } from "react-router-dom"
import Left from "../../assets/Landing/Left.svg"
import Right from "../../assets/Landing/Right.svg"

export default function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="w-full bg-white pb-[90px] lg:pb-[120px] px-5 lg:px-6">

      {/* ================= MAIN BOX ================= */}
      <div
        className="relative max-w-[1314px] mx-auto overflow-hidden rounded-[28px] lg:h-[314px]"
        style={{
          background: `
            radial-gradient(
              circle at top,
              rgba(255,255,255,0.95) 0%,
              rgba(255,255,255,0.72) 28%,
              rgba(255,255,255,0) 62%
            ),
            linear-gradient(
              180deg,
              #F8FCFF 0%,
              #EEF6FF 38%,
              #E4F1FF 100%
            )
          `,
          border: "1px solid rgba(255,255,255,0.65)",
        }}
      >

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="flex flex-col items-center text-center px-6 pt-10 pb-10 lg:hidden">

          {/* Icons row — kiri dan kanan di mobile */}
          <div className="flex items-center justify-between w-full mb-6 px-2">
            <img
              src={Left}
              alt="Left"
              className="w-[90px] object-contain"
            />
            <img
              src={Right}
              alt="Right"
              className="w-[80px] object-contain opacity-80"
            />
          </div>

          {/* TITLE */}
          <h2 className="text-[22px] leading-[135%] font-semibold tracking-[-0.5px] text-[#0F172A]">
            Mulai Monitoring Air Dengan Lebih Mudah
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-3 text-[14px] leading-[175%] text-[#94A3B8]">
            Pantau penggunaan air, cek tagihan, dan lakukan pembayaran
            dalam satu dashboard yang transparan dan real-time.
          </p>

          {/* BUTTON GROUP */}
          <div className="mt-6 flex flex-col items-center gap-3 w-full">

            <button
              className="w-full max-w-[280px] h-[48px] rounded-full text-white text-[16px] font-medium transition hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `
                  radial-gradient(circle at top, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%),
                  linear-gradient(180deg, #4D8FFF 0%, #2173FF 100%)
                `,
                boxShadow: "0 8px 22px rgba(33,115,255,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Login
            </button>

            <button
              className="w-full max-w-[280px] h-[48px] rounded-full bg-white text-[16px] font-medium text-[#8A8A8A] transition hover:scale-[1.02] active:scale-[0.98]"
              style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}
            >
              Get Started
            </button>

          </div>

        </div>

        {/* ================= DESKTOP LAYOUT (tidak diubah) ================= */}
        <div className="hidden lg:block">

          {/* LEFT RECTANGLE */}
          <div
            className="absolute left-[110px] bottom-[-120px] w-[170px] h-[290px] bg-[#B9DDFF] opacity-80"
            style={{ transform: "rotate(-18deg)", borderRadius: "10px" }}
          />

          {/* RIGHT RECTANGLE */}
          <div
            className="absolute right-[110px] bottom-[-120px] w-[170px] h-[290px] bg-[#B9DDFF] opacity-80"
            style={{ transform: "rotate(18deg)", borderRadius: "10px" }}
          />

          {/* LEFT ICON */}
          <img
            src={Left}
            alt="Left"
            className="absolute left-[64px] top-[52px] w-[180px] object-contain z-10"
          />

          {/* RIGHT ICON */}
          <img
            src={Right}
            alt="Right"
            className="absolute right-[64px] top-[82px] w-[180px] object-contain z-10"
          />

          {/* CONTENT */}
          <div className="relative z-20 flex flex-col items-center justify-center h-[314px] text-center px-6">

            <h2 className="text-[32px] leading-[120%] font-semibold tracking-[-1px] text-[#0F172A]">
              Mulai Monitoring Air Dengan Lebih Mudah
            </h2>

            <p className="mt-5 max-w-[760px] text-[20px] leading-[175%] text-[#94A3B8]">
              Pantau penggunaan air, cek tagihan, dan lakukan pembayaran
              dalam satu dashboard yang transparan dan real-time.
            </p>

            <div className="mt-10 flex flex-row items-center gap-6">

              <button
                className="w-[181px] h-[49px] rounded-full bg-white text-[18px] font-medium text-[#8A8A8A] transition hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}
              >
                Get Started
              </button>

              <button
  onClick={() => navigate("/login")}
  className="w-[150px] h-[50px] rounded-full text-white text-[18px] font-medium transition hover:scale-[1.02] active:scale-[0.98]"
  style={{
    background: `
      radial-gradient(circle at top, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%),
      linear-gradient(180deg, #4D8FFF 0%, #2173FF 100%)
    `,
    boxShadow:
      "0 8px 22px rgba(33,115,255,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
    border: "1px solid rgba(255,255,255,0.12)",
  }}
>
  Login
</button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}