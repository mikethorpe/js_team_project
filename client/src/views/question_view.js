const PubSub = require('../helpers/pub_sub');
const AnswersView = require ('./answers_view');

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
    questionDiv.textContent = this.question.question;
    this.container.appendChild(questionDiv);
    this.renderAnswers();
}

QuestionView.prototype.renderAnswers = function(){
    const answersDiv = document.createElement('div');
    this.container.appendChild(answersDiv);
    const answersView = new AnswersView(answersDiv, this.question);
    answersView.randomizeAnswers();
    answersView.render();
}

module.exports = QuestionView;