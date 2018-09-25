const PubSub = require('../helpers/pub_sub.js');

const ScoreOptionView = function(container, option){
    this.container = container;
    this.option = '1BTC';
}

ScoreOptionView.prototype.render = function(){
    
    const optionButton = document.createElement('button');
    optionButton.innerHTML = this.option;    
    optionButton.addEventListener('click', (event) => {
        const optionText = event.target.value;
        PubSub.publish('ScoreOptionView:option-submitted', optionText);
    });

    this.container.appendChild(optionButton);

}

module.exports = ScoreOptionView;