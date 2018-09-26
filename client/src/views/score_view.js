const PubSub = require('../helpers/pub_sub.js');

const ScoreView = function (container, runningTotalGBP){
    this.container = container;
    this.runningTotalGBP = runningTotalGBP;
}

ScoreView.prototype.render = function (){
    console.log('rendering score');
    const currentScoreElement = document.createElement('p');
    currentScoreElement.textContent = '£' + Math.trunc(this.runningTotalGBP);    
    this.container.appendChild(currentScoreElement);   
}

module.exports = ScoreView;