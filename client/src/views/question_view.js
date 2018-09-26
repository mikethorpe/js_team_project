const PubSub = require('../helpers/pub_sub');
const AnswersView = require ('./answers_view');
const formatterHelper = require('../helpers/formatHTTPElements.js')
const ScoreOptionsView = require('../views/score_options_view.js');

const QuestionView = function(container) {
    this.question = null;
    this.scoreOptions = null;
    this.container = container;
}

QuestionView.prototype.bindEvents = function(){
    
    PubSub.subscribe("Game:next-question-ready", (event) => {
        this.question = event.detail;
        PubSub.publish('QuestionView:new-question-view-data'); 
    })

    PubSub.subscribe('Score:score-options-for-question', (event) => {
        this.scoreOptions = event.detail;
        PubSub.publish('QuestionView:new-question-view-data');
    })

    let questionViewDataCounter = 0;
    const numberOfQuestionViewData = 2;

    PubSub.subscribe('QuestionView:new-question-view-data', () => {
        questionViewDataCounter++;
        console.log("questionViewDataCounter ", this);

        if (questionViewDataCounter == numberOfQuestionViewData) {
            this.render();
            questionViewDataCounter = 0;
        }
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
    answersDiv.className = 'answers_div'
    this.container.appendChild(answersDiv);
    const answersView = new AnswersView(answersDiv, this.question);
    answersView.randomizeAnswers();
    answersView.render();
}

QuestionView.prototype.renderScoreOptions = function(){
    const scoreOptionsDiv = document.createElement('div');
    scoreOptionsDiv.className = 'score_options_div';
    this.container.appendChild(scoreOptionsDiv);
    const scoreOptionsView = new ScoreOptionsView(scoreOptionsDiv, this.scoreOptions);
    scoreOptionsView.render();
}

module.exports = QuestionView;