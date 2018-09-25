const PubSub = require('../helpers/pub_sub.js')
const ScoreOptionView = require('../views/score_option_view.js')

const ScoreOptionsView = function(container, scoreOptions){
    this.container = container;
    // the container will be question_view so that the options view corresponds to the question it is being called with
    this.scoreOptions = scoreOptions;
    // get this logic from the score model
}

ScoreOptionsView.prototype.render = function(){
    this.scoreOptions.forEach((option) => {
        const optionDiv = document.createElement('div');
        this.container.appendChild(optionDiv);
        const scoreOptionView = new ScoreOptionView(optionDiv, option);
        scoreOptionView.render();
    })
}

module.exports = ScoreOptionsView;