import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getTopWithTies } from "@/lib/csv-parser";

const COLORS = [
  "#264653",
  "#2a9d8f",
  "#dfa208",
  "#f4a261",
  "#e76f51",
  "#8bc34a",
  "#00bcd4",
  "#3f51b5",
  "#673ab7",
  "#e91e63",
];

const getColor = (index: number) => {
  if (index < COLORS.length) return COLORS[index];
  return `hsl(${(index * 137.5) % 360}, 65%, 50%)`;
};

interface Props {
  data: { name: string; value: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white p-2 shadow-md rounded-md border"
        style={{ borderColor: payload[0].payload.fill }}
      >
        <p
          className="text-md font-bold"
          style={{ color: payload[0].payload.fill }}
        >
          {payload[0].name}
        </p>
        <p className="text-md text-slate-600">
          Valor: <span className="font-semibold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};


const ModalidadesChart = ({ data }: Props) => {
  const chartData = getTopWithTies(data, 5);

  return (
    <Card className="col-span-1 flex flex-col h-full">
      <CardHeader className="pb-2 border-b mb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Distribuição por Modalidade (Top 5)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              label={({ value }) => `${value}`}
              labelLine={false}
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={getColor(i)} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ fontSize: "0.8rem", paddingTop: "20px" }}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ModalidadesChart;
