import { Component, OnInit } from "@angular/core";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../components/footers/footer/footer.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [AuthNavbarComponent,FooterComponent],
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
