const pokeballCaptureImage = document.getElementById('pokeball-capture-image');

pokeballCaptureImage.addEventListener('click', async () => {
    console.log('Pokebola Clicada');
    await renderCapturePokemon(getRandomPokemonId());
});

function getRandomPokemonId() {
    let id;
    do {
        const ranges = [
            { min: 1, max: 1025 },
            { min: 10001, max: 10263 }
        ];
        const range = ranges[Math.floor(Math.random() * ranges.length)];
        id = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    } while (!isValidPokemonId(id));
    return id;
}

function giveMoreOrLessPowerToPOkemon() {

}

function createPokemonExibitionHTML(data) {
    // Cria os tipos
    const typesHTML = data.types.map(typeInfo => {
        const typeImg = typeImages[typeInfo.type.name];
        return `<span class="pokemon__type"><img src="${typeImg}" alt="${typeInfo.type.name}"></span>`;
    }).join('');

    // Cria o HTML principal
    return `
        <div class="pokemon__types">${typesHTML}</div>
        <img src="${data.sprites.front_default}" alt="pokemon" class="pokemon__image">
        <h2 class="pokemon__data">
            <span class="pokemon__number">${data.id}</span> -
            <span class="pokemon__name">${data.name}</span>
        </h2>
        <div class="pokemon__stats">
            ATK: <span class="pokemon__attack">${data.stats[1].base_stat}</span>
            SPA: <span class="pokemon__special_attack">${data.stats[3].base_stat}</span>
            DEF: <span class="pokemon__defense">${data.stats[2].base_stat}</span>
            SPD: <span class="pokemon__special_defense">${data.stats[4].base_stat}</span>
        </div>
    `;
}

async function renderCapturePokemon(pokemon) {
    const pokemonExibition = document.getElementById('pokemon-capture-exibition');
    if (!pokemonExibition) return;

    const data = await fetchPokemon(pokemon);

    if (data) {
        // Cria o HTML, mas ainda não insere
        const html = createPokemonExibitionHTML(data);

        // Cria um elemento temporário para acessar a imagem
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const img = tempDiv.querySelector('.pokemon__image');

        if (img) {
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve; // resolve mesmo se der erro, para não travar
                img.src = img.src; // força o carregamento
            });
        }

        // Agora sim, insere o HTML completo
        pokemonExibition.innerHTML = html;
    }
}
