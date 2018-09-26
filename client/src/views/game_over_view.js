const NewGameView = require('../views/new_game_view');

const GameOverView = function (container, message, cryptoOverviewData, correctAnswerMessage) {
    this.container = container;
    this.message = message;
    this.cryptoOverviewData = cryptoOverviewData;
    this.correctAnswerMessage = correctAnswerMessage;
}

GameOverView.prototype.render = function () {
    this.container.innerHTML = '';
    const gameOverContainer = document.createElement('div');

    const gameOverMessageParagraph = document.createElement('h1');
    gameOverMessageParagraph.textContent = this.message;
    gameOverContainer.appendChild(gameOverMessageParagraph);

    if (this.correctAnswerMessage) {
        const correctAnswerMessage = document.createElement('p');
        correctAnswerMessage.textContent = this.correctAnswerMessage;
        gameOverContainer.appendChild(correctAnswerMessage);
    }

    const finalScoreMessageInPounds = document.createElement('p');
    finalScoreMessageInPounds.textContent = `Your score of £${this.cryptoOverviewData.score} was worth:`;
    gameOverContainer.appendChild(finalScoreMessageInPounds);

    for (i = 0; i < this.cryptoOverviewData.cryptoCurrencyScore.length; i++) {
        const finalScoreMessageInCrypto = document.createElement('li')
        finalScoreMessageInCrypto.textContent = `${this.cryptoOverviewData.cryptoCurrencyScore[i]} in ${this.cryptoOverviewData.cryptoCurrencyReadableName[i]}`
        gameOverContainer.appendChild(finalScoreMessageInCrypto);
    }
    this.container.appendChild(gameOverContainer);



    // this.container.innerHTML = this.message;

    const newGameDiv = document.createElement('div');
    this.container.appendChild(newGameDiv);

    const newGameView = new NewGameView(newGameDiv);
    newGameView.render();
}

module.exports = GameOverView;

/*
const endgameData = {
        score: truncatedScore,
        bitcoinScore: (this.runningTotalGBP / this.cryptoConversionFactors['BTC'].GBP).toFixed(4),
        etheriumScore: (this.runningTotalGBP / this.cryptoConversionFactors['ETH'].GBP).toFixed(4),
        dogecoinScore: (this.runningTotalGBP / this.cryptoConversionFactors['DOGE'].GBP).toFixed(4),
        rippleScore: (this.runningTotalGBP / this.cryptoConversionFactors['XRP'].GBP).toFixed(4)
    }
*/