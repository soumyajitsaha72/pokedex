import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Pokemon } from './models/pokemon.model';
import { PokemonService } from './services/pokemon-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private http : HttpClient,private pokemonService : PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons(){
    this.pokemonService.fetchPokemonUrl(this.pokemonService.offset)
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
        this.pokemonService.addPokemon(new Pokemon(poke.id,poke.name,poke.height,poke.weight,poke.abilities,poke.types,poke.stats));
    })
    });
  }

}

