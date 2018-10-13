const PubSub = require('../helpers/pub_sub.js');

const ScoreView = function (container, runningTotalGBP){
    this.container = container;
    this.runningTotalGBP = runningTotalGBP;
}

ScoreView.prototype.render = function (){
    const currentScoreElement = document.createElement('h2');
    currentScoreElement.textContent = 'Score: £' + Math.trunc(this.runningTotalGBP);    
    this.container.appendChild(currentScoreElement);   
}

module.exports = ScoreView;