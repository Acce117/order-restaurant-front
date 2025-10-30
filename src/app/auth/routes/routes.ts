import { Routes } from "@angular/router";
import { Login } from "../components/login/login";
import { SignIn } from "../components/sign_in/sign_in.component";

export const authRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: Login},
    { path: 'sign-in', component: SignIn }
];