import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async create(key:string, value:Pokemon[]){
    await Preferences.set({key,value});
  }

  async read(key:string){
    return( await Preferences.get({key}));
  }

  async update(key:string, value:Pokemon[]){
    await Preferences.set({key,value});
  }

  async delete(key:string){
    await Preferences.remove({key});
  }

  async clear(){
    await Preferences.clear();
  }
}
