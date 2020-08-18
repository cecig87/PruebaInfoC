import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListaService } from "../lista.service";
import { HttpService } from "../http.service";
import { Pais } from "../pais.model";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-listado",
  templateUrl: "./listado.component.html",
  styleUrls: ["./listado.component.css"],
})
export class ListadoComponent implements OnInit, OnDestroy {
  dObtenidos: Pais[] = [];
  susbcribirse: Subscription;

  editando = false;
  datosLista = true;
  estaCargando = false;

  buscado: string;
  index: number;
  faTrashAlt = faTrashAlt;
  edit = faEdit;

  constructor(
    private listaServicio: ListaService,
    private router: Router,
    private route: ActivatedRoute,
    private httpServicio: HttpService
  ) {}

  ngOnInit() {
    //this.susbcribirse = this.listaServicio.listaPaises.subscribe((listado: Pais[]) =>{this.dObtenidos = listado;
    //});
    //this.onControlLista();
    this.estaCargando = true;
    this.susbcribirse = this.listaServicio
      .obtenerPaises()
      .subscribe((paises: Pais[]) => {
        console.log(paises);
        for (let i = 0; i < paises.length; i++) {
          this.dObtenidos.push(paises[i]);
        }
        this.onControlLista();
      });
  }

  onControlLista() {
    this.estaCargando = false;
    if (this.dObtenidos.length === 0) {
      this.datosLista = false;
    }
  }

  onEliminar(pais: string) {
    this.index = this.dObtenidos.findIndex((id) => {
      return id.name === pais;
    });
  }

  onConfirmar() {
    const idBD = this.dObtenidos[this.index].idPais;
    this.dObtenidos.splice(this.index, 1);

    this.httpServicio
      .eliminarPais(idBD)
      .subscribe((responseDelete) => console.log(responseDelete));
    this.onControlLista();
  }

  onEditar(pais: string) {
    this.editando = true;
    let paisElegido = this.dObtenidos.filter((nombre) => {
      return nombre.name === pais;
    });
    let paisId = paisElegido[0].idPais;
    this.router.navigate(["../", paisId, "edit"], { relativeTo: this.route });
  }

  onSearch() {
    if (this.buscado) {
      this.dObtenidos = this.dObtenidos.filter((paisBuscado) => {
        return paisBuscado.name
          .toLocaleLowerCase()
          .match(this.buscado.toLocaleLowerCase());
      });
    } else {
      this.dObtenidos = [];
      this.ngOnInit();
    }
  }

  ngOnDestroy() {
    this.susbcribirse.unsubscribe();
  }
}
