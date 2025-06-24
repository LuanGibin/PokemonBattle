//define uma váriavel global para o jogador ativo (o qual clicou-se na pokebola para inicar as capturas)
window.activePlayerId = null;

window.playerTeams = {};
document.querySelectorAll('.player').forEach(span => {
    const id = span.dataset.playerId;
    playerTeams[id] = [];
});