import { EventEmitter, Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";

@Injectable({providedIn:"root"})
export class OnPokemonSelected {
    pokemonClicked = new EventEmitter<boolean>(false);
    selectedPokemon : Pokemon;
}