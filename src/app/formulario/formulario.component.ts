import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Pais } from "../pais.model";
import { ListaService } from "../lista.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"],
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  paisesCantidad: Pais[] = [];

  idCountry: number;
  guardado = false;
  editado = false;
  actualizado = false;
  repetido = false;
  cargar = false;
  datosEnviados = false;
  sinDatos: boolean;
  showModal: boolean;
  nombreInicial: string;

  constructor(
    private listService: ListaService,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.initForm();

    this.listService.obtenerPaises().subscribe((paises: Pais[]) => {
      this.paisesCantidad = paises;
    });

    this.cargarPaisEdit();
  }

  initForm() {
    this.formulario = new FormGroup({
      name: new FormControl(null, Validators.required),
      infectados: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      recuperados: new FormControl(null, Validators.required),
      fallecidos: new FormControl(null, Validators.required),
    });
  }

  cargarPaisEdit() {
    this.idCountry = +this.route.snapshot.params["id"];

    this.editado = this.idCountry && !isNaN(this.idCountry);
    if (!this.editado) {
      return;
    }

    this.listService.obtenerPaisById(this.idCountry).subscribe((pais) => {
      if (!pais) {
        console.log("No se han podido obtener los datos.");
        this.sinDatos = true;
        return;
      }

      this.nombreInicial = pais.name;

      this.formulario.patchValue({
        name: pais.name,
        infectados: pais.infectados,
        recuperados: pais.recuperados,
        fallecidos: pais.fallecidos,
      });
    });
  }

  onSubmit() {
    this.repetido = false;

    const name = this.formulario.value.name;
    const cantInfect = this.formulario.value.infectados;
    const cantRecovery = this.formulario.value.recuperados;
    const cantDead = this.formulario.value.fallecidos;

    const datosForm = new Pais(name, cantInfect, cantRecovery, cantDead);

    const repeticion = this.paisesCantidad.filter((paisRepetido) => {
      //controlar país repetido
      return datosForm.name === paisRepetido.name;
    });

    if (repeticion.length != 0) {
      if (!this.editado) {
        this.repetido = true;
      } else {
        if (datosForm.name === this.nombreInicial) {
          this.repetido = false;
        } else {
          this.repetido = true;
        }
      }
    }

    if (this.editado) {
      const indice = this.paisesCantidad.findIndex((indPais) => {
        return indPais.idPais === this.idCountry;
      });

      //console.log(this.paisesCantidad);

      this.httpService
        .modificarDatos(this.idCountry, datosForm)
        .subscribe((responseDatos) => {
          console.log(responseDatos);
          this.listService.updatePais(indice, datosForm);
          this.datosEnviados = true;
          this.showModal = true;
        });

      this.actualizado = true;
    } else {
      this.paisesCantidad.push(datosForm);
      this.httpService.ingresarPaises(datosForm).subscribe((responseData) => {
        //mirar lo que va ala lista servicio.
        console.log(responseData);
        this.listService.agregarPais(datosForm);
        this.datosEnviados = true;
        this.showModal = true;
      });
      this.guardado = true;
    }
    this.formulario.reset();
  }

  onVolver() {
    if (this.editado) {
      this.router.navigate(["../../list"], { relativeTo: this.route });
    } else {
      this.repetido = false;
    }
    // setTimeout(() => {
    //  this.router.navigate(["../../list"], { relativeTo: this.route });
    //  }, 2100);

    console.log(this.datosEnviados);
    this.datosEnviados = false;
    this.guardado = false;
    this.showModal = false;
  }

  onCancelar() {
    this.guardado = false;
    this.formulario.reset();

    if (this.editado) {
      this.router.navigate(["../../list"], { relativeTo: this.route });
    }
  }
}
