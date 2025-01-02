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

    currentSearchResults = query ? searchPokemons(query) : allPokemons;
    renderPokemonList(currentSearchResults.length ? currentSearchResults : []);
    if (!currentSearchResults.length) showError('Pokémon not found', pokeContainer);

    clearSearchButton.classList.toggle('active', !!query);
    localStorage.setItem('searchQuery', query);
    setCurrentSearchResults(currentSearchResults);
};

let searchPokemons = (query) => 
    allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()) || 
        pokemon.id.toString() === query
    );

let clearSearch = () => {
    searchInput.value = '';
    localStorage.clear();
    performSearch('');
    document.querySelector('#type-list li.selected')?.classList.remove('selected');
    setCurrentSearchResults(allPokemons);
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(searchInput.value.toLowerCase().trim());
});

clearSearchButton.addEventListener('click', clearSearch);

toggleMenu.addEventListener('click', () => {
    let menu = document.getElementById('type-menu');
    let icon = toggleMenu.querySelector('.material-icons');
    menu.classList.toggle('hidden');
    icon.textContent = menu.classList.contains('hidden') ? 'arrow_drop_down' : 'arrow_drop_up';
});

fetchAllPokemons();