const PubSub = require('../helpers/pub_sub.js');

const ScoreOptionView = function(container, option){
    this.container = container;
    this.option = option;
}

ScoreOptionView.prototype.render = function(){
    
    const optionButton = document.createElement('button');
    optionButton.className = 'score_option_button'
    optionButton.innerHTML = `${this.option.symbol}: ${this.option.staticAmount.toFixed(4)}`;  

    // Highlight bitcoin score option as the default
    if (this.option.symbol == 'BTC') {
        optionButton.style.backgroundColor = 'red';
    }

    optionButton.addEventListener('click', () => {
        PubSub.publish('ScoreOptionView:option-submitted', this.option);
        this.resetOptionButtonsStyle();
        optionButton.style.backgroundColor = 'red';
    });

    this.container.appendChild(optionButton);

}

ScoreOptionView.prototype.resetOptionButtonsStyle = function () {
    const optionButtons = document.querySelectorAll('.score_option_div button');
    optionButtons.forEach( (optionButton) => {
        optionButton.style.backgroundColor = '#ffd700';
        
    })
}

module.exports = ScoreOptionView;