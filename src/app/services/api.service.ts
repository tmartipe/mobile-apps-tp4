import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ApiPokemon} from '../interfaces/pokemon';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class APIService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(public http : HttpClient) { }

  getPokemon(number:number){
    return new Promise((resolve, reject) => {
      this.http.get(
      this.apiUrl+number).subscribe(data =>{
        resolve(data);
      }, err =>{
        console.log(err)
    } )
  })
}
}
