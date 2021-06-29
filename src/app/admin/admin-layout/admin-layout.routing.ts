import { Routes } from '@angular/router';

import { DashboardComponent } from 'app/admin/dashboard/dashboard.component';
import { UserComponent } from 'app/admin/user/user.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
];
