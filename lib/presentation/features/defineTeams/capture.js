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

function giveMoreOrLessPowerToPokemon(data) {
    const newStats = data.stats.map(stat => {

        // Gera um valor aleatório entre -10 e +30
        const randomBonus = Math.floor(Math.random() * 41) - 10;
        return {
            ...stat,
            base_stat: stat.base_stat + randomBonus
        };
    });

    return {
        ...data,
        stats: newStats
    };
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
        <div id="capture-buttons">
            <button class="button" id="button-catch">Catch</button>
        </div>
    `;
}

async function renderCapturePokemon(pokemon) {
    const pokemonExibition = document.getElementById('pokemon-capture-exibition');
    if (!pokemonExibition) return;

    const data = await fetchPokemon(pokemon);

    if (data) {
        const poweredData = giveMoreOrLessPowerToPokemon(data);
        window.lastPoweredData = poweredData;
        const html = createPokemonExibitionHTML(poweredData);

        // Cria um elemento temporário para acessar a imagem
        const tempSpan = document.createElement('div');
        tempSpan.innerHTML = html;
        const img = tempSpan.querySelector('.pokemon__image');

        if (img) {
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve;
                img.src = img.src;
            });
        }

        pokemonExibition.innerHTML = html;
    }
}

document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'button-catch') {
        // Garante que existe um jogador ativo
        if (!window.activePlayerId) {
            alert('Selecione um jogador!');
            return;
        }

        // Recupera o time atual
        const team = playerTeams[window.activePlayerId] || [];

        if (team.length >= 6) {
            alert('Este jogador já possui 6 pokémons!');
            return;
        }

        // Recupera o poweredData do Pokémon exibido
        // Supondo que você armazene o último poweredData exibido em uma variável global:
        if (!window.lastPoweredData) {
            alert('Nenhum Pokémon para capturar!');
            return;
        }

        team.push(window.lastPoweredData);
        playerTeams[window.activePlayerId] = team;
        addPokeballCaptureImage();

        if (team.length == 6) {
            // Seleciona a imagem da pokebola do jogador que completou o time
            const playerLocal = document.querySelector(`.player[data-player-id="${window.activePlayerId}"]`)
                ?.closest('.player-local');
            if (playerLocal) {
                playerLocal.style.backgroundColor = 'var(--color-player-team-full)';
            }

            const playerImg = playerLocal?.querySelector('.image-team-indicator');
            if (playerImg) {
                playerImg.style.filter = 'none';
                playerImg.style.cursor = 'default';
            }

        }

        // (Opcional) Atualiza o atributo data-pokemon-team no HTML
        const playerSpan = document.querySelector(`.player[data-player-id="${window.activePlayerId}"]`);
        if (playerSpan) {
            playerSpan.dataset.pokemonTeam = team.map(p => p.id).join(',');
            console.log(`Time atualizado para o jogador ${window.activePlayerId}:`, team);
        }

        alert(`Pokémon capturado! (${team.length}/6)`);
    }
});

function addPokeballCaptureImage() {
    const counterDiv = document.getElementById('capture-counter');
    if (!counterDiv || !window.activePlayerId || !window.playerTeams) return;

    // Impede as pokebolas aparecerem duplicadas, triplicadas, ... devido a quantidade de pokemons no time
    counterDiv.innerHTML = '';



    // Recupera o time do jogador ativo
    const team = window.playerTeams[window.activePlayerId] || [];

    // Adiciona uma pokébola para cada pokémon capturado
    for (let i = 0; i < team.length; i++) {
        const img = document.createElement('img');
        img.src = 'assets/images/pokeballTeamIndicator.png';
        img.className = 'image-team-capture-counter';
        img.alt = 'Pokeball';
        counterDiv.appendChild(img);
    }
}
