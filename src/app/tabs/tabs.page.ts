import {Component, ViewChild } from '@angular/core';
import {APIService} from '../services/api.service';
import {IonModal} from '@ionic/angular';
import {StorageService} from '../services/storage.service';
import {Pokemon, ApiPokemon} from '../interfaces/pokemon';


// @ts-ignore
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  pokeNumber: number = 0;
  viewPokemonArray: Pokemon[] = [];
  savedPokemon: Pokemon[] = [];
  @ViewChild(IonModal)
  modal!: IonModal;

  constructor(public api: APIService, private storage: StorageService){}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    if (!this.viewPokemonArray.find(p => p.id == this.pokeNumber)) {
      this.findPokemonByNumber(this.pokeNumber)
    }
  }

  savePokemonToStorage(apiPokemon: ApiPokemon){
    let pokemon = this.pokemonFactory(apiPokemon);
    this.savedPokemon.push(pokemon)
    this.viewPokemonArray.push(pokemon)
    let savedPokemonJSON = JSON.stringify(this.savedPokemon)
    this.storage.update("pokemon", savedPokemonJSON)
  }

  findPokemonByNumber(pokeId: number) {
    this.storage.read("pokemon").then((storageData => {
      if (storageData.value != undefined) {
        let savedPokes: Pokemon[] = JSON.parse(storageData.value!!);
        let pokemon = savedPokes.find((p: Pokemon) => p.id == pokeId);
        if (pokemon != undefined)
          this.viewPokemonArray.push(pokemon)
      }
      this.api.getPokemon(pokeId).then(r=> {
        this.savePokemonToStorage(r as ApiPokemon)
      })
    }))
  }
  pokemonFactory(apiPokemon: ApiPokemon): Pokemon{
    return {
      id: apiPokemon.id,
      name: apiPokemon.name,
      sprite: apiPokemon.sprites.front_default,
      height: apiPokemon.height,
      weight: apiPokemon.weight
    }
  }

}
