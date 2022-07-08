import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Pokemon } from './models/pokemon.model';
import { OnPokemonSelected } from './services/on-pokemon-selected.service';
import { PokemonService } from './services/pokemon-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  clicked : boolean;

  constructor(private http : HttpClient, private pokemonService : PokemonService, private onPokemonSelectedService : OnPokemonSelected) {}

  ngOnInit() {
    this.onPokemonSelectedService.pokemonClicked.subscribe((res) => this.clicked = res);
    this.fetchPokemons();
  }

  fetchPokemons(){
    this.pokemonService.fetchPokemonUrl()
    .subscribe(
      (res) => {
        this.fetchPokemonDetails(res.map((res: { url: string; }) => res.url))
        // res.map(
        //   (poke: { url: string }) => {
        //     this.http.get(poke.url)
        //     .subscribe(
        //       (res) => {
        //         this.pokemonService.addPokemon(new Pokemon(res['id'],res['name'],res['height'],res['weight'],res['abilities'],res['types'],res['stats']));              
        //       }
        //     )
        //   }
        // )
      }
    )
  }

  fetchPokemonDetails(urlList : string[]) {
    this.pokemonService.fetchPokemonDetails(urlList)
    .subscribe((res : any[]) => {
      res.map((poke) => {
        this.http.get("https://pokeapi.co/api/v2/pokemon-species/"+poke.id)
        .subscribe(
          (response) => {
            this.http.get(response['evolution_chain'].url)
            .pipe(
              map(
                (res) => {
                  var evoChain = [];
                  var evoData = res['chain'];
                  do {
                    var evoDetails = evoData['evolution_details'][0];
                    evoChain.push({
                      "species_name": evoData.species.name,
                      "min_level": !evoDetails ? 1 : evoDetails.min_level,
                      "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                      "item": !evoDetails ? null : evoDetails.item
                    });
                    evoData = evoData['evolves_to'][0];
                  } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
                  return evoChain;
                }
              )
            )
            .subscribe(
              (evolutionData) => {
                this.pokemonService.addPokemon(new Pokemon(poke.id,poke.name,poke.height,poke.weight,poke.abilities,poke.types,poke.stats,response['flavor_text_entries'][0].flavor_text,evolutionData));
              }
            )

          }
        )
      })
    });
  }

}
