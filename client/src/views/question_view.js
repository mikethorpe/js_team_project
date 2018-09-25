const PubSub = require('../helpers/pub_sub');
const AnswersView = require ('./answers_view');
const formatterHelper = require('../helpers/formatHTTPElements.js')
const ScoreOptionsView = require('../views/score_options_view.js');

const QuestionView = function(container) {
    this.question = null;
    this.container = container;
}

QuestionView.prototype.bindEvents = function(){
    PubSub.subscribe("Game:next-question-ready", (event) => {
        this.question = event.detail;
        this.render();
    })
}

QuestionView.prototype.render = function(){
    this.container.innerHTML = '';
    const questionDiv = document.createElement('div');
    this.question.question = formatterHelper(this.question.question);
    questionDiv.textContent = this.question.question;
    this.container.appendChild(questionDiv);
    this.renderAnswers();
    this.renderScoreOptions();
}

QuestionView.prototype.renderAnswers = function(){
    const answersDiv = document.createElement('div');
    this.container.appendChild(answersDiv);
    const answersView = new AnswersView(answersDiv, this.question);
    answersView.randomizeAnswers();
    answersView.render();
}

QuestionView.prototype.renderScoreOptions = function(){
    const scoreOptionsDiv = document.createElement('div');
    this.container.appendChild(scoreOptionsDiv);
    const scoreOptionsView = new ScoreOptionsView(scoreOptionsDiv);
    scoreOptionsView.render();
}

module.exports = QuestionView;