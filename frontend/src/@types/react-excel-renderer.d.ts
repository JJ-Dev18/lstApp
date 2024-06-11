declare module 'react-excel-renderer' {
    export function readExcel(file: File, callback: (error: Error | null, rows: any[]) => void): void;
  }
  