import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { ServerService } from '../service/server.service';
import { Server } from 'src/assets/interface/server';
import { Status } from 'src/assets/enum/status.enum';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent {

  @Input() server!:Server;

  constructor(private app:AppComponent, private service:ServerService) { }

  toggleCancle() {
    this.app.closeDelete();
  }

  deleteServer() {
    var indx = this.app.servers.indexOf(this.server);
    this.service.deleteServer(this.server.id!).subscribe((res) => {
      this.app.servers.splice(indx, 1);
      this.app.filterServer(Status.ALL.toString());
      this.app.openAlert(res.message);
      this.toggleCancle();
    }, (err) => {
      console.log(err);
      this.toggleCancle();
    });
  }

}
