import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pais } from "./pais.model";
import { mergeMap } from "rxjs/operators";
import { timer } from "rxjs";

@Injectable({ providedIn: "root" })
export class HttpService {
  constructor(private http: HttpClient) {}

  ingresarPaises(nuevoPais: Pais) {
    const postData: Pais = nuevoPais;
    return this.http.post("http://localhost:8080/paises", postData);
  }

  modificarDatos(id: number, paisActual: Pais) {
    const putData: Pais = paisActual;
    return timer(5000).pipe(
      mergeMap(() =>
        this.http.put("http://localhost:8080/paises/" + id, putData)
      )
    );
  }

  eliminarPais(id: number) {
    return this.http.delete("http://localhost:8080/paises/" + id);
  }
}
