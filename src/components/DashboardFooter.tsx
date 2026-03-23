import { FileText } from "lucide-react";

interface Props {
  totalRecords: number;
  year: string;
}

const DashboardFooter = ({ totalRecords, year }: Props) => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto flex items-center justify-between h-[100px] px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <img
            style={{ width: 250, height: 80 }}
            src="cie.png"
            alt="CIE Logo"
            className="object-contain"
          />
          <span>
            Prefeitura Municipal de Teresópolis // 2026 // Departamento de
            Governança e Dados
          </span>
        </div>
        <span>
          <a
            href="https://dados.teresopolis.rj.gov.br/dataset/licencas-ambientais/resource/5a8220fd-efee-4ad5-87b1-322a50cddecf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            base de dados de licenças ambientais{" "}
            <FileText className="inline-block ml-1" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default DashboardFooter;
