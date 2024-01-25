import * as XLSX from 'xlsx';

const excelTransferReportGeneration = () => {
    const data = `
# Отчет о переносе предметов
Дата: 25.01.2024
Текущий материально ответственный: Нагайцев М. В.
Новый материально ответственный: Бондаренко Д. В.
## Список перенесенных предметов
- 1. Принтер HP LaserJet Enterprise M712dn (формат A3)
- 2. Принтер Kyocera FS-C8500DN A3 в компл. с каб. USB 2.0 HAMA AM/BM, 1.8 м.
- 3. Принтер Kyocera FS-C8500DN A3 в компл. с каб. USB 2.0 HAMA AM/BM, 1.8 м.
- 4. Интерактивная доска 50'' IQBoard PS S050B  USB RS 13 кг
`;

    const lines = data.split('\n');
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(lines.map(line => [line]));

    XLSX.utils.book_append_sheet(workbook, sheet, 'Report');

    const blob = XLSX.write(workbook, { bookType: 'xlsx', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    link.download = 'report.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export default excelTransferReportGeneration;