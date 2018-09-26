const PubSub = require('../helpers/pub_sub');

const Score = function () {
    this.runningTotalGBP = 0;
    this.scoreOptionsArray = [];
    this.cryptoConversionFactors = null;
    this.currentScoreOption = null;
}



/*
    historical crypto data bellow taken from the following urls:
    https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=GBP&ts=1537948800
    https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=GBP&ts=1537948800
    https://min-api.cryptocompare.com/data/pricehistorical?fsym=DOGE&tsyms=GBP&ts=1537948800
    https://min-api.cryptocompare.com/data/pricehistorical?fsym=XRP&tsyms=GBP&ts=1537948800
    Values hard coded due to being a fixed currency value as of the unix time stamp 1537948800;
    Values also hard coded to preserve API requests.
    Unix time stamp 1537948800 refers to 26/09/2018, at 08h00, UTC.

const cryptoCurrencyScoringFactor = {
    BTC: 4915.19,
    ETH: 166.02,
    DOGE: 0.004351,
    XRP: 0.3996
}
*/
const questionGbpValues = [
    500, 1000, 2000, 5000, 10000, 20000, 50000, 75000, 150000, 250000, 500000, 1000000
];

const questionBitcoinValues = [
    0.1017254674, 0.2034509348, 0.4069018695, 1.017254674, 2.034509348, 4.069018695, 10.17254674, 15.25882011, 30.51764021, 50.86273369, 101.7254674, 203.4509348
]
const questionEtheriumValues = [
    3.011685339, 6.023370678, 12.04674136, 30.11685339, 60.23370678, 120.4674136, 301.1685339, 451.7528009, 903.5056017, 1505.84267, 3011.685339, 6023.370678
]
const questionDogecoinValues = [
    114916.1112, 229832.2225, 459664.445, 1149161.112, 2298322.225, 4596644.45, 11491611.12, 17237416.69, 34474833.37, 57458055.62, 114916111.2, 229832222.5
]
const questionRippleValues = [
    1251.251251, 2502.502503, 5005.005005, 12512.51251, 25025.02503, 50050.05005, 125125.1251, 187687.6877, 375375.3754, 625625.6256, 1251251.251, 2502502.503
]

Score.prototype.incrementScore = function (currentQuestionNumber) {
    this.currentQuestionNumber++;
    console.log('last questions chosen option', this.currentScoreOption);
    this.runningTotalGBP += this.convertChosenCryptoIntoGBPScore(currentQuestionNumber);
    PubSub.publish('Score:score-updated', this.runningTotalGBP);
    console.log('Current running total score GBP: ', this.runningTotalGBP);
}

Score.prototype.bindEvents = function () {
    PubSub.subscribe('CryptoCurrency:crypto-conversion-data-ready', (event) => {
        this.cryptoConversionFactors = event.detail;
    })

    PubSub.subscribe('ScoreOptionView:option-submitted', (event) => {
        this.currentScoreOption = event.detail;
    });

}

Score.prototype.resetScore = function () {
    this.runningTotalGBP = 0;
    PubSub.publish('Score:score-updated', this.runningTotalGBP);

}

Score.prototype.createScoreOptions = function (currentQuestionNumber) {
    const questionGbpValue = questionGbpValues[currentQuestionNumber - 1];

    const bitcoinObject = this.createScoreOption('Bitcoin', 'BTC', questionBitcoinValues, currentQuestionNumber);
    const etheriumObject = this.createScoreOption('Etherium', 'ETH', questionEtheriumValues, currentQuestionNumber);
    const dogecoinObject = this.createScoreOption('Dogecoin', 'DOGE', questionDogecoinValues, currentQuestionNumber);
    const rippleObject = this.createScoreOption('Ripple', 'XRP', questionRippleValues, currentQuestionNumber);
    const scoreOptions = [bitcoinObject, etheriumObject, dogecoinObject, rippleObject];
    PubSub.publish('Score:score-options-for-question', scoreOptions);

    //Bitcoin is the default score option
    this.currentScoreOption = bitcoinObject;
}

Score.prototype.createScoreOption = function (currency, symbol, staticCryptoValueArray, currentQuestionNumber) {

    // const cryptoConversionFactor = this.cryptoConversionFactors[symbol].GBP;    
    //staticAmount refers to the amounts refered on line 13
    //currentAmount refers to the data gathered from the API
    const optionObject = {
        staticAmount: staticCryptoValueArray[currentQuestionNumber - 1],
        currency: currency,
        symbol: symbol,

    }
    return optionObject;
}

Score.prototype.convertChosenCryptoIntoGBPScore = function (currentQuestionNumber) {
    const cryptoToGBPConversionFactor = this.cryptoConversionFactors[this.currentScoreOption.symbol].GBP;
    console.log('crypto conversion factor', cryptoToGBPConversionFactor);
    switch (this.currentScoreOption.symbol) {
        case 'BTC':
            return (cryptoToGBPConversionFactor * questionBitcoinValues[currentQuestionNumber - 1])
        case 'ETH':
            return (cryptoToGBPConversionFactor * questionEtheriumValues[currentQuestionNumber - 1])
        case 'DOGE':
            return (cryptoToGBPConversionFactor * questionDogecoinValues[currentQuestionNumber - 1])
        case 'XRP':
            return (cryptoToGBPConversionFactor * questionRippleValues[currentQuestionNumber - 1])
    }
}

Score.prototype.returnGameOverData = function () {
    const truncatedScore = Math.trunc(this.runningTotalGBP);
    const endgameData = `
        \n You score of ${truncatedScore} is worth:
        \n ${(this.runningTotalGBP / this.cryptoConversionFactors['BTC'].GBP).toFixed(4)} in Bitcoin.
        \n ${(this.runningTotalGBP / this.cryptoConversionFactors['ETH'].GBP).toFixed(4)} in Etherium.
        \n ${(this.runningTotalGBP / this.cryptoConversionFactors['DOGE'].GBP).toFixed(4)} in Dogecoin.
        \n ${(this.runningTotalGBP / this.cryptoConversionFactors['XRP'].GBP).toFixed(4)} in Ripple.
        `
    return endgameData
}
module.exports = Score;