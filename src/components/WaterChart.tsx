import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useMemo } from "react";

type ChartRange = "Harian" | "Mingguan" | "Bulanan";
type ChartDatum = {
  x: string;
  value: number;
  bar: number;
};

type IndexedChartDatum = ChartDatum & {
  idx: number;
};

const DATA_BY_RANGE: Record<ChartRange, ChartDatum[]> = {
  Harian: [
    { x: "00:00", value: 8, bar: 4 },
    { x: "03:00", value: 6, bar: 3 },
    { x: "06:00", value: 11, bar: 5 },
    { x: "09:00", value: 18, bar: 7 },
    { x: "12:00", value: 14, bar: 6 },
    { x: "15:00", value: 20, bar: 8 },
    { x: "18:00", value: 26, bar: 9 },
    { x: "21:00", value: 16, bar: 6 },
  ],
  Mingguan: [
    { x: "Sen", value: 24, bar: 7 },
    { x: "Sel", value: 28, bar: 8 },
    { x: "Rab", value: 32, bar: 9 },
    { x: "Kam", value: 35, bar: 10 },
    { x: "Jum", value: 18, bar: 6 },
    { x: "Sab", value: 30, bar: 9 },
    { x: "Ming", value: 50, bar: 12 },
  ],
  Bulanan: [
    { x: "M1", value: 32, bar: 9 },
    { x: "M2", value: 28, bar: 8 },
    { x: "M3", value: 36, bar: 11 },
    { x: "M4", value: 30, bar: 10 },
  ],
};

function LabelBox({ viewBox, value }: { viewBox?: { x: number; y: number }; value: number }) {
  if (!viewBox) return null;
  const { x, y } = viewBox;
  const safeY = Math.max(y, 34);

  return (
    <g>
      <rect x={x - 26} y={safeY - 30} width="52" height="22" rx="6" fill="#EF4444" />
      <text
        x={x}
        y={safeY - 16}
        fill="#fff"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
      >
        {`${value.toFixed(1)} m³`}
      </text>
    </g>
  );
}

function ActiveIndicator({
  cx,
  cy,
  value,
}: {
  cx?: number;
  cy?: number;
  value?: number;
}) {
  if (typeof cx !== "number" || typeof cy !== "number" || typeof value !== "number") {
    return null;
  }

  const safeLabelY = Math.max(cy - 42, 8);

  return (
    <g>
      <line
        x1={cx}
        x2={cx}
        y1={24}
        y2={1000}
        stroke="#EF4444"
        strokeDasharray="4 4"
        strokeWidth={1.5}
      />
      <rect x={cx - 26} y={safeLabelY} width="52" height="22" rx="6" fill="#EF4444" />
      <text
        x={cx}
        y={safeLabelY + 14}
        fill="#fff"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
      >
        {`${value.toFixed(1)} m³`}
      </text>
      <circle cx={cx} cy={cy} r={6} fill="#2563EB" stroke="#EFF6FF" strokeWidth={2} />
    </g>
  );
}
type ChartItem = {
  timestamp: string;
  cumulative: number;
  forward: number;
  backward: number;
};
type WaterChartProps = {
  data?: any[]
}

export default function WaterChart({ data = [] }: WaterChartProps) {
console.log("RAW DATA:", data)

const chartData = useMemo(() => {
  return (data ?? []).slice(0, 12).map((item, idx) => ({
    idx,
    x: `M${idx + 1}`,
    value: Number(item.forward ?? 0),
    bar: Number(item.forward ?? 0),
  }))
}, [data])

console.log("CHART DATA:", chartData)

const maxValue = Math.max(
  ...(chartData ?? []).map((item) => Number(item.value || 0)),
  10
);
  const yMax = Math.ceil((maxValue + 5) / 10) * 10;

return (
  <div className="w-full h-[260px]">
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart
        data={chartData}
        margin={{ top: 24, right: 0, left: 0, bottom: 0 }}
      >

        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.18}/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>

        <Bar
          dataKey="bar"
          fill="#9CA3AF"
          opacity={0.18}
          barSize={4}
        />

        <Area
          type="monotone"
          dataKey="value"
          fill="url(#areaGradient)"
          stroke="#2563EB"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#2563EB"
          strokeWidth={4}
          dot={true}
        />

        <XAxis
          type="number"
          dataKey="idx"
          domain={[0, (chartData ?? []).length - 1]}
          ticks={(chartData ?? []).map((item) => item.idx)}
          tickFormatter={(value) => (chartData ?? [])[Number(value)]?.x ?? ""}
          allowDecimals={false}
          interval={0}
          padding={{ left: 0, right: 0 }}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#9CA3AF" }}
        />

        <YAxis
          orientation="right"
          domain={[0, maxValue + 10]}
          axisLine={false}
          tickLine={false}
        />

      </ComposedChart>
    </ResponsiveContainer>
  </div>
);
}