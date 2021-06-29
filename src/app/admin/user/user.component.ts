import { Component, OnInit } from '@angular/core';
import { SessionService } from 'app/common/services/session/session.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from 'app/common/services/user/user.service';
import { NotificationService } from 'app/common/services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  updateForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: [''],
    email: ['', [Validators.email, Validators.required]],
    username: ['', [Validators.required]],
    profile_image: ['']
  });
  user:any;
  formData = new FormData

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: UserService

  ) {
  }

  ngOnInit() {
    this.user = this.sessionService.get().user;
    this.setDefaultValue();
    console.log(this.user)
  }

  setDefaultValue() { 
    this.updateForm.setValue({
      username: this.user.username, 
      first_name: this.user.first_name,
      last_name:this.user.last_name,
      email: this.user.email,
      profile_image:null
    });
}
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.formData.append('profile_image', file) 
    }
    else {
      this.formData.append('profile_image', null) 

    }
  }
  onSubmit(): void {
    console.log(this.updateForm.value);
    if (this.updateForm.valid) {
      let params: any = this.updateForm.value;
      params.is_active = true;
      console.log(params);
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          this.formData.append(key , params[key])
        }
    }
      console.log(this.formData);
      this.userService.update(this.formData , this.user.id).subscribe((data: any): void => {
        console.log(data);
        this.notificationService.showNotification("updated successfully", 'success');
        this.router.navigate(['/user']);
      },
        (error: any): void => {
          console.log('HTTP Error', error);
          if (typeof (error.error) == 'object') {
            for (const key in error.error) {
              this.notificationService.showNotification("Error: " + error.error[key], "danger");
            }
          }
          else if (typeof (error.error) == 'string') {
            this.notificationService.showNotification("Error: " + error.error, "danger");
          }
        }
      );
    } else {
      if (!this.updateForm.valid) {
        this.notificationService.showNotification("Please fill all fields correctly", 'danger');
      }
    }
  }

}
