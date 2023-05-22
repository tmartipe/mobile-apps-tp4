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
  savePoke: boolean = true;

  constructor(public api:APIService, private storage:StorageService) {
    // this.pokemon = api.getPokemon(1)
    
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save(){
    //falta condicion 
    this.api.getPokemon(this.pokeNumber).then(r =>{
      this.setStorage(r)
    })
   
  }
  //pokelist es la lista que se guiarda en el storage

  setStorage(poke:any){
    let pokemon:Pokemon={id:poke.id, image:poke.sprites.front_default, height:poke.height, weight:poke.weight}
    this.pokeList.push(pokemon)
    this.storage.update("pokemon", this.pokeList)
  }

  getStorage(number:any){
    this.storage.read("pokemon").then((data=>{
      if(data !== null){
        data.value.forEach(p=>{
          if(p.id === number){
            this.savePoke = false
            //Si esto pasa quiere decir que el pokemon ya existe dentro del storage, entonces no deberiamos pegarle a la api
          }
        })
      }
    }))
    if(this.savePoke){
      return true
    }else{
      return false
    }
  }
 
}
