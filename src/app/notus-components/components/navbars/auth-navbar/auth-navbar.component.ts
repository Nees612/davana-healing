import { Component, OnInit } from "@angular/core";
import { IndexDropdownComponent } from "../../dropdowns/index-dropdown/index-dropdown.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PagesDropdownComponent } from "../../dropdowns/pages-dropdown/pages-dropdown.component";

@Component({
  selector: "app-auth-navbar",
  standalone: true,
  imports: [IndexDropdownComponent, CommonModule, RouterModule, PagesDropdownComponent],
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
