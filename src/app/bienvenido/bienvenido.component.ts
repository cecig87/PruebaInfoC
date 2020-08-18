import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-bienvenido",
  templateUrl: "./bienvenido.component.html",
  styleUrls: ["./bienvenido.component.css"],
})
export class BienvenidoComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onAdd() {
    this.router.navigate(["/new"], { relativeTo: this.route });
  }

  onVer() {
    this.router.navigate(["/list"], { relativeTo: this.route });
  }
}
