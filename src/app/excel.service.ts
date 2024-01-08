// excel.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private data: any[] = [];
  dataUpdated = new EventEmitter<any[]>();

  constructor() {
    // Load data from Excel file during service initialization
    this.loadDataFromExcel();
  }

  private loadDataFromExcel() {
    // Assuming you have a file path or URL to your Excel file
    const excelFilePath = 'asset/userData.xlsx';

    // Check if the file path is provided
    if (excelFilePath) {
      // Read Excel file
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet is the one containing data
        const sheetName = workbook.SheetNames[0];
        const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Update the service's data property
        this.data = excelData;
      };

      // Read the file as an array buffer
      fileReader.readAsArrayBuffer(new Blob([excelFilePath]));
    } else {
      // Initialize an empty array if no file path is provided
      this.data = [];
    }
  }

  getData(): any[] {
    return this.data;
  }

  createData(newData: any): void {
    // Add new data to the array
    this.data.push(newData);

    // Emit an event to notify components about the updated data
    this.dataUpdated.emit(this.data);

    // Save data to the Excel file (you need to implement this)
    this.saveDataToExcel();
  }

  updateData(index: number, updatedData: any): void {
    // Update data in the array
    this.data[index] = updatedData;
    // Save data to the Excel file
    this.saveDataToExcel();
  }

  deleteData(index: number): void {
    // Delete data from the array
    this.data.splice(index, 1);
    // Save data to the Excel file (you need to implement this)
    this.saveDataToExcel();
  }

  private saveDataToExcel(): void {
    // Assuming 'Sheet1' is the sheet name
    const sheetName = 'Sheet1';

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(this.data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Create a Blob from the ArrayBuffer
    const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Save the ArrayBuffer to the existing file using FileSaver
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'userData.xlsx');
  }
}
