import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pais } from "./pais.model";
import { HttpService } from "./http.service";
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
    let elegido: Pais[];
    return this.obtenerPaises().pipe(
      map((paisEdit: Pais[]) => {
        //  this.datosPais = paisEdit;
        elegido = paisEdit.filter((pais) => {
          return pais.idPais === id;
        });
        console.log(elegido);
        return elegido[0];
      })
    );

    // return elegido;
  }
}
