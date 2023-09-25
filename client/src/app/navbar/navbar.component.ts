import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Status } from 'src/assets/enum/status.enum';
import * as XLXS from 'xlsx';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggleDropdown:boolean = false;

  statusList:string[] = [Status.SERVER_DOWN.toString(), Status.SERVER_UP.toString()];
  currentStatus = Status.ALL.toString();

  constructor(private app:AppComponent) { }

  changeStatus(status:string) {
    var indx = this.statusList.indexOf(status);
    this.statusList[indx] = this.currentStatus;
    this.currentStatus = status;
    this.app.filterServer(status)
    this.toggleDropDown();
  }

  toggleDropDown() {
    this.toggleDropdown = !this.toggleDropdown;
  }

  toggleAdd() {
    this.app.openAdd();
  }

  createSpreadSheet() {
    const ws = XLXS.utils.json_to_sheet(this.app.servers);
    const wb = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb, ws, 'Sheet1');
    const buffer = XLXS.write(wb, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'server-report.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    this.app.openAlert('Report downloaded');
  }

}
