import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListaService } from '../lista.service';
import { Pais } from '../pais.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, OnDestroy {

dObtenidos: Pais[] =[];
susbcribirse: Subscription;
editando = false;
buscado: string;
index: number;
faTrashAlt = faTrashAlt;
edit = faEdit;
datosLista = true;

constructor(private listaServicio: ListaService, private router: Router, private route: ActivatedRoute) { };

  ngOnInit() {
     this.susbcribirse = this.listaServicio.listaPaises.subscribe((listado: Pais[]) =>{this.dObtenidos = listado; 
      });
    this.onControlLista();
  };

  onControlLista(){
     if(this.dObtenidos.length === 0){
      this.datosLista = false;
     };
  };

   onEliminar(pais: string) {
      this.index = this.dObtenidos.findIndex(id =>  {return id.namePais === pais});
   };

   onConfirmar(){   
      this.dObtenidos.splice(this.index, 1);
      this.onControlLista();
   };

   onEditar(pais: string) {
     this.editando = true;
     let paisId =  this.dObtenidos.findIndex((nombre) => {return nombre.namePais === pais}); 
    console.log(paisId) 
    this.router.navigate([ '../' , paisId, 'edit'], {relativeTo: this.route});
   };

   onSearch() {
     if(this.buscado){
     this.dObtenidos = this.dObtenidos.filter(paisBuscado => {return paisBuscado.namePais.toLocaleLowerCase().match(this.buscado.toLocaleLowerCase())  })
    } else{
      this.ngOnInit();
    };
   };

  ngOnDestroy() {
    this.susbcribirse.unsubscribe();
  }
}
