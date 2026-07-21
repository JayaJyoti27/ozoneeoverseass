"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCsv = exportCsv;
const json2csv_1 = require("json2csv");
function exportCsv(data, filename) {
    const parser = new json2csv_1.Parser();
    const csv = parser.parse(data);
    return {
        filename,
        csv,
    };
}
