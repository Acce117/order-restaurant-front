import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth-service';
import { AppHasRoles } from "../../../auth/directives/appHasRoles";


@Component({
  selector: 'app-menu',
  imports: [MatListModule, MatIconModule, MatDividerModule, RouterModule, AppHasRoles],
  templateUrl: './appMenu.html',
  styleUrl: './appMenu.scss',
})
export class AppMenu {
  authService = inject(AuthService);
  
  logout() {
    this.authService.logout();
  }
}
