import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/assets/interface/response';
import { Server } from 'src/assets/interface/server';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  apiURL:string = enviroment.api;

  constructor(private http:HttpClient) { }

  listAllServers():Observable<Response> {
    return this.http.get<Response>(`${this.apiURL}/list`);
  }

  pingServer(ipAddress:string):Observable<Response> {
    return this.http.get<Response>(`${this.apiURL}/ping/${ipAddress}`);
  }

  createServer(server:Server):Observable<Response> {
    return this.http.post<Response>(`${this.apiURL}/create`, server);
  }

  deleteServer(id:string):Observable<Response> {
    return this.http.delete<Response>(`${this.apiURL}/delete/${id}`);
  }

}
