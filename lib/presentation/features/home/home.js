const mainContainer = document.getElementById('main-container');
const selectPlayersContainer = document.getElementById('select-players-container');
const selectPlayersAndDefineTeamsButton = document.getElementById('select-players-and-define-teams');
const pokedexContainer = document.getElementById('pokedex-container');
const pokedexButton = document.getElementById('pokedex');

const hideThisContainerAndDisplayNewContainer = (lastContainer, nextContainer) => {
    lastContainer.style.display = 'none';
    nextContainer.style.display = 'flex';
};


pokedexButton.addEventListener('click', () => {
    hideThisContainerAndDisplayNewContainer(mainContainer, pokedexContainer);
});

selectPlayersAndDefineTeamsButton.addEventListener('click', () => {
    hideThisContainerAndDisplayNewContainer(mainContainer, selectPlayersContainer);
});