const PubSub = require('../helpers/pub_sub');
const GameOverView = require('../views/game_over_view');
const Score = require('./score');
const decodeQuestionHtml = require('../helpers/decode_question_html');

const Game = function() {
    this.questionsArray = null;
    this.currentQuestion = null;
    this.currentQuestionNumber = 0;
    this.maxNumberOfQuestionsInGame = 12;
    this.numberOfQuestionsCorrect = 0;
    this.gameWon = false;
    this.score = new Score();
}

Game.prototype.bindEvents = function(){

    PubSub.subscribe('NewGameView:new-game-button-clicked', () => {
        this.newGame();
    });

    PubSub.subscribe('Questions:questions-data-ready', (event) => {
        const questions = event.detail;
        this.setupNewGame(questions);
    });

    PubSub.subscribe('AnswerView:answer-submitted', (event) => {
        const answerSubmitted = event.detail;
        this.checkAnswer(answerSubmitted);
    });

}

Game.prototype.newGame = function(){
    this.score.bindEvents();
    this.score.resetScore();
    PubSub.publish('Game:start-new-game');
}

Game.prototype.setupNewGame = function(questions){
    console.log("Setting up new game...");
    this.numberOfQuestionsCorrect = 0;
    this.currentQuestionNumber = 0;
    this.gameWon = false;
    this.questionsArray = questions;
    this.nextQuestion();
}

Game.prototype.nextQuestion = function(){
    this.currentQuestionNumber++;
    this.currentQuestion = this.questionsArray.pop();
    decodeQuestionHtml(this.currentQuestion);
    this.score.createScoreOptions(this.currentQuestionNumber);

    const questionViewData = {
        question: this.currentQuestion,
        currentScore: this.score.runningTotalGBP
    };
    PubSub.publish("Game:next-question-ready", questionViewData);
    console.log("Correct answer:", this.currentQuestion.correct_answer);
    
}

Game.prototype.checkAnswer = function(answerSubmitted){
    const correctAnswer = this.currentQuestion.correct_answer;

    if (correctAnswer == answerSubmitted) {
        this.numberOfQuestionsCorrect++;
        const gbpValueOfAnswer = this.score.convertChosenCryptoIntoGBPScore(this.currentQuestionNumber);
        PubSub.publish('Game:render-notification', { message: 'Correct Answer!, that was worth £' +  Math.trunc(gbpValueOfAnswer) + "!!"});
        PubSub.publish('Game:correct-answer-submitted')
        this.score.incrementScore(this.currentQuestionNumber);
        this.checkWinCondition();
    }
    else {
        this.endGame();
    }
}

Game.prototype.endGame = function(){
    const gameDisplayDiv = document.querySelector('#game_display'); 
    console.log("Game ending");    
    const cryptoOverviewData = this.score.returnGameOverData();
    if (this.gameWon) {
        const gameOverMessage = 'Congratulations - you won, you smart little ducky!';
        const gameOverView = new GameOverView(gameDisplayDiv, gameOverMessage, cryptoOverviewData);
        gameOverView.render();
    }
    else {
        const gameOverMessage = 'Game Over!';
        const correctAnswerMessage = `That was quackers! The correct answer was: ${this.currentQuestion.correct_answer}`;
        const gameOverView = new GameOverView(gameDisplayDiv, gameOverMessage, cryptoOverviewData, correctAnswerMessage);
        gameOverView.render();
    }
}

Game.prototype.checkWinCondition = function(){
    if (this.numberOfQuestionsCorrect == this.maxNumberOfQuestionsInGame) {
        this.gameWon = true;
        this.endGame();
    }
    else {
        this.nextQuestion();
    }
}

module.exports = Game;