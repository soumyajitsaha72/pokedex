import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(pokemons: Pokemon[], searchText: string): Pokemon[] {

    if(!pokemons) return [];
    if(!searchText) return pokemons;

    // const newArr = [];
    // for(let poke of pokemons){
    //   if(poke.name.toLowerCase().includes(searchText.toLowerCase())){
    //     newArr.push(poke);
    //   }
    // }
    // return newArr;
    
    return pokemons.filter( poke => {
      return poke.name.toLowerCase().includes(searchText.toLowerCase());
    });

  }

}
