import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-full-pokedex',
  templateUrl: './full-pokedex.component.html',
  styleUrls: ['./full-pokedex.component.css']
})

export class FullPokedexComponent implements OnInit {

  constructor(private http: HttpClient) { }
  pokemons: any;
  pokemons2: any;
  api: string = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"; //898
  textValue = ''; //initial value
  //categories : any = [];

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.newSearch();
    }
  }

  fetchPokemonsFromPokeApi() {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.api;
      this.http
        .get(apiURL)
        .toPromise()
        .then((res: any) => {
          // Success
          console.log("fetchPokemonsFromPokeApi..!");
          this.pokemons = res.results;
          resolve();
          document.getElementById("full-pokedex-spinner")!.style.display = "none";
        },
          err => {
            // Error
            reject(err);
          }
        ).then((pokemons: any) => {
          console.log("START then..!");
          let i = 0;
          this.pokemons.forEach((pokemon: any) => {
            i++;
            const promise = new Promise<void>((resolve, reject) => {
              const url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
              this.http
                .get(url)
                .toPromise()
                .then((pokemonPokeApi: any) => {
                  console.log(pokemonPokeApi);
                  // Success
                  //pokemon = pokemonPokeApi; 
                  // pokemon.dex = i;
                  for (let n = 0; n < pokemonPokeApi.names.length; n++) {
                    pokemon[pokemonPokeApi.names[n].language.name] = pokemonPokeApi.names[n].name;
                    if (pokemonPokeApi.names[n].language.name.indexOf('de') > -1) {
                      pokemon.name = pokemonPokeApi.names[n].name;
                    }
                  }

                  //pokemon.de = pokemonPokeApi.weight;
                  resolve();
                },
                  err => {
                    // Error
                    reject(err);
                  }
                );
            });
          });
        }).then((pokemons: any) => {
          //console.log("START then..!");
          let i = 0;
          this.pokemons.forEach((pokemon: any) => {
            i++;
            const promise = new Promise<void>((resolve, reject) => {
              const url = `https://pokeapi.co/api/v2/pokemon/${i}`; ///https://pokeapi.co/api/v2/pokemon-species/${i}`;
              this.http
                .get(url)
                .toPromise()
                .then((pokemonPokeApi: any) => {
                 // console.log(pokemonPokeApi);
                  var types = [];
                  for (let n = 0; n < pokemonPokeApi.types.length; n++) {
                   types[n] = pokemonPokeApi.types[n].type.name                   
                  } 
                  pokemon.types = types;
                 // console.log("pokemon");
                  //console.log(types);

                  resolve();
                },
                  err => {
                    // Error
                    reject(err);
                  }
                );
            });
          });
        });
    });
    return promise;
  }

  updatePokemon() {
    for (let i = 0; i < this.pokemons.length; i++) {

    }
  }

  ngOnInit(): void {
    document.getElementById("full-pokedex-spinner")!.style.display = "block";
    this.fetchPokemonsFromPokeApi();

  }

  fetchSpecies(pokemons: any) {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0') //898
      .then(response => response.json())
      .then(pokemon => console.log("pokemon: " + pokemon))
      .catch(error => console.error('error:', error));
  }
  searchByNrName(value: string): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));

    var searchNrName: HTMLElement;
    if (value.length == 0) {
      alert("Bitte geben Sie den Namen oder die Nummer des Pokemon ein!")
      return;
    }
    value = value;
    var element;

    element = document.getElementsByClassName("pokemon-" + value)[0];
    if (element != null) {
      element.classList.add("pokemon-selected");
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      alert("Zu dem Namen oder der Nummer wurde keine Pokemon gefunden.")
    }
  }

  newSearch(): void {
    var element = document.getElementById("searchNrName");
    const y = element!.getBoundingClientRect().top;
    window.scrollTo({ top: y, behavior: 'smooth' })
    element!.focus();
  }

  markPokemon(event: any): void {
    document.querySelectorAll('.pokemons').forEach(element => element.classList.remove('pokemon-selected'));
    event.srcElement.closest(".pokemons").classList.add('pokemon-selected');
  }

  fetchPokemonData(pokemon: { url: any; }) {
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
    //console.log("url: " + url);

    fetch(url)
      .then(response => response.json())
      .then((pokeData) => {
        //console.log(pokeData);
        this.pokemons2.push(pokeData);
      })
  }
}
