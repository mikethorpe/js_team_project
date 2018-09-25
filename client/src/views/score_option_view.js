const PubSub = require('../helpers/pub_sub.js');

const ScoreOptionView = function(container, option){
    this.container = container;
    this.option = option;
}

ScoreOptionView.prototype.render = function(){
    
    const optionButton = document.createElement('button');
    optionButton.innerHTML = `${this.option.amount}${this.option.symbol}`;    
    optionButton.addEventListener('click', () => {
        PubSub.publish('ScoreOptionView:option-submitted', this.option);
    });

    this.container.appendChild(optionButton);

}

module.exports = ScoreOptionView;