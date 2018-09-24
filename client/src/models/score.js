const PubSub = require('../helpers/pub_sub');

const Score = function() {
    this.currentScore = 0;
}

Score.prototype.bindEvents = function () {
    PubSub.subscribe('Game:start-new-game', () => {
        this.resetScore();
    });

    PubSub.subscribe('Game:correct-answer-submitted', () => {
        this.incrementScore();
    });

}

Score.prototype.incrementScore = function(){
    this.currentScore ++;
    console.log('Score increased');
    console.log('Score is now:', this.currentScore);
    PubSub.publish('Score:score-updated', this.currentScore);
}

Score.prototype.resetScore = function () {
    this.currentScore = 0;
    console.log('score reset');
    console.log('Score is now:', this.currentScore);
    PubSub.publish('Score:score-updated', this.currentScore);
}
module.exports = Score;