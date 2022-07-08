import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { typeColors } from 'src/app/shared/pokemon-type-colors';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon : Pokemon;

  typeColors : {[key:string] : string} = {}

  constructor() { }

  ngOnInit(): void {
    this.typeColors = typeColors
  }

}
