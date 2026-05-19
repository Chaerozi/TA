import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "Bagaimana cara memantau penggunaan air?",
      answer:
        "Pengguna dapat melihat penggunaan air secara real-time melalui dashboard yang menampilkan data harian, mingguan, dan bulanan.",
    },
    {
      question: "Apakah data penggunaan air diperbarui secara langsung?",
      answer:
        "Ya, data akan diperbarui secara otomatis dan ditampilkan secara real-time melalui sistem monitoring.",
    },
    {
      question: "Bagaimana sistem menghitung tagihan air?",
      answer:
        "Tagihan dihitung berdasarkan total penggunaan air yang tercatat pada meteran digital pengguna.",
    },
    {
      question: "Apakah saya bisa melihat riwayat penggunaan air?",
      answer:
        "Tentu, pengguna dapat melihat riwayat penggunaan air dan tagihan sebelumnya langsung dari dashboard.",
    },
    {
      question: "Bagaimana jika terjadi lonjakan penggunaan air?",
      answer:
        "Sistem akan memberikan notifikasi otomatis jika terdeteksi penggunaan air yang tidak normal.",
    },
    {
      question: "Apakah dashboard pengguna dapat diakses melalui smartphone?",
      answer:
        "Ya, dashboard dapat diakses melalui desktop maupun smartphone dengan tampilan yang responsif.",
    },
  ]

  return (
    <section className="w-full bg-white py-[90px] lg:py-[120px] px-5 lg:px-6">

      <div className="max-w-[980px] mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center">

          <h2 className="text-[28px] lg:text-[32px] leading-[120%] font-semibold tracking-[-1px] text-[#0F172A]">

            Pertanyaan yang Sering Ditanyakan

          </h2>

          <p className="mt-4 text-[16px] lg:text-[20px] leading-[170%] text-[#94A3B8] max-w-[760px] mx-auto">

            Informasi seputar penggunaan dashboard, monitoring air,
            <br className="hidden lg:block" />
            dan sistem pembayaran.

          </p>

        </div>

        {/* ================= FAQ LIST ================= */}
        <div className="mt-[50px] lg:mt-[70px]">

          {faqs.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="border-b border-[#E2E8F0]"
              >

                {/* QUESTION */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="
                    w-full
                    flex
                    items-start
                    justify-between
                    gap-5
                    py-[24px]
                    lg:py-[34px]
                    text-left
                  "
                >

                  <h3 className="text-[16px] lg:text-[20px] leading-[160%] font-medium text-[#334155]">

                    {item.question}

                  </h3>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 mt-[2px] transition duration-300 text-[#8A8A8A] ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>

                {/* ANSWER */}
                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "max-h-[220px] pb-[24px] lg:pb-[34px]"
                        : "max-h-0"
                    }
                  `}
                >

                  <p className="text-[14px] lg:text-[16px] leading-[175%] text-[#94A3B8] max-w-[860px]">

                    {item.answer}

                  </p>

                </div>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}