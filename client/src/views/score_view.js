const PubSub = require('../helpers/pub_sub.js');

const ScoreView = function (container){
    this.container = container;
    this.runningTotalGBP = null;
}

ScoreView.prototype.bindEvents = function (){
    PubSub.subscribe('Score:score-updated', (event) => {
        this.runningTotalGBP = event.detail;
        this.render();
    });
}

ScoreView.prototype.render = function (){
    console.log('rendering score');
    this.container.innerHTML = '';
    const currentScoreElement = document.createElement('p');
    currentScoreElement.textContent = Math.trunc(this.runningTotalGBP);    
    this.container.appendChild(currentScoreElement);   
}

module.exports = ScoreView;