import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  newData: { name: string, age: number } = { name: '', age: 0 };

  constructor(private excelService: ExcelService) {}

  ngOnInit(): void {}

  getExcelData(): any[] {
    return this.excelService.getData();
  }

  updateItem(index: number): void {
    const updatedData = { /* new data */ };
    this.excelService.updateData(index, updatedData);
  }

  deleteItem(index: number): void {
    this.excelService.deleteData(index);
  }

  addData(): void {
    this.excelService.createData(this.newData);
    // Clear input fields after adding data
    this.newData = { name: '', age: 0 };
  }
}