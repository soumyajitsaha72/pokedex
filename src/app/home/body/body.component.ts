import { Component, HostListener, OnInit } from '@angular/core';
import { OnPokemonSelected } from 'src/app/services/on-pokemon-selected.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon-api.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pokemons : Pokemon[] = [];
  value = "";

  constructor(private pokemonService : PokemonService, private searchService: SearchService, private onPokemonSelectedService: OnPokemonSelected) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.pokemons; // Fetching the pokemons from Pokemon Service.
    this.searchService.search.subscribe((text) => {this.value = text;})
  }

  //When an individual pokemon is clicked display the details.
  onClickPokemon(pokemon : Pokemon){
    this.onPokemonSelectedService.pokemonClicked.emit(true);
    this.onPokemonSelectedService.selectedPokemon = pokemon;
  }

  //Infinite Scroll
  start = 0;
  end = 20;
  onScroll(){
    this.end = this.end + 20;
  }

  //This code is taken from w3Schools... It's responsible for backToTop button.
  @HostListener("window:scroll", []) onWindowScroll() {
      this.scrollFunction();
    }
    showButton = false; // Button not visible a the top of the page.
  // When the user scrolls down 20px from the top of the document, show the button.
  scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          this.showButton = true;
      } else {
          this.showButton = false;
      }
  }
  // When the user clicks on the button, scroll to the top of the document
  backToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } 

}
