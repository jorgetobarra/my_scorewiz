/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import * as XLSX from 'sheetjs-style';
import { mapGridToWorkbook } from './helpers';

export default class XlsService {
  rowIsFirst(rowKey, length) {
    let isFirst = false;
    for (let numbers = 1; numbers <= length; numbers++) {
      if (rowKey.match(/\d+/)[0] === '1') isFirst = true;
    }
    return isFirst;
  }

  rowIsOdd(rowKey, length) {
    let isOdd = true;
    for (let numbers = 1; numbers <= length; numbers++) {
      if (rowKey.match(/\d+/)[0] === `${numbers}` && numbers % 2 === 0) isOdd = false;
    }
    return isOdd;
  }

  exportResultsXls(resultsGrid, contestId) {
    /* generate worksheet and workbook */
    const worksheet = XLSX.utils
      .json_to_sheet(mapGridToWorkbook(resultsGrid), { cellStyles: true });
    const workbook = XLSX.utils.book_new();

    // const worksheet = XLSX.utils.aoa_to_sheet([row]);
    Object.keys(worksheet).forEach((key) => {
      if (!key.includes('!') && this.rowIsOdd(key, resultsGrid[0].length)) {
        worksheet[key].s = {
          fill: {
            fgColor: { rgb: 'ECECEC' },
          },
        };
      }
      if (!key.includes('!') && this.rowIsFirst(key, resultsGrid[0].length)) {
        worksheet[key].s = {
          fill: {
            fgColor: { rgb: 'D0D0D0' },
          },
        };
      }
      if (worksheet[key]?.v === '-') {
        worksheet[key].v = '';
        worksheet[key].s = {
          fill: {
            fgColor: { rgb: '777777' },
          },
        };
      }
    });
    // worksheet.A2.s = { // set the style for target cell
    //   font: {
    //     name: 'Courier',
    //     sz: 24,
    //     bold: true,
    //     color: { rgb: 'FF0000' },
    //   },
    //   border: {
    //     right: { color: { rgb: 'FF0000' } },
    //   },
    // };

    XLSX.utils.book_append_sheet(workbook, worksheet, contestId);
    XLSX.writeFile(workbook, `${contestId}-results.xlsx`);
    // XLSX.writeFileXLSX(workbook, 'testXls.xlsx'); this worked with the xlsx
  }
}
