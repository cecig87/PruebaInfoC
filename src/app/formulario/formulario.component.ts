import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pais } from '../pais.model';
import { ListaService } from '../lista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, AfterContentInit {
  
 
   formulario: FormGroup;
   paisesCantidad: Pais[] = []; 
   guardado = false;
   editado = false;
   idCountry: number;
   paisEdit: Pais;
   actualizado = false; 
   repetido = false; 
   aEditar = false;
   nombreInicial;
   actualizar;
   subscribirse: Subscription;
   name ;                      
   numInfect ;
   numRecovery ;
   numDead;

  constructor(private listService: ListaService, private router: Router ,private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {  

    
    this.formulario = new FormGroup({
    'name': new FormControl(null, Validators.required),   
    'infectados': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)]),
    'recuperados': new FormControl(null, Validators.required),
    'fallecidos': new FormControl(null, Validators.required)    
    });
    this.idCountry = +this.route.snapshot.params['id'];
    console.log(this.idCountry);    
    //if(this.idCountry != null){
    if( !isNaN(this.idCountry)) { 
    this.editado = true;
        
         this.onSetValue();
        
           };

    this.httpService.obtenerPaises().subscribe((paises: Pais[]) => {
     this.paisesCantidad = paises;  
   }); 
    
   };                 
             
    ngAfterContentInit(){ 
                                                 //Obtener los datos de la base de datos si no se han obtenido
        setTimeout(() => {console.log(this.actualizar);
         if(this.aEditar) {                 
            
           this.onSetValue();
           this.aEditar = false;
           console.log(this.actualizar);
           if((this.actualizar===undefined) && this.editado){
             
               
           console.log("No se han podido obtener los datos.");
           };};
          }, 1521);     
       }

      obtenerDatosPais() {
       this.actualizar= this.listService.obtenerPaisById(this.idCountry);
                      
            console.log(this.actualizar);  
          if(this.actualizar === undefined){
                        
           
            this.name = '';
            this.numInfect = '';
            this.numRecovery = '';
            this.numDead = '';
            
            } else{
               this.name = this.actualizar.name;                            
               this.numInfect = this.actualizar.infectados;
               this.numRecovery = this.actualizar.recuperados;
               this.numDead = this.actualizar.fallecidos;  
               };
       this.aEditar = true;
         }
      
     onSetValue(){
   
      if(this.editado){    
       
        this.obtenerDatosPais();
      
       setTimeout(() => {
          this.nombreInicial = this.name;
          this.formulario.setValue({                    
           name: this.name,                    
           infectados: this.numInfect,
           recuperados: this.numRecovery,
           fallecidos: this.numDead
          });
          console.log(this.formulario.valid);
         }, 1521);
      
        };
    };

  onSubmit() {
    this.repetido = false;
    console.log(this.formulario.value); 
    const name = this.formulario.value.name;
    const cantInfect = this.formulario.value.infectados;
    const cantRecovery =this.formulario.value.recuperados;
    const cantDead = this.formulario.value.fallecidos;
    console.log(this.formulario)
    const datosForm = new Pais(name, cantInfect, cantRecovery, cantDead);
  
               
   const repeticion = this.paisesCantidad.filter(paisRepetido =>{ return datosForm.name === paisRepetido.name});
  console.log(repeticion.length);
    if(repeticion.length != 0 ) {
     if (!this.editado){ 
       this.repetido = true;
      } else{
        if(datosForm.name === this.nombreInicial){
          this.repetido = false; }
        else {
          this.repetido = true;
        };
      };
    };

        
    if(this.editado){
      this.listService.updatePais(this.idCountry, datosForm);
      //alert('Datos actualizados correctamente')
      console.log(this.paisesCantidad);
     
       this.httpService.modificarDatos(this.idCountry, datosForm).subscribe(responseDatos => {console.log(responseDatos);});
      
       this.actualizado = true;
    
    } else { 
     this.paisesCantidad.push(datosForm);
       this.listService.agregarPais(datosForm);
       this.httpService.ingresarPaises(datosForm).subscribe(responseData => { console.log(responseData);}); 
       this.guardado = true; }
       this.formulario.reset(); 
          
    };

    onVolver(){
      this.router.navigate(['../../list'], {relativeTo: this.route});
    };
     
   
  onCancelar() {
    this.guardado = false;
    this.formulario.reset();
   
   if(this.editado){
    this.router.navigate(['../../list'], {relativeTo: this.route});
    }
   };

  
}
