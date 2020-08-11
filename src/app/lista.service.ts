import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Pais } from "./pais.model";
import { HttpService } from "./http.service";

@Injectable({ providedIn: "root" })
export class ListaService {
  listaPaises = new BehaviorSubject<Pais[]>([]);
  actualizandoPais = new BehaviorSubject<Pais[]>([]);
  datosPais: Pais[] = [];

  constructor(private http: HttpService) {}

  obtenerPaises() {
    this.http.obtenerPaises().subscribe((paises: Pais[]) => {
      this.datosPais = paises;
    });
  }

  agregarPais(pais: Pais) {
    this.datosPais = [...this.datosPais, pais];
    this.listaPaises.next(this.datosPais);
  }

  updatePais(id: number, paisActual: Pais) {
    this.datosPais[id] = paisActual;
    this.listaPaises.next(this.datosPais);
  }

  obtenerPaisById(id: number) {
    this.obtenerPaises();

    let elegido = this.datosPais.filter((pais) => {
      return pais.idPais === id;
    });

    return elegido[0];
  }
}
