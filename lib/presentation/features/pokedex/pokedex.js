const pokedexForm = document.querySelector('.pokedex-form');
const pokedexInput = document.getElementById('pokedex-input');
const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');

pokedexForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = pokedexInput.value.toLowerCase();

    if (!isNaN(value) && !isValidPokemonId(Number(value))) {
        alert('Invalid Pokémon ID!');
        return;
    }

    // Tenta buscar o Pokémon
    const data = await fetchPokemon(value);

    if (!data) {
        if (isNaN(value)) {
            alert('Invalid Pokémon Name!');
        }
        return;
    }

    renderPokemon(value);
});

buttonPrev.addEventListener('click', () => {
    do {
        searchPokemon -= 1;
    } while (!isValidPokemonId(searchPokemon) && searchPokemon > 0);
    if (isValidPokemonId(searchPokemon)) {
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    do {
        searchPokemon += 1;
    } while (!isValidPokemonId(searchPokemon) && searchPokemon <= 10263);
    if (isValidPokemonId(searchPokemon)) {
        renderPokemon(searchPokemon);
    }
});

/*Função solta por enquanto para renderizar o bulbassauro e dar inicio as renderizações*/
renderPokemon(searchPokemon);