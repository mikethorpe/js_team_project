const Questions = require('./models/questions.js');
const Game = require('./models/game.js');
const QuestionView = require('./views/question_view');
const NewGameView = require('./views/new_game_view');
const CryptoCurrency = require('./models/crypto_currency.js')
const ModalNotificationView = require('./views/modal_notification_view');
const Score = require('./models/score.js')
const ScoreView = require('./views/score_view.js')

document.addEventListener('DOMContentLoaded', () => {
    console.log('Javascript initialized');

    const notificationDiv = document.querySelector('#notifications');
    const modalNotificationView = new ModalNotificationView(notificationDiv);
    modalNotificationView.render();
    modalNotificationView.bindEvents();

    const gameDisplayDiv = document.querySelector('#game_display');
    const questionView = new QuestionView(gameDisplayDiv);
    questionView.bindEvents();

    const scoreDiv = document.querySelector('div#score');
    const scoreView = new ScoreView(scoreDiv);
    
    const game = new Game();
    game.bindEvents();

    const questions = new Questions();
    questions.bindEvents();

    const cryptoCurrency = new CryptoCurrency();
    cryptoCurrency.bindEvents();
    
    const newGameView = new NewGameView(gameDisplayDiv);
    newGameView.render();
    

});