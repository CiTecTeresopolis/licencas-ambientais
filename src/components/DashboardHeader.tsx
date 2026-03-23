import { CalendarDays, Database, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  year: string;
  availableYears: string[];
  onYearChange: (year: string) => void;
}

const DashboardHeader = ({ year, availableYears, onYearChange }: Props) => {
  return (
    <header className="bg-primary border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-18 px-4">
        <div className="flex items-center gap-3">
          <img
            style={{ width: 250, height: 180 }}
            src="logo.png"
            alt="CIE Logo"
            className="object-contain mt-2 mb-2"
          />
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            {/* <Leaf className="w-5 h-5 text-primary-foreground" /> */}
          </div>
          <div>
            <h1 className="text-2xl text-white font-bold text-foreground leading-tight">
              Licenças Ambientais
            </h1>
            <p className="text-white text-md text-muted-foreground">
              Dashboard das Licenças Ambientais Emitidas - Teresópolis
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 mt-1">
            <Database className="w-4 h-4 text-white" />
            <Button style={{ padding: 15, paddingBottom: 20, paddingTop: 20 }} variant="secondary" size="lg" asChild className="hidden sm:flex bg-white/10 hover:bg-white/20 text-white border-none h-7 px-2 text-xs mt-2">
              <a href={`https://dados.teresopolis.rj.gov.br/dataset/licencas-ambientais/resource/5a8220fd-efee-4ad5-87b1-322a50cddecf`} target="_blank" rel="noreferrer" download>

                Base de Dados
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <CalendarDays className="w-4 h-4 text-white" />
            <Select value={year} onValueChange={onYearChange}>
              <SelectTrigger className="w-28 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableYears.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
