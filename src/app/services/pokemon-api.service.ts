import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { forkJoin } from "rxjs";
import { map } from 'rxjs/operators';
import { Pokemon } from "../models/pokemon.model";

@Injectable({providedIn:'root'})
export class PokemonService {
    pokemons : Pokemon[] = [];

    base_url = "https://pokeapi.co/api/v2/";
    // limit:number = 50;
    offset:number = 0;

    constructor(private http: HttpClient) {}

    addPokemon(poke : Pokemon){
        this.pokemons.push(poke);
    }

    getPokemons(startIndex: number, endIndex: number){
        return this.pokemons.slice(startIndex,endIndex);
    }

    fetchPokemonUrl(offset : number){
        return this.http.get(this.base_url+"pokemon?limit=13&offset="+offset).pipe(map((res) => res['results']))
    }

    fetchPokemonDetails(pokeUrlArray : any[]){
        pokeUrlArray = pokeUrlArray.map(url => this.http.get(url));
        return forkJoin(pokeUrlArray);
    }
}