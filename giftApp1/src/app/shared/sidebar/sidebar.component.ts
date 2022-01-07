import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get historial()
  {
    return this.gifsService.historial;
  }
//Usamos los constructores para la inyección de servicios
constructor(private gifsService:GifsService){}

buscar(termino:string)
{
  this.gifsService.buscarGifs(termino);
}
}
