import { Component, OnInit } from '@angular/core';
import { ServerService } from './service/server.service';
import { Server } from 'src/assets/interface/server';
import { Status } from 'src/assets/enum/status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'server-manager';
  servers:Server[] = [];
  result:Server[] = [];
  dataLoaded:boolean = false;
  alertMsg:string = '';

  selectedDeletServer!:Server;
  
  constructor (private service:ServerService) { }

  ngOnInit(): void {
    this.service.listAllServers().subscribe((res) => {
      this.servers = res.data!.servers!;
      this.filterServer(Status.ALL);
      this.openAlert(res.message);
      this.dataLoaded = true;
    }, (err) => {
      console.log(err);
    })
  }

  openAdd() {
    document.getElementById('add')!.style.display = 'flex';
  }
  closeAdd() {
    document.getElementById('add')!.style.display = 'none';
  }

  openDelete() {
    document.getElementById('delete')!.style.display = 'flex';
  }
  closeDelete() {
    document.getElementById('delete')!.style.display = 'none';
  }

  pingServer(server:Server, id:string) {
    var idx = this.servers.indexOf(server);
    document.getElementById(id)!.innerHTML = 'swap_vert';
    this.service.pingServer(server.ipAddress).subscribe((res) => {
      this.servers[idx] = res.data!.server!;
      this.openAlert(res.message);
      document.getElementById(id)!.innerHTML = 'router';
    }, (err) => {
      console.log(err);
    });
  }

  deleteServer(server:Server) { 
    this.selectedDeletServer = server;
    this.openDelete();
  }

  filterServer(status:string) {
    switch (status) {
      case Status.ALL.toString():
        this.result = this.servers;
        this.openAlert('Server filter by ALL');
        break;

      case Status.SERVER_UP.toString():
        this.dataLoaded = false;
        this.result = [];
        for(let server of this.servers) {
          if (server.status == Status.SERVER_UP) {
            this.result.push(server);
          }
        }
        this.dataLoaded = true;
        this.openAlert('Server filter by SERVER_UP');
        break;

      case Status.SERVER_DOWN.toString():
          this.dataLoaded = false;
          this.result = [];
          for(let server of this.servers) {
            if (server.status == Status.SERVER_DOWN) {
              this.result.push(server);
            }
          }
          this.dataLoaded = true;
          this.openAlert('Server filter by SERVER_DOWN');
          break;
      default:
        console.log("No such case: ", status);
        
    }
  }

  openAlert(msg:string) {
    this.closeAlert()
    this.alertMsg = msg;
    document.getElementById('alert')!.style.display = 'flex';
    setTimeout(this.closeAlert, 4000);
  }

  closeAlert() {
    document.getElementById('alert')!.style.display = 'none';
  }
  
}
