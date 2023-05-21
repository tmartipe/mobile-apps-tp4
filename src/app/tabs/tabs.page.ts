import { Component, ViewChild } from '@angular/core';
import { APIService } from '../services/api.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  pokemon: any[] = [];
  @ViewChild(IonModal)
  modal!: IonModal;


  constructor(public api:APIService) {
    // this.pokemon = api.getPokemon(1)
    api.getPokemon(2).then(r =>{
      this.pokemon[0] = r 
    } )
    api.getPokemon(5).then(r =>{
      this.pokemon[1] = r 
    } )
    api.getPokemon(7).then(r =>{
      this.pokemon[2] = r 
    } )
    api.getPokemon(10).then(r =>{
      this.pokemon[3] = r 
    } )
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
