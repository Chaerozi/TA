import Semua from "../../assets/Landing/Monitoring.svg"

export default function MonitoringSection() {
  return (
    <section className="w-full bg-white py-[70px] lg:py-[110px] overflow-hidden">

      <div className="max-w-[1280px] mx-auto px-5 lg:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[50px] lg:gap-[70px]">

          {/* ================= LEFT CONTENT ================= */}
          <div className="order-2 lg:order-1">

            <h2
              className="
                text-[28px]
                lg:text-[32px]

                leading-[135%]
                lg:leading-[120%]

                font-semibold
                text-[#0F172A]

                max-w-full
                lg:max-w-[520px]

                tracking-[-1px]

                text-center
                lg:text-left
              "
            >

              Semua Monitoring Air Dalam
              <br />
              Satu Dashboard.

            </h2>

            <p
              className="
                mt-5
                lg:mt-6

                text-[16px]
                lg:text-[20px]

                leading-[180%]
                lg:leading-[175%]

                text-[#94A3B8]

                max-w-full
                lg:max-w-[520px]

                text-center
                lg:text-left
              "
            >

              Pantau penggunaan air, cek tagihan, dan deteksi
              anomali dalam satu dashboard terintegrasi.

            </p>

            {/* ================= FEATURE LIST ================= */}
            <div
              className="
                mt-8
                lg:mt-10

                space-y-5
                lg:space-y-7
              "
            >

              {[
                "Real-Time Monitoring",
                "Smart Notification",
                "Transparent Billing",
                "Integrated Payment",
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-4

                    justify-center
                    lg:justify-start
                  "
                >

                  {/* ICON */}
                  <div className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px] rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">

                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                  </div>

                  <p
                    className="
                      text-[16px]
                      lg:text-[20px]

                      font-medium
                      text-[#334155]
                    "
                  >
                    {item}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">

            {/* BLUE BACKGROUND */}
            <div
              className="
                absolute

                top-0
                right-1/2
                translate-x-1/2

                lg:right-0
                lg:translate-x-0

                w-[96%]
                lg:w-[92%]

                h-[96%]
                lg:h-[92%]

                rounded-[22px]
                lg:rounded-[28px]
              "
              style={{
                background: `
                  radial-gradient(
                    circle at top,
                    rgba(255,255,255,0.18) 0%,
                    rgba(255,255,255,0) 38%
                  ),
                  linear-gradient(
                    180deg,
                    #4DA2FF 0%,
                    #2173FF 100%
                  )
                `,
              }}
            />

            {/* IMAGE */}
            <img
              src={Semua}
              alt="Monitoring Dashboard"
              className="
                relative
                z-10

                w-full

                max-w-[100%]
                lg:max-w-[860px]

                object-contain
              "
            />

          </div>

        </div>

      </div>

    </section>
  )
}