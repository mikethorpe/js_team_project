const PubSub = require('../helpers/pub_sub');

const Score = function() {
    this.runningTotalGBP = 0;
}

Score.prototype.incrementScore = function() {
    this.runningTotalGBP++;
    PubSub.publish('Score:score-updated', this.runningTotalGBP);
    console.log('Current running total score GBP: ', this.runningTotalGBP);
}

Score.prototype.resetScore = function() {
    this.runningTotalGBP = 0;
}

module.exports = Score;