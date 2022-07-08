import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private pokemonService : PokemonService, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.pokemons; // Fetching the pokemons from Pokemon Service.
    this.searchService.search.subscribe((text) => {this.value = text;})
  }

  onScroll(){
    this.pokemonService.offset = this.pokemonService.offset + 13;
    if(this.pokemonService.offset <= 884){
      this.fetchPokemons(this.pokemonService.offset);
    }

    // else if(this.pokemonService.offset > 884 && this.pokemonService.offset <= 897){    
    //   this.fetchPokemons(this.pokemonService.offset - 12);  
    // }
  }

  fetchPokemons(offset:number){
    this.pokemonService.fetchPokemonUrl(offset)
    .subscribe(
      (res) => {
        this.fetchPokemonDetails(res.map((res: { url: string; }) => res.url))
      }
    )
  }

  fetchPokemonDetails(urlList : string[]) {
    this.pokemonService.fetchPokemonDetails(urlList)
    .subscribe((res : any[]) => {
      res.map((poke) => this.pokemonService.addPokemon(
        new Pokemon(
          poke.id,
          poke.name,
          poke.height,
          poke.weight,
          poke.abilities,
          poke.types,
          poke.stats
        )
      ))
    });
  }

  onClickPokemon(pokemon : Pokemon){
    this.router.navigate(['/pokemon',pokemon.id]);
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
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //For smooth scrolling effect.
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } 

}
