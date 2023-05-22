export interface Pokemon{
    id: number,
    name:string,
    sprite:string,
    height:string,
    weight:string,
}
export interface ApiPokemon{
  id: number,
  name:string,
  sprites:{
    front_default: string,
    back_default: string,
    front_shiny: string,
    back_shiny: string
  },
  height:string,
  weight:string,
}
