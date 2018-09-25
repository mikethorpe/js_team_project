const PubSub = require('../helpers/pub_sub.js')
const ScoreOptionView = require('../views/score_option_view.js')

const ScoreOptionsView = function(container){
    this.container = container;
}

ScoreOptionsView.prototype.bindEvents = function(){
    //awaiting event name
    PubSub.subscribe('???', (event) => {
        this.render(event.detail);
    })
}

ScoreOptionsView.prototype.render = function(scoreOptions){
    this.container.innerHTML = '';
    const scoreOption = new ScoreOptionView(this.container);
    scoreOptions.forEach((option) => option.render());
}