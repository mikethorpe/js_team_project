const PubSub = require('../helpers/pub_sub');

const Score = function() {
    this.runningTotalGBP = 0;
    this.scoreOptionsArray = [];
    this.cryptoConversionFactors = null;
}

const questionGbpValues = [
    500, 1000, 2000, 5000, 10000, 20000, 50000, 75000, 150000, 250000, 500000, 1000000
    ];

Score.prototype.incrementScore = function() {
    this.runningTotalGBP++;
    PubSub.publish('Score:score-updated', this.runningTotalGBP);
    console.log('Current running total score GBP: ', this.runningTotalGBP);
}

Score.prototype.bindEvents = function() {
    PubSub.subscribe('CryptoCurrency:crypto-conversion-data-ready', (event) => {
        this.cryptoConversionFactors = event.detail;        
        console.log('score conversion factor:', this.cryptoConversionFactors);
    })
}

Score.prototype.populateScoreOptionsArray = function(){
    
}

Score.prototype.resetScore = function() {
    this.runningTotalGBP = 0;
}



/////////////////////

Score.prototype.createScoreOptions = function(questionIndex){
    const questionGbpValue = this.questionGbpValues[questionIndex];

    const bitcoinObject = this.createScoreOption('Bitcoin', 'BTC', questionGbpValue);
    const etheriumObject = this.createScoreOption('Etherium', 'ETH', questionGbpValue);
    const dogecoinObject = this.createScoreOption('Dogecoin', 'DOGE', questionGbpValue);
    const rippleObject = this.createScoreOption('Ripple', 'XRP', questionGbpValue);
    const scoreOptions = [bitcoinObject, etheriumObject, dogecoinObject, rippleObject];
    console.log(bitcoinObject);
    PubSub.publish('Score:score-options-for-question', scoreOptions);

}

Score.prototype.createScoreOption = function(currency, symbol, questionGbpValue){
    const amountConvertedToCrypto = this.convertCryptoScoreIntoGBP(symbol, questionGbpValue);
    const optionObject = {
        amount: amountConvertedToCrypto,
        currency: currency,
        symbol: symbol
    }
    return optionObject;
}

Score.prototype.convertCryptoScoreIntoGBP = function(currency, score){
    const cryptoConversionFactor = this.cryptoConversionFactors[currency].GBP;
    return this.convertedBTCScore = (score / cryptoConversionFactor);
}








//////////////


module.exports = Score;