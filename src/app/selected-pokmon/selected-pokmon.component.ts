import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { typeColors } from 'src/app/shared/pokemon-type-colors';
import { OnPokemonSelected } from '../services/on-pokemon-selected.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-selected-pokmon',
  templateUrl: './selected-pokmon.component.html',
  styleUrls: ['./selected-pokmon.component.css']
})
export class SelectedPokmonComponent implements OnInit {
  pokemon : Pokemon;
  pokemonEvoImage : number[] = [];
  typeColors : {[key:string] : string} = {}

  constructor(private onPokemonSelectedService: OnPokemonSelected, private http: HttpClient) { }

  ngOnInit(): void {
    this.typeColors = typeColors;
    this.pokemon =  this.onPokemonSelectedService.selectedPokemon;

    this.http.get(this.pokemon.evolutionUrl)
    .pipe(
      map(
        (res) => {
          var evoChain = [];
          var evoData = res['chain'];
          do {
            var evoDetails = evoData['evolution_details'][0];
            evoChain.push({
              "species_name": evoData.species.name,
              "min_level": !evoDetails ? 1 : evoDetails.min_level
            });
            evoData = evoData['evolves_to'][0];
          } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
          return evoChain;
        }
      )
    )
    .subscribe(
      (evolutionData: []) => {
        this.pokemon.evolution = evolutionData;
        let pokeIds = []
        for(let e of evolutionData){
          this.http.get('https://pokeapi.co/api/v2/pokemon/'+e['species_name'])
          .subscribe(
            res => {
              pokeIds.push(res['id']);
            })
        }
        this.pokemonEvoImage = pokeIds.sort();
      }
    )

  }

  onClickClose(){
    this.onPokemonSelectedService.pokemonClicked.emit(false);
  }

}
