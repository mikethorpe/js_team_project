const NewGameView = require('../views/new_game_view');

const GameOverView = function(container, message) {
    this.container = container;
    this.message = message;
}

GameOverView.prototype.render = function() {
    this.container.innerHTML = '';
    this.container.innerHTML = this.message;
    
    const newGameDiv = document.createElement('div');
    this.container.appendChild(newGameDiv);
    
    const newGameView = new NewGameView(newGameDiv);
    newGameView.render();
}

module.exports = GameOverView;