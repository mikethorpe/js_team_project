const Questions = require('./questions');
const PubSub = require('../helpers/pub_sub');

const Game = function() {
    this.questions = null;
    this.currentQuestion = null;
    this.currentQuestionNumber = 0;
    this.maxNumberOfQuestionsInGame = 12;
    this.numberOfQuestionsCorrect = 0;
}

Game.prototype.bindEvents = function(){
    PubSub.subscribe('Questions:questions-data-ready', (event) => {
        this.questions = event.detail;
        this.nextQuestion();
    });

    PubSub.subscribe('AnswerView:answer-submitted', (event) => {
        const answerSubmitted = event.detail;
        this.checkAnswer(answerSubmitted);
    })
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
    console.log("New game starting..."); 
    this.questions.getData();
    this.numberOfQuestionsCorrect = 0;
}

Game.prototype.endGame = function(){
    console.log("Game over");
    this.newGame();
}

Game.prototype.checkWinCondition = function(){
    console.log('Checking win condition');
    console.log('Number of correct answers: ', this.numberOfQuestionsCorrect);
    if (this.numberOfQuestionsCorrect == this.maxNumberOfQuestionsInGame) {
        this.endGame();
    }
    else {
        this.nextQuestion();
    }
}

module.exports = Game;