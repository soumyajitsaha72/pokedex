import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map } from "rxjs";

import { Pokemon } from "../models/pokemon.model";

@Injectable({providedIn:'root'})
export class PokemonService {
    pokemons : Pokemon[] = [];

    constructor(private http: HttpClient) {}

    addPokemon(poke : Pokemon){
        this.pokemons.push(poke);
    }

    getPokemons(startIndex: number, endIndex: number){
        return this.pokemons.slice(startIndex,endIndex);
    }

    getAllPokemons() {
            for (let i = 1; i <= 898; i++) {
      const pokemon = this.http.get('https://pokeapi.co/api/v2/pokemon/' + i);
      const pokeDescAndEvolutionUrl = this.http
        .get('https://pokeapi.co/api/v2/pokemon-species/' + i)
        .pipe(
          map((res) => {
            let resArr = [];
            resArr.push(res['evolution_chain'].url);
            for (let text of res['flavor_text_entries']) {
              if (text.language.name === 'en') {
                resArr.push(text.flavor_text);
                break;
              }
            }
            return resArr;
          })
        );

      forkJoin([pokemon, pokeDescAndEvolutionUrl]).subscribe((res) => {
            this.pokemons.push(
            new Pokemon(
                res[0]['id'],
                res[0]['name'],
                res[0]['height'],
                res[0]['weight'],
                res[0]['abilities'],
                res[0]['types'],
                res[0]['stats'],
                res[1][1],
                res[1][0]
                ))
            });
        }
    }
}