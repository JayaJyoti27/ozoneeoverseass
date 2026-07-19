import { Parser } from "json2csv";
export function exportCsv(data, filename) {
    const parser = new Parser();
    const csv = parser.parse(data);
    return {
        filename,
        csv,
    };
}
