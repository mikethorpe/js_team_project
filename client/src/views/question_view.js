const PubSub = require('../helpers/pub_sub');
const AnswersView = require ('./answers_view');
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
        this.question = event.detail.question;
        this.runningTotalGBP = event.detail.currentScore;
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

    const questionText = document.createElement('h2');
    questionText.textContent = this.question.question;
    questionDiv.appendChild(questionText)
    this.renderAnswers();

    this.renderScoreOptions();
}

QuestionView.prototype.renderAnswers = function(){

    const questionHeaderParagraph = document.createElement('h3');
    questionHeaderParagraph.textContent = 'Select your answer:';
    this.questionAnswersOptionsDiv.appendChild(questionHeaderParagraph);

    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers_div';
    this.questionAnswersOptionsDiv.appendChild(answersDiv);
    const answersView = new AnswersView(answersDiv, this.question);
    answersView.randomizeAnswers();
    answersView.render();
}



QuestionView.prototype.renderScoreOptions = function(){
   
    const optionHeaderParagraph = document.createElement('h3');
    optionHeaderParagraph.textContent = 'Select your crypto-currency:';
    this.questionAnswersOptionsDiv.appendChild(optionHeaderParagraph);


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