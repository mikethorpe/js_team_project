const PubSub = require('../helpers/pub_sub');
const AnswersView = require ('./answers_view');
const formatterHelper = require('../helpers/formatHTTPElements.js')

const QuestionView = function(container) {
    this.question = null;
    this.container = container;
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

QuestionView.prototype.bindEvents = function(){
    PubSub.subscribe("Game:next-question-ready", (event) => {
        //refactor this back into event.detail;
        this.question = testQuestion;
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
}

QuestionView.prototype.renderAnswers = function(){
    const answersDiv = document.createElement('div');
    this.container.appendChild(answersDiv);
    const answersView = new AnswersView(answersDiv, this.question);
    answersView.randomizeAnswers();
    answersView.render();
}

module.exports = QuestionView;