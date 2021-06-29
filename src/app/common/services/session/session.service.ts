// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SessionService {

//   constructor() { }
// }

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SessionUserModel } from "app/common/models/sessionUsers/session-user.model";

@Injectable({
    providedIn: "root",
})
export class SessionService {
    constructor(private router: Router, ) {}

    login(sessionUser: SessionUserModel): void {
        this.redirect_to_admin();
        this.set(sessionUser);
    }

    logout(): void {
        this.redirect_to_login();
        this.clear();
    }

    redirect_to_login(): void {
        window.location.replace("/login");
    }

    redirect_to_admin(): void {
        window.location.replace("/dashboard");
    }

    set(state): void {
        localStorage.setItem("state", JSON.stringify(state));
    }
    get()  {
        try {
            return JSON.parse(localStorage.getItem("state"));
        } catch (error) {
            console.log(error);
            console.log("Invalid JSON found in localStorage, clearing.....");
            this.clear();
            return null;
        }
       
    }

    clear(): void {
        localStorage.removeItem("state");
        // localStorage.clear();
    }


}
