const Questions = require('./questions');
const PubSub = require('../helpers/pub_sub');
const GameOverView = require('../views/game_over_view');

const Game = function() {
    this.questions = null;
    this.currentQuestion = null;
    this.currentQuestionNumber = 0;
    this.maxNumberOfQuestionsInGame = 3;
    this.numberOfQuestionsCorrect = 0;
    this.gameWon = false;
}

Game.prototype.bindEvents = function(){
    PubSub.subscribe('Questions:questions-data-ready', (event) => {
        this.questions = event.detail;
        this.newGame();
        this.nextQuestion();
    });

    PubSub.subscribe('AnswerView:answer-submitted', (event) => {
        const answerSubmitted = event.detail;
        this.checkAnswer(answerSubmitted);
    });

}

Game.prototype.nextQuestion = function(){
    this.currentQuestion = this.questions.getQuestion();
    PubSub.publish("Game:next-question-ready", this.currentQuestion);
    console.log(this.currentQuestion);
}

Game.prototype.checkAnswer = function(answerSubmitted){
    const correctAnswer = this.currentQuestion.correct_answer;

    if (correctAnswer == answerSubmitted) {
        console.log("correct answer");
        this.numberOfQuestionsCorrect++;
        this.checkWinCondition();
    }
    else {
        console.log('incorrect answer');
        this.endGame();
    }
}

Game.prototype.newGame = function(){
    console.log("Setting up new game..."); 
    // this.questions.getData();
    this.numberOfQuestionsCorrect = 0;
    this.currentQuestionNumber = 0;
    this.gameWon = false;
}

Game.prototype.endGame = function(){
    const gameDisplayDiv = document.querySelector('#game_display');
    console.log("Game ending");    
    if (this.gameWon) {
        const winMessage = 'Congratulations - you won!'
        const gameOverView = new GameOverView(gameDisplayDiv, winMessage);
        gameOverView.render();
    }
    else {
        const loseMessage = 'Wrong answer - game over!'        
        const gameOverView = new GameOverView(gameDisplayDiv, loseMessage);
        gameOverView.render();
    }

}

Game.prototype.checkWinCondition = function(){
    console.log('Checking win condition');
    console.log('Number of correct answers: ', this.numberOfQuestionsCorrect);
    if (this.numberOfQuestionsCorrect == this.maxNumberOfQuestionsInGame) {
        this.gameWon = true;
        this.endGame();
    }
    else {
        this.nextQuestion();
    }
}

module.exports = Game;