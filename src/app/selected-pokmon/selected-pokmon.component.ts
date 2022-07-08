import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { typeColors } from 'src/app/shared/pokemon-type-colors';
import { OnPokemonSelected } from '../services/on-pokemon-selected.service';

@Component({
  selector: 'app-selected-pokmon',
  templateUrl: './selected-pokmon.component.html',
  styleUrls: ['./selected-pokmon.component.css']
})
export class SelectedPokmonComponent implements OnInit {
  pokemon : Pokemon;
  typeColors : {[key:string] : string} = {}

  constructor(private onPokemonSelectedService: OnPokemonSelected) { }

  ngOnInit(): void {
    this.typeColors = typeColors;
    this.pokemon =  this.onPokemonSelectedService.selectedPokemon;
  }

  onClickClose(){
    this.onPokemonSelectedService.pokemonClicked.emit(false);
  }

}
