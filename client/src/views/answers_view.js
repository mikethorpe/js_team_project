const AnswerView = require('./answer_view');
const shuffleArray = require('../helpers/shuffle_array');

const AnswersView = function(container, question) {
    this.container = container;
    this.correctAnswer = question.correct_answer;
    this.incorrectAnswers = question.incorrect_answers;
    this.allAnswers = [];
}

AnswersView.prototype.randomizeAnswers = function() {
    this.allAnswers = this.incorrectAnswers.slice(0);
    this.allAnswers.push(this.correctAnswer);
    shuffleArray(this.allAnswers);
}

AnswersView.prototype.render = function(){
    this.allAnswers.forEach( (answer) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer_div'
        this.container.appendChild(answerDiv);
        const answerView = new AnswerView(answerDiv, answer);
        answerView.render();
    })
}

module.exports = AnswersView;