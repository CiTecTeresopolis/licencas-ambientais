import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { StackedLicenseData } from "@/lib/csv-parser";
import { useMemo } from "react";

import { getModalidadeColor } from "@/lib/utils";

interface Props {
  data: StackedLicenseData[];
  allModalidades: { name: string; value: number }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-slate-200">
        <p className="text-sm font-bold text-slate-700 mb-2 truncate max-w-[250px]" title={label}>{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-600 truncate max-w-[150px]" title={entry.name}>
                  {entry.name}
                </span>
              </div>
              <span className="font-semibold text-slate-800">{entry.value}</span>
            </div>
          ))}
          <div className="border-t pt-1 mt-2 flex justify-between font-bold text-sm text-slate-800">
            <span>Total:</span>
            <span>{data.total}</span>
          </div>
          <div className="flex justify-between font-bold text-xs text-slate-500">
            <span>Diversidade:</span>
            <span>{data.diversity} modalidades</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const TopLicenciados = ({ data, allModalidades }: Props) => {
  const modalidades = useMemo(() => {
    const mods = new Set<string>();
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'name' && key !== 'total' && key !== 'diversity') {
          mods.add(key);
        }
      });
    });
    return Array.from(mods);
  }, [data]);

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2 border-b mb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Maiores Números de Licenciamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 13 }}
              tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 15)}...` : value}
              angle={-25}
              textAnchor="end"
              height={50}
            />
            <YAxis type="number" />
            <Tooltip content={<CustomTooltip />} />

            {modalidades.map((mod, index) => (
              <Bar
                key={mod}
                dataKey={mod}
                stackId="a"
                fill={getModalidadeColor(mod, allModalidades)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TopLicenciados;
