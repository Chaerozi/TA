import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "Sen", value: 45 },
  { day: "Sel", value: 32 },
  { day: "Rab", value: 22 },
  { day: "Kam", value: 28 },
  { day: "Jum", value: 40 },
  { day: "Sab", value: 42 },
  { day: "Ming", value: 26 },
];

export default function WaterChartBar() {
  return (
    <div className="w-full h-[220px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
          barCategoryGap="22%"
        >

          {/* Gradient */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1DA1F2" />
              <stop offset="100%" stopColor="#1E3AFF" />
            </linearGradient>
          </defs>

          {/* Bars */}
          <Bar
            dataKey="value"
            radius={[10, 10, 10, 10]}
            barSize={34}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill="url(#barGradient)" />
            ))}
          </Bar>

          {/* Days */}
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
          />

          {/* Numbers */}
          <YAxis
            orientation="right"
            domain={[0, 50]}
            ticks={[10, 20, 30, 40, 50]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            width={35}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}