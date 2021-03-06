import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ListadoComponent } from "./listado/listado.component";
import { FormularioComponent } from "./formulario/formulario.component";
import { Routes, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BienvenidoComponent } from "./bienvenido/bienvenido.component";

const routes: Routes = [
  { path: "", component: BienvenidoComponent },
  { path: "new", component: FormularioComponent },
  { path: "list", component: ListadoComponent },
  { path: ":id/edit", component: FormularioComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    FormularioComponent,
    BienvenidoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
