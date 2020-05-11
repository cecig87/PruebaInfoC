import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
import { Pais } from './pais.model';

@Injectable({providedIn: 'root'})
export class ListaService {
   listaPaises = new BehaviorSubject<Pais[]>([]);
   actualizandoPais = new BehaviorSubject<Pais[]>([])
   datosPais: Pais[] = [];

   agregarPais(pais: Pais) {
     this.datosPais = [...this.datosPais, pais];
     this.listaPaises.next(this.datosPais)
    };

    updatePais(id: number, paisActual: Pais) {
      this.datosPais[id] = paisActual;
      this.listaPaises.next(this.datosPais);
    };
    
    obtenerPaisById(id: number) {
     return this.datosPais[id];  
     
    };
}