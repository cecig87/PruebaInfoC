import { Component, OnInit } from "@angular/core";

import { Pais } from "./pais.model";
//import { httpService } from './http.service';
import { Subject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  outPrincipal = false;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.outPrincipal = true;
  }

  onEntrada() {
    this.router.navigate(["/"], { relativeTo: this.route });
    this.outPrincipal = true;
  }
}
