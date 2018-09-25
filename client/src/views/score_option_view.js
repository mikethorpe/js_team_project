const PubSub = require('../helpers/pub_sub.js');

const ScoreOptionView = function(container, option){
    this.container = container;
    this.option = '1BTC';
}

ScoreOptionView.prototype.render = function(){
    const scoreOptionRadio = document.createElement('radio');
    
    scoreOptionRadio.innerHTML = this.option;    
    scoreOptionRadio.addEventListener('select', (event) => {
        const optionText = `${event.target.value} BTC`;
        PubSub.publish('ScoreOptionView:option-submitted', optionText);
    });

    this.container.appendChild(scoreOptionDiv);

}

module.exports = ScoreOptionView;