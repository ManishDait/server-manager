import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ServerService } from './service/server.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AddServerComponent } from './add-server/add-server.component';
import { FormsModule } from '@angular/forms';
import { DeleteAlertComponent } from './delete-alert/delete-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddServerComponent,
    DeleteAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
