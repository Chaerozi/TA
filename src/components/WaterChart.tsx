import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Area,
} from "recharts";

const data = [
  { day: "Sen", value: 24, bars: [4,6,5,7,6] },
  { day: "Sel", value: 28, bars: [6,7,8,7,9] },
  { day: "Rab", value: 32, bars: [8,9,10,11,10] },
  { day: "Kam", value: 35, bars: [10,12,14,11,9] },
  { day: "Jum", value: 18, bars: [8,6,7,6,5] },
  { day: "Sab", value: 30, bars: [7,9,10,11,12] },
  { day: "Ming", value: 50, bars: [10,12,13,15,16] },
];

// flatten histogram bars
const histogram = data.flatMap((d, i) =>
  d.bars.map((b, j) => ({
    day: d.day,
    x: i + j * 0.15,
    value: d.value,
    bar: b,
  }))
);

const CustomDot = ({ cx, cy, payload }: any) => {
  if (payload.day === "Ming") {
    return <circle cx={cx} cy={cy} r={5} fill="#2563EB" />;
  }
  return null;
};

const LabelBox = ({ viewBox }: any) => {
  if (!viewBox) return null;
  const { x, y } = viewBox;

  return (
    <g>
      <rect x={x - 26} y={y - 30} width="52" height="22" rx="6" fill="#EF4444" />
      <text
        x={x}
        y={y - 16}
        fill="#fff"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
      >
        4.4 m³
      </text>
    </g>
  );
};

export default function WaterChart() {
  return (
    <div className="w-full h-[220px]">

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={histogram}
          margin={{ top: 35, right: 40, left: 0, bottom: 0 }}
        >

          <defs>
  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.18}/>
    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/>
  </linearGradient>
</defs>
          {/* histogram background */}
          <Bar
            dataKey="bar"
            fill="#9CA3AF"
            opacity={0.18}
            barSize={3}
          />

        {/* area gradient */}
<Area
  type="natural"
  dataKey="value"
  stroke="none"
  fill="url(#areaGradient)"
  fillOpacity={0.9}
/>

{/* smooth curved line */}
<Line
  type="natural"
  dataKey="value"
  stroke="#2563EB"
  strokeWidth={2.8}
  strokeLinecap="round"
  strokeLinejoin="round"
  dot={<CustomDot />}
  activeDot={false}
  connectNulls
/>

          {/* red dashed line */}
   <ReferenceLine
  x={6}
  stroke="#EF4444"
  strokeDasharray="4 4"
  strokeWidth={1.5}
  label={<LabelBox />}
/>

          {/* DAYS */}
          <XAxis
  dataKey="x"
  axisLine={false}
  tickLine={false}
  tick={{ fontSize: 11, fill: "#9CA3AF" }}
  tickFormatter={(value) => {
    const days = ["Sen","Sel","Rab","Kam","Jum","Sab","Ming"];
    const index = Math.round(value);
    return days[index] || "";
  }}
/>

          {/* NUMBERS */}
          <YAxis
            orientation="right"
            domain={[0,50]}
            ticks={[10,20,30,40,50]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize:11, fill:"#9CA3AF"}}
            width={2}
          />

        </ComposedChart>
      </ResponsiveContainer>

    </div>
  );
}