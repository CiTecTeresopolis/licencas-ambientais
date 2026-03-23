import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ícones comuns

interface Props {
  data: { name: string; value: number }[];
}

const Modalidade = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // 1. Ordenação (Opcional, mas recomendado para listas de ranking)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // 2. Lógica de Paginação
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sortedData.slice(startIndex, endIndex);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Lista de Licenciados
          </CardTitle>
          <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded">
            Total: {data.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-0">
        <div className="divide-y divide-slate-100">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col max-w-[80%]">
                <span className="text-sm font-semibold text-slate-700 truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Registro #{startIndex + index + 1}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg font-black text-orange-500">
                  {item.value}
                </span>
                <span className="text-[9px] text-slate-400">
                  {item.value > 1 ? `${item.value} Licenças` : "Licença"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between py-4 border-t">
        <div className="text-xs text-muted-foreground">
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próximo
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Modalidade;
