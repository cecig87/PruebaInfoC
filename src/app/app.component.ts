import { Component } from '@angular/core';

import { Pais } from './pais.model';
//import { httpService } from './http.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  outPrincipal = true;
  constructor(private router: Router, private route: ActivatedRoute) {

  };

  onAdd() {
   this.router.navigate(['/new'], {relativeTo: this.route});
   this.outPrincipal = false;
  };

  onVer(){
   this.router.navigate(['/list'], {relativeTo: this.route} );
   this.outPrincipal = false;
  };
 
  onEntrada(){
   this.router.navigate(['/'], {relativeTo: this.route});
   this.outPrincipal = true;
  };
}
