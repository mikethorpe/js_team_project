const Questions = require('./questions');
const PubSub = require('../helpers/pub_sub');
const GameOverView = require('../views/game_over_view');
const formatterHelper = require('../helpers/formatHTTPElements.js');

const Game = function() {
    this.questionsArray = null;
    this.currentQuestion = null;
    this.currentQuestionNumber = 0;
    this.maxNumberOfQuestionsInGame = 1;
    this.numberOfQuestionsCorrect = 0;
    this.gameWon = false;
}

const testQuestion = {
    "category": "Entertainment: Video Games",
    "type": "multiple",
    "difficulty": "hard",
    "question": "In the game &quot;Overwatch,&quot; which quote does the hero &quot;McCree&quot; NOT say upon using his flashbang ability?",
    "correct_answer": "&quot;You done?&quot;",
    "incorrect_answers": [
    "&quot;Whoa there.&quot;",
    "&quot;Hold up now.&quot;",
    "&quot;Don&#039;t move.&quot;"
    ]
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
    //refactor this into this.questionsArray.pop();
    this.currentQuestion = testQuestion;
    this.currentQuestion.incorrect_answers = this.currentQuestion.incorrect_answers.map((incorrectAnswer) => {
        return formatterHelper(incorrectAnswer);
    })
    this.currentQuestion.correct_answer = formatterHelper(this.currentQuestion.correct_answer);
    PubSub.publish("Game:next-question-ready", this.currentQuestion);
    console.log(this.currentQuestion);
    console.log(this.currentQuestion.correct_answer);
    
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
        console.log(answerSubmitted);
        console.log(correctAnswer);
        this.endGame();
    }
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

const replaceAll = function(string, search, replacement) {
    let target = string;
    return target.split(search).join(replacement);
};



module.exports = Game;