const PubSub = require('../helpers/pub_sub');
const AnswersView = require ('./answers_view');
const formatterHelper = require('../helpers/formatHTTPElements.js')
const ScoreOptionsView = require('../views/score_options_view.js');
const ScoreView = require('../views/score_view');

const QuestionView = function(container) {
    this.question = null;
    this.scoreOptions = null;
    this.container = container;
    this.questionAnswersOptionsDiv = null;
    this.runningTotalGBP = 0;
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

    PubSub.subscribe('Score:score-updated', (event) => {
        this.runningTotalGBP = event.detail;
        PubSub.publish('QuestionView:new-question-view-data');
    })

    let questionViewDataCounter = 0;
    const numberOfQuestionViewData = 3;

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
    this.questionAnswersOptionsDiv = document.createElement('div');
    this.questionAnswersOptionsDiv.className = 'question_answers_options_div'
    this.container.appendChild(this.questionAnswersOptionsDiv);
    this.renderScore();
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question_div'
    this.questionAnswersOptionsDiv.appendChild(questionDiv);

    this.question.question = formatterHelper(this.question.question);
    questionDiv.textContent = this.question.question;
    this.renderAnswers();
    this.renderScoreOptions();
}

QuestionView.prototype.renderAnswers = function(){
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers_div';
    this.questionAnswersOptionsDiv.appendChild(answersDiv);
    const answersView = new AnswersView(answersDiv, this.question);
    answersView.randomizeAnswers();
    answersView.render();
}

QuestionView.prototype.renderScoreOptions = function(){
    const scoreOptionsDiv = document.createElement('div');
    scoreOptionsDiv.className = 'score_options_div';
    this.questionAnswersOptionsDiv.appendChild(scoreOptionsDiv);
    const scoreOptionsView = new ScoreOptionsView(scoreOptionsDiv, this.scoreOptions);
    scoreOptionsView.render();
}

QuestionView.prototype.renderScore = function () {
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'score_div';
    this.questionAnswersOptionsDiv.appendChild(scoreDiv)
    const scoreView = new ScoreView(scoreDiv, this.runningTotalGBP);
    scoreView.render();
}

module.exports = QuestionView;