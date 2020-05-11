import { Component } from '@angular/core';

import { Pais } from './pais.model';
import { httpService } from './http.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router, private route: ActivatedRoute) {

  };

  onAdd() {
   this.router.navigate(['/new'], {relativeTo: this.route});
  };
 
}
