const PubSub = require('../helpers/pub_sub');

const Score = function() {
    this.cryptoConversionFactors = null;
    this.currentScore = 0;
    this.scoreInBtc = 0;
}

Score.prototype.bindEvents = function () {
    PubSub.subscribe('Game:start-new-game', () => {
        this.resetScore();
    });

    PubSub.subscribe('Game:correct-answer-submitted', () => {
        this.incrementScore();
    });

    PubSub.subscribe('CryptoCurrency:crypto-conversion-data-ready', (event)=>{
        this.cryptoConversionFactors = event.detail;        
        console.log('score conversion factor:', this.cryptoConversionFactors);
    })

}

Score.prototype.incrementScore = function(){
    this.currentScore ++;
    this.convertCryptoScoreIntoGBP()
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

Score.prototype.convertCryptoScoreIntoGBP = function(currency, score){
    const cryptoConversionFactor = this.cryptoConversionFactors[currency];
    this.convertedBTCScore = (cryptoConversionFactor * score);
}

module.exports = Score;