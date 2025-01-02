/*
import { getPokemonData } from './cardScript.js';
import { showError } from './utils.js';
import { setAllPokemons, renderPokemonList, setCurrentSearchResults } from './filterScript.js';

let searchForm = document.getElementById('search-form');
let searchInput = document.getElementById('search-input');
let pokeContainer = document.getElementById('poke-container');
let toggleMenu = document.getElementById('toggle-menu');

let allPokemons = [];
let currentSearchResults = [];

let fetchAllPokemons = async () => {
    try {
        allPokemons = await Promise.all(
            Array.from({ length: 1010 }, (_, i) => getPokemonData(i + 1))
        );
        allPokemons.sort((a, b) => a.id - b.id);
        renderPokemonList(allPokemons);
        setAllPokemons(allPokemons);

        let savedSearch = localStorage.getItem('searchQuery');
        if (savedSearch) {
            searchInput.value = savedSearch;
            performSearch(savedSearch);
        } else {
            currentSearchResults = allPokemons;
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        showError('Pokémon not found', pokeContainer);
    }
};

let performSearch = (query) => {
    let errorMessage = document.getElementById('error-message');
    
    if (errorMessage) errorMessage.remove();

    if (!query) {
        currentSearchResults = allPokemons;
        renderPokemonList(allPokemons);
    } else {
        currentSearchResults = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query)
        );

        if (currentSearchResults.length > 0) {
            renderPokemonList(currentSearchResults);
        } else {
            showError('Pokémon not found', pokeContainer);
        }
    }
    
    localStorage.setItem('searchQuery', query);
    setCurrentSearchResults(currentSearchResults);
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let query = searchInput.value.toLowerCase().trim();
    performSearch(query);
});

toggleMenu.addEventListener('click', () => {
    let menu = document.getElementById('type-menu');
    menu.classList.toggle('hidden');
});

fetchAllPokemons();
*/

import { getPokemonData } from './cardScript.js';
import { showError } from './utils.js';
import { setAllPokemons, renderPokemonList, setCurrentSearchResults } from './filterScript.js';

let searchForm = document.getElementById('search-form');
let searchInput = document.getElementById('search-input');
let pokeContainer = document.getElementById('poke-container');
let toggleMenu = document.getElementById('toggle-menu');
let clearSearchButton = document.getElementById('clear-search');

let allPokemons = [];
let currentSearchResults = [];

let fetchAllPokemons = async () => {
    try {
        allPokemons = await Promise.all(
            Array.from({ length: 1010 }, (_, i) => getPokemonData(i + 1))
        );
        allPokemons.sort((a, b) => a.id - b.id);
        renderPokemonList(allPokemons);
        setAllPokemons(allPokemons);

        let savedSearch = localStorage.getItem('searchQuery');
        if (savedSearch) {
            searchInput.value = savedSearch;
            performSearch(savedSearch);
        } else {
            currentSearchResults = allPokemons;
        }
    } catch (error) {
        pokeContainer.innerHTML = '';
        console.error('Error fetching Pokémon:', error);
        showError('Pokémon not found', pokeContainer);
    }
};

let performSearch = (query) => {
    let errorMessage = document.getElementById('error-message');
    
    if (errorMessage) errorMessage.remove();

    if (!query) {
        currentSearchResults = allPokemons;
        renderPokemonList(allPokemons);
        clearSearchButton.classList.remove('active');
    } else {
        currentSearchResults = searchPokemons(query);

        if (currentSearchResults.length > 0) {
            renderPokemonList(currentSearchResults);
        } else {
            pokeContainer.innerHTML = '';
            showError('Pokémon not found', pokeContainer);
        }
        clearSearchButton.classList.add('active');
    }
    
    localStorage.setItem('searchQuery', query);
    setCurrentSearchResults(currentSearchResults);
};

let searchPokemons = (query) => {
    return allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()) || 
        pokemon.id.toString() === query
    );
};

let clearSearch = () => {
    searchInput.value = '';
    localStorage.clear();
    currentSearchResults = allPokemons;
    performSearch('');
    
    let previousSelected = document.querySelector('#type-list li.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    selectedType = null;
    setCurrentSearchResults(allPokemons);
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let query = searchInput.value.toLowerCase().trim();
    performSearch(query);
});

clearSearchButton.addEventListener('click', clearSearch);

toggleMenu.addEventListener('click', () => {
    let menu = document.getElementById('type-menu');
    let icon = toggleMenu.querySelector('.material-icons');
    menu.classList.toggle('hidden');
    if (menu.classList.contains('hidden')) {
        icon.textContent = 'arrow_drop_down';
    } else {
        icon.textContent = 'arrow_drop_up';
    }
});

fetchAllPokemons();