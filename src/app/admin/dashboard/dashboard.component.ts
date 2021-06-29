import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { NotificationService } from "app/common/services/notification/notification.service";
import { SessionService } from "app/common/services/session/session.service";
import { UserService } from 'app/common/services/user/user.service';
import { data } from 'jquery';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  run_disabled: boolean = false;
  users: any[];
  constructor(
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.users = this.sessionService.get().user_details
  }

  activate = (user_id) => {
    var params = {"user_id":user_id}
    this.userService.activate(params).subscribe((data)=>{
      this.notificationService.showNotification("User activated", "success")
      this.users = data.user_details;
    },(error) =>{
      this.run_disabled = false;
      this.notificationService.showNotification("Error occured, please try again", "danger");
    });
  };


  delete = (user_id) => {
    var params = {"user_id":user_id}
    this.userService.delete(params).subscribe((data)=>{
      this.notificationService.showNotification("User deleted", "success")
      this.users = data.user_details;
    },(error) =>{
      this.run_disabled = false;
      this.notificationService.showNotification("Error occured, please try again", "danger");
    });
  };

//   export_file = (file) => {
//     this.run_disabled = false;
//     console.log("file received");
//     saveAs(file, "myFile.csv");
//     this.notificationService.showNotification("File downloaded", "success");
//   }

}
