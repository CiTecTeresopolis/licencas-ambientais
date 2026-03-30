import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#264653",
  "#2a9d8f",
  "#dfa208ff",
  "#f4a261",
  "#e76f51",
  "#e76f51",
  "hsl(340, 60%, 50%)",
];

interface Props {
  data: { name: string; value: number }[];
}

// 1. Tooltip Personalizado para herdar a cor

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white p-2 shadow-md rounded-md border"
        style={{ borderColor: payload[0].payload.fill }} // Borda com a cor da fatia
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

const TopLicenciados = ({ data }: Props) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2 border-b mb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Maior Número de Licenciamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85} // Reduzi um pouco para o label não cortar
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              // 2. Valores sempre aparentes (Label)
              label={({ name, value }) => `${value}`}
              labelLine={false} // Remove as linhas dos labels para um visual mais limpo
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
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

export default TopLicenciados;
