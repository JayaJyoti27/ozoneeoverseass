import { Parser } from "json2csv";

export function exportCsv(data: any[], filename: string) {
  const parser = new Parser();

  const csv = parser.parse(data);

  return {
    filename,
    csv,
  };
}
