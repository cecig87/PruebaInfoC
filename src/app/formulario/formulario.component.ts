import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pais } from '../pais.model';
import { ListaService } from '../lista.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  
 
   formulario: FormGroup;
   paisesCantidad: Pais[] = []; 
   guardado = false;
   editado = false;
   idCountry: number;
   paisEdit: Pais;
   actualizado = false;  
     
  
  constructor(private listService: ListaService, private router: Router ,private route: ActivatedRoute) { }

  ngOnInit() {   
    this.formulario = new FormGroup({
    'country': new FormControl(null, Validators.required),   
    'ill': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    'sanos': new FormControl(null, Validators.required),
    'muertos': new FormControl(null, Validators.required)    
    });
    
    this.idCountry = this.route.snapshot.params['id'];
    if(this.idCountry != null){
      this.editado = true;
       };
     this.onSetValue();
      };
             
   onSetValue(){
       
    let nombre ;                      
    let numInfect ;
    let numRecovery ;
    let numDead;
 
    if(this.editado){
          
    const actualizar = this.listService.obtenerPaisById(this.idCountry);   
    nombre = actualizar.namePais;
    numInfect = actualizar.cantInfect;
    numRecovery = actualizar.cantRecovery;
    numDead = actualizar.cantDead;    
   
    this.formulario.setValue({
      country: nombre,
      ill: numInfect,
      sanos: numRecovery,
      muertos: numDead
    });
  }
};

  onSubmit() {
    console.log(this.formulario.value); 
    const name = this.formulario.value.country;
    const cantInfect = this.formulario.value.ill;
    const cantRecovery =this.formulario.value.sanos;
    const cantDead = this.formulario.value.muertos;
    console.log(this.formulario)
    const datosForm = new Pais(name, cantInfect, cantRecovery, cantDead);
    console.log(datosForm);
               
    this.paisesCantidad.push(datosForm); 
    
    if(this.editado){
      this.listService.updatePais(this.idCountry, datosForm);
      alert('Datos actualizados correctamente')
      this.router.navigate(['../../list'], {relativeTo: this.route});
      this.actualizado = true;
    } else {
       this.listService.agregarPais(datosForm); 
       this.guardado = true; }
       this.formulario.reset(); 
    };
     
   
  onCancelar() {
    this.guardado = false;
    this.formulario.reset();
   
   if(this.editado){
    this.router.navigate(['../../list'], {relativeTo: this.route});
    }
   }

}
