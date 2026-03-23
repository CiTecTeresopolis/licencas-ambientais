import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: { name: string; value: number }[];
}

const ChartMensal = ({ data }: Props) => {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader className="pb-2 border-b mb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Licenças por Mês
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(145, 20%, 88%)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "hsl(160, 10%, 45%)" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(160, 10%, 45%)" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5rem",
                border: "1px solid hsl(145, 20%, 88%)",
                fontSize: "0.8rem",
              }}
            />
            <Bar
              dataKey="value"
              name="Licenças"
              fill="hsl(152, 55%, 28%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartMensal;
