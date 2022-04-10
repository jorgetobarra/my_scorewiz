import FileSaver from 'file-saver';

/* eslint-disable import/prefer-default-export */
export function saveJSONAsFile(savedData, fileName) {
  const blob = new Blob([JSON.stringify(savedData)], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, fileName);
}
