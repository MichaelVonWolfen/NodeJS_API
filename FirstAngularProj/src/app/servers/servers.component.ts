import { Component, OnInit } from '@angular/core';
import {LogicalFileSystem} from "@angular/compiler-cli/src/ngtsc/file_system";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created'
  serverName: string = "";
  serverCreated=false;
  servers= ['TestServer1', 'TestServer2']
  constructor() {
    setTimeout(()=>{
      this.allowNewServer = true;
    },2000)
  }

  ngOnInit(): void {
  }
  onCreateServer(){
    this.serverCreated = true
    this.serverCreationStatus = `Server ${this.serverName} was created.`
    this.servers.push(this.serverName)
  }

  onUpdateServerName(event:Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
