const PubSub = require('../helpers/pub_sub');

const NewGameView = function(container){
    this.container = container;
}

NewGameView.prototype.render = function(){
    this.container.innerHTML = '';
    const newGameButton = document.createElement('button');
    newGameButton.innerHTML = 'New game';
    this.container.appendChild(newGameButton);
   
    newGameButton.addEventListener('click', () => {
        this.container.innerHTML = '';
        const loadingParagraph = document.createElement('p');
        loadingParagraph.textContent = 'Loading questions...';
        this.container.appendChild(loadingParagraph);
        PubSub.publish('NewGameView:new-game-button-clicked');
    })
}

module.exports = NewGameView;