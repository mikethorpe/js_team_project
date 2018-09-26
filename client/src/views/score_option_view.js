const PubSub = require('../helpers/pub_sub.js');

const ScoreOptionView = function(container, option){
    this.container = container;
    this.option = option;
}

ScoreOptionView.prototype.render = function(){
    
    const optionButton = document.createElement('button');
    
    optionButton.className = 'score_option_button'
    optionButton.innerHTML = `${this.option.symbol}: ${this.option.staticAmount.toFixed(4)}`;  
    optionButton.addEventListener('click', () => {
        PubSub.publish('ScoreOptionView:option-submitted', this.option);
    });

    this.container.appendChild(optionButton);

}

module.exports = ScoreOptionView;