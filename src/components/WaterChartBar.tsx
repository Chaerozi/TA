import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

type ChartRange = "Harian" | "Mingguan" | "Bulanan";
type ChartDatum = { x: string; value: number };

const DATA_BY_RANGE: Record<ChartRange, ChartDatum[]> = {
  Harian: [
    { x: "00:00", value: 200 },
    { x: "03:00", value: 6 },
    { x: "06:00", value: 11 },
    { x: "09:00", value: 18 },
    { x: "12:00", value: 14 },
    { x: "15:00", value: 20 },
    { x: "18:00", value: 26 },
    { x: "21:00", value: 16 },
  ],
  Mingguan: [
    { x: "Sen", value: 45 },
    { x: "Sel", value: 32 },
    { x: "Rab", value: 22 },
    { x: "Kam", value: 28 },
    { x: "Jum", value: 40 },
    { x: "Sab", value: 42 },
    { x: "Ming", value: 26 },
  ],
  Bulanan: [
    { x: "M1", value: 38 },
    { x: "M2", value: 29 },
    { x: "M3", value: 46 },
    { x: "M4", value: 33 },
  ],
};

type WaterChartBarProps = {
  range: ChartRange;
};

export default function WaterChartBar({ range }: WaterChartBarProps) {
  const [data, setData] = useState<ChartDatum[]>(
    DATA_BY_RANGE[range]
  );

  useEffect(() => {

  const loadChart = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/api/v1/dashboard/chart?range=${range}`
      );

      const result = await response.json();

      console.log("chart api:", result);

      setData(result);

    } catch (error) {

      console.error(error);

    }

  };

  loadChart();

}, [range]);

  const maxValue =
  data.length > 0
    ? Math.max(...data.map(item => item.value))
    : 0;
  const yMax = Math.ceil((maxValue + 5) / 10) * 10;

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 24, right: 0, left: 0, bottom: 0 }}
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
            barSize={range === "Harian" ? 20 : 34}
          >
            {data.map((_, index) => (
              <Cell key={index} fill="url(#barGradient)" />
            ))}
          </Bar>

          {/* Days */}
          <XAxis
            dataKey="x"
            padding={{ left: 0, right: 0 }}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
          />

          {/* Numbers */}
          <YAxis
            orientation="right"
            domain={[0, yMax]}
            ticks={[10, 20, 30, 40, 50, 60].filter((tick) => tick <= yMax)}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            tickMargin={6}
            width={30}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}