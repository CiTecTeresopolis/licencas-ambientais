import {
  parseCSV,
  countByMonth,
  LicenseRecord,
  getTopLicenciados,
  countByModalidade,
} from "@/lib/csv-parser";
import StatsCard from "@/components/StatsCard";
import Modalidade from "@/components/Modalidade";
import ModalidadesChart from "@/components/ModalidadesChart";
import ChartMensal from "@/components/ChartMensal";
import { useEffect, useMemo, useState } from "react";
import TopLicenciados from "@/components/TopLIcenciados";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import { FileCheck2, Users, ScrollText, CalendarRange } from "lucide-react";

const AVAILABLE_YEARS = ["2025"];

const Index = () => {
  const [year, setYear] = useState("2025");
  const [records, setRecords] = useState<LicenseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/data/${year}.csv`)
      .then((r) => r.text())
      .then((text) => {
        setRecords(parseCSV(text));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [year]);

  const monthData = useMemo(() => countByMonth(records), [records]);
  const topData = useMemo(() => getTopLicenciados(records), [records]);
  const modalidadesData = useMemo(() => countByModalidade(records), [records]);
  console.log("Modalidades Data:", modalidadesData);
  const uniqueLicenciados = useMemo(
    () => new Set(records.map((r) => r.licenciado)).size,
    [records],
  );
  const uniqueModalidades = useMemo(
    () => new Set(records.map((r) => r.modalidade)).size,
    [records],
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader
        year={year}
        availableYears={AVAILABLE_YEARS}
        onYearChange={setYear}
      />

      <main className="flex-1 container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Carregando dados…
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total de Licenças"
                value={records.length}
                icon={FileCheck2}
              />
              <StatsCard
                title="Modalidades"
                value={uniqueLicenciados}
                icon={ScrollText}
              />
              <StatsCard
                title="Maior Modalidade"
                value={`${modalidadesData[0]?.value}`}
                description={modalidadesData[0]?.name || "N/A"}
                icon={FileCheck2}
              />
              <StatsCard
                title="Ano"
                value={year}
                icon={CalendarRange}
                description={`${records.length} registros carregados`}
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TopLicenciados data={topData.slice(0, 5)} />
              <ModalidadesChart data={modalidadesData} />
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              <ChartMensal data={monthData} />
            </div>

            {/* Charts Row 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              <Modalidade data={topData} />
            </div>
          </div>
        )}
      </main>

      <DashboardFooter totalRecords={records.length} year={year} />
    </div>
  );
};

export default Index;
