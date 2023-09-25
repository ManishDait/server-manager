import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Server } from 'src/assets/interface/server';
import { Status } from 'src/assets/enum/status.enum';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent {
  
  server:Server = {
    ipAddress: '',
    name: '',
    memory: '',
    type: '',
    imgURL: '',
    status: Status.SERVER_DOWN
  }

  constructor(private app:AppComponent, private service:ServerService) { }

  toggleClose() {
    this.app.closeAdd();
  }

  addServer() {
    if (this.server.ipAddress == '' || this.server.name == '' || this.server.type == '' || this.server.memory == '') {
      this.app.openAlert('Fill all fields')
      return;
    }
    this.service.createServer(this.server).subscribe((res) => {
      this.app.servers.push(res.data!.server!);
      this.app.openAlert(res.message);
      this.toggleClose();
    }, (err) => {
      console.log(err);
    });
  }

}
