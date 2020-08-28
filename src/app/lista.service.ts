import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pais } from "./pais.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ListaService {
  listaPaises = new BehaviorSubject<Pais[]>([]);
  actualizandoPais = new BehaviorSubject<Pais[]>([]);
  datosPais: Pais[] = [];

  constructor(private http: HttpClient) {}

  obtenerPaises() {
    return this.http.get("http://localhost:8080/paises").pipe(
      map((paises: Pais[]) => {
        this.datosPais = paises;
        return this.datosPais;
      })
    );
  }

  agregarPais(pais: Pais) {
    this.datosPais = [...this.datosPais, pais];

    this.listaPaises.next(this.datosPais);
  }

  updatePais(id: number, paisActual: Pais) {
    this.datosPais[id] = paisActual;
    this.listaPaises.next(this.datosPais);
  }

  obteniendoPais() {
    this.obtenerPaises().subscribe((paisEdit: Pais[]) => {
      this.datosPais = paisEdit;
    });
  }

  obtenerPaisById(id: number) {
    return this.obtenerPaises().pipe(
      map((paisEdit: Pais[]) => paisEdit.find((pais) => pais.idPais === id))
    );
  }
}
