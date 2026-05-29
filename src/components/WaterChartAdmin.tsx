import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  Tooltip,
} from "recharts";

import { useMemo } from "react";

type ChartDatum = {
  month: string;
  value: number;
  active?: boolean;
};

type IndexedChartDatum =
  ChartDatum & {
    idx: number;
  };

function ActiveIndicator({
  cx,
  cy,
  value,
}: any) {

  if (
    typeof cx !== "number" ||
    typeof cy !== "number" ||
    typeof value !== "number"
  ) {
    return null;
  }

  const safeLabelY =
    Math.max(cy - 42, 8);

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

      <rect
        x={cx - 26}
        y={safeLabelY}
        width="52"
        height="22"
        rx="6"
        fill="#EF4444"
      />

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

      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#2563EB"
        stroke="#EFF6FF"
        strokeWidth={2}
      />

    </g>
  );
}

type WaterChartAdminProps = {
  data: ChartDatum[];
};

export default function WaterChartAdmin({
  data,
}: WaterChartAdminProps) {

  const chartData:
    IndexedChartDatum[] =
      useMemo(
        () =>
          data.map(
            (item, idx) => ({
              ...item,
              idx,
            })
          ),
        [data]
      );

  const maxValue =
    Math.max(
      ...chartData.map(
        (d) => d.value
      ),
      10
    );

  return (
    <div className="w-full h-[260px]">

      <ResponsiveContainer
        width="100%"
        height={260}
      >

        <ComposedChart
          data={chartData}
          margin={{
            top: 24,
            right: 0,
            left: 0,
            bottom: 0
          }}
        >

          <defs>
            <linearGradient
              id="areaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3B82F6"
                stopOpacity={0.18}
              />

              <stop
                offset="100%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Bar
            dataKey="value"
            fill="#9CA3AF"
            opacity={0.18}
            barSize={4}
          />

          <Area
            type="monotone"
            dataKey="value"
            fill="url(#areaGradient)"
            stroke="none"
            dot={false}
            activeDot={false}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563EB"
            strokeWidth={2.5}
            dot={false}
            activeDot={(props: any) => (
              <ActiveIndicator
                cx={props.cx}
                cy={props.cy}
                value={props.value}
              />
            )}
          />

          <Tooltip
            content={() => null}
            cursor={false}
          />

          <XAxis
            type="number"
            dataKey="idx"
            domain={[
              0,
              chartData.length - 1
            ]}
            ticks={chartData.map(
              (d) => d.idx
            )}
            tickFormatter={(v) =>
              chartData[
                Number(v)
              ]?.month ?? ""
            }
            allowDecimals={false}
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "#9CA3AF"
            }}
          />

          <YAxis
            orientation="right"
            domain={[
              0,
              maxValue + 10
            ]}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "#9CA3AF"
            }}
          />

        </ComposedChart>

      </ResponsiveContainer>

    </div>
  );
}