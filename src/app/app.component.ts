import { Component, OnInit } from '@angular/core';

import { OnPokemonSelected } from './services/on-pokemon-selected.service';
import { PokemonService } from './services/pokemon-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  clicked : boolean;

  constructor(private pokemonService : PokemonService, private onPokemonSelectedService : OnPokemonSelected) {}

  ngOnInit() {
    this.onPokemonSelectedService.pokemonClicked.subscribe((res) => this.clicked = res);
    this.pokemonService.getAllPokemons();
  }

}
