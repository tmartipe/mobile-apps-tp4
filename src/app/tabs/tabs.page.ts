import { Component, ViewChild, getNgModuleById } from '@angular/core';
import { APIService } from '../services/api.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { StorageService } from '../services/storage.service';
import { Pokemon } from '../interfaces/pokemon';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  pokeNumber: number = 0;
  pokemon: any[] = [];
  pokeList: Pokemon[] = [];
  @ViewChild(IonModal)
  modal!: IonModal;
  savePoke: boolean = false;

  constructor(public api:APIService, private storage:StorageService) {
    // this.pokemon = api.getPokemon(1)
    
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save(){
    if(!this.pokemon.find(p=>p.id == this.pokeNumber)) 
    {
      this.getStorage(this.pokeNumber)
    }
  }
  //pokelist es la lista que se guiarda en el storage

  setStorage(poke:any){
    let pokemon:Pokemon={id:poke.id, name:poke.name ,front_default:poke.sprites.front_default, height:poke.height, weight:poke.weight}
    this.pokeList.push(pokemon)
    
    let list = JSON.stringify(this.pokeList)
    this.storage.update("pokemon", list)
  }

  getStorage(number:any){
    let datos
    this.storage.read("pokemon").then((data =>{
      if(data != undefined){
        datos = JSON.parse(data.value);
        datos = datos != null ? datos.find((p: Pokemon) => p.id == number): null;
        console.log(datos)
        if(datos == null){
          this.api.getPokemon(number).then(r =>{
            this.setStorage(r)
            this.pokemon.push(r)
          }) 
        }else{
        this.pokemon.push(datos)
        }
      }
      
    }))
  }
 
}
