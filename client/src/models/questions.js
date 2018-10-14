const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const Questions = function () {
    this.urls = [
        'https://opentdb.com/api.php?amount=4&difficulty=hard&type=multiple',
        'https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple',
        'https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple'
    ]
    this.numberOfApiRequests = 0;
    this.questionsArray = null;
    this.questionsFromApi = null;
}

Questions.prototype.bindEvents = function(){
    PubSub.subscribe('Game:start-new-game', () => this.getData());
    
    PubSub.subscribe('Questions:api-response-received', () => {
        this.numberOfApiRequests++
        if (this.numberOfApiRequests === 3){
            this.pushToQuestionsArray(this.questionsFromApi.hard);
            this.pushToQuestionsArray(this.questionsFromApi.medium);
            this.pushToQuestionsArray(this.questionsFromApi.easy);  
            PubSub.publish('Questions:questions-data-ready', this.questionsArray);
        }
    })
}

Questions.prototype.getData = function () {
    this.questionsArray = [];
    this.questionsFromApi = {
        easy: [],
        medium: [],
        hard: []
    };
    this.numberOfApiRequests = 0;
    this.makeApiRequests();
}

Questions.prototype.makeApiRequests = function() {
    this.urls.forEach(url => {
        const request = new Request(url);
        request.get()
            .then((questionsResponse) => {
                const questionsFromApi = questionsResponse.results; 
                this.sortQuestionsByDifficulty(questionsFromApi);
                PubSub.publish('Questions:api-response-received');
            })
            .catch(console.error);
    })
}

Questions.prototype.sortQuestionsByDifficulty = function(questionsFromApi) {
    if (questionsFromApi[0].difficulty == 'easy') {
        this.questionsFromApi.easy = this.questionsFromApi.easy.concat(questionsFromApi);
    }
    else if (questionsFromApi[0].difficulty == 'medium') {
        this.questionsFromApi.medium = this.questionsFromApi.medium.concat(questionsFromApi);
    }
    else if (questionsFromApi[0].difficulty == 'hard') {
        this.questionsFromApi.hard = this.questionsFromApi.hard.concat(questionsFromApi);
    }
}

Questions.prototype.pushToQuestionsArray = function(questions) {
    while (questions.length != 0) {
        const question = questions.pop();
        this.questionsArray.push(question);
    }
}

module.exports = Questions;
