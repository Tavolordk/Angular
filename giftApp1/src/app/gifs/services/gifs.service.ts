import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string = 'M1BnAxtjvpR3aMVOd56r1LWFxX61xixP';
  private _historial:string[]=[];
  private urlPrincipal:string='https://api.giphy.com/v1/gifs';
  //TODO: Cambiar any por su tipo
  public resultados:Gif[]=[];
  get historial()
  {
    return [...this._historial];
  }

  constructor(private httpClient:HttpClient){
    
       try{
         this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
         this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
        }
       catch(e){console.error(e)}
      
  }

  buscarGifs(query:string='') //Le estoy diciendo que query a fuerza debe tener un valor
  {
    query = query.trim().toLocaleLowerCase(); //query convierte todo lo que recibe el teclado a minusculas
    if(!this._historial.includes(query)) //Si el elemento no está ya en el historial haz esto:
    {
    //Mete en el historial al inicio de arriba a abajo  
    this._historial.unshift(query);
    //Restringe el numero de listas hasta 10 elementos
    this._historial=this._historial.splice(0,10);
    localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    
   const params = new HttpParams()
   .set('api_key',this.apiKey)
   .set('limit','25')
   .set('q',query);

    this.httpClient.get<SearchGifsResponse>(`${this.urlPrincipal}/search`,{params}).subscribe((resp)=>{
      console.log(resp.data);
      this.resultados=resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })

  }
}
