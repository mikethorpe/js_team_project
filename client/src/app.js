const Questions = require('./models/questions.js');
const Game = require('./models/game.js');
const QuestionView = require('./views/question_view');
const NewGameView = require('./views/new_game_view');
const CryptoCurrency = require('./models/crypto_currency.js')

document.addEventListener('DOMContentLoaded', () => {
    console.log('Javascript initialized');

    const gameDisplayDiv = document.querySelector('#game_display');
    const questionView = new QuestionView(gameDisplayDiv);
    questionView.bindEvents();

    const game = new Game();
    game.bindEvents();

    const questions = new Questions();
    questions.bindEvents();

    const newGameView = new NewGameView(gameDisplayDiv);
    newGameView.render();
    
    const cryptoCurrency = new CryptoCurrency();
    cryptoCurrency.bindEvents();
});