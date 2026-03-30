import Papa from "papaparse";

export interface LicenseRecord {
  licenciado: string;
  modalidade: string;
  codigo: string;
  dataInicial: string;
  referencia: string;
  diarioOficial: string;
}

export interface StackedLicenseData {
  name: string;
  total: number;
  diversity: number;
  [key: string]: string | number;
}

export function parseCSV(text: string): LicenseRecord[] {
  const result = Papa.parse(text, {
    delimiter: ";",
    header: false,
    skipEmptyLines: true,
  });

  const rows = result.data as string[][];
  // Skip header row
  return rows.slice(1).map((row) => ({
    licenciado: (row[0] || "").trim(),
    modalidade: (row[1] || "").trim(),
    codigo: (row[2] || "").trim(),
    dataInicial: (row[3] || "").trim(),
    referencia: (row[4] || "").trim(),
    diarioOficial: (row[5] || "").trim(),
  })).filter((r) => r.licenciado.length > 0);
}

export function countByModalidade(records: LicenseRecord[]) {
  const counts: Record<string, number> = {};
  records.forEach((r) => {
    const key = r.modalidade || "Não informado";
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}


export function countByMonth(records: LicenseRecord[]) {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  const counts: Record<string, number> = {};
  months.forEach((m) => (counts[m] = 0));

  records.forEach((r) => {
    const parts = r.dataInicial.split("/");
    if (parts.length >= 2) {
      const monthIndex = parseInt(parts[1], 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        counts[months[monthIndex]]++;
      }
    }
  });

  return months.map((name) => ({ name, value: counts[name] }));
}

export function getTopLicenciados(records: LicenseRecord[]) {
  const counts: Record<string, number> = {};
  records.forEach((r) => {
    counts[r.licenciado] = (counts[r.licenciado] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getTopWithTies(data: { name: string; value: number }[], topN: number) {
  if (data.length <= topN) return data;
  
  const thresholdValue = data[topN - 1].value;
  // Encontra todos os elementos que têm valor igual ou maior que o valor da enésima posição
  return data.filter(item => item.value >= thresholdValue);
}

export function getLicenciadosStacked(records: LicenseRecord[]): StackedLicenseData[] {
  const dataMap: Record<string, StackedLicenseData> = {};
  
  records.forEach((r) => {
    const lic = r.licenciado;
    const mod = r.modalidade || "Não informado";
    
    if (!dataMap[lic]) {
      dataMap[lic] = { name: lic, total: 0, diversity: 0 };
    }
    
    if (!dataMap[lic][mod]) {
      dataMap[lic][mod] = 0;
      dataMap[lic].diversity += 1;
    }
    
    dataMap[lic][mod] = ((dataMap[lic][mod] as number) || 0) + 1;
    dataMap[lic].total += 1;
  });

  return Object.values(dataMap).sort((a, b) => {
    if (b.total !== a.total) {
      return b.total - a.total;
    }
    return b.diversity - a.diversity;
  });
}

export function getTopWithTiesStacked(data: StackedLicenseData[], topN: number) {
  if (data.length <= topN) return data;
  
  const thresholdItem = data[topN - 1];
  let includeCount = topN;
  while (
    includeCount < data.length &&
    data[includeCount].total === thresholdItem.total &&
    data[includeCount].diversity === thresholdItem.diversity
  ) {
    includeCount++;
  }
  
  return data.slice(0, includeCount);
}
