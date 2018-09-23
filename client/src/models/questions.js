const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const Questions = function () {
    this.urls = [
        'https://opentdb.com/api.php?amount=4&difficulty=hard&type=multiple',
        'https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple',
        'https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple'
    ]
    this.questionsArray = [];
    this.numberOfApiRequests = 0;
}

Questions.prototype.bindEvents = function(){
    PubSub.subscribe('NewGameView:new-game-button-clicked', () => {
        this.getData();
    })
    
    PubSub.subscribe('Questions:api-response-received', () => {
        this.numberOfApiRequests++
        if (this.numberOfApiRequests > 2){
            PubSub.publish('Questions:questions-data-ready', this.questionsArray);
            console.log('number of api requests:', this.numberOfApiRequests);            
        }
    })
}

Questions.prototype.getData = function () {
    this.numberOfApiRequests = 0;
    this.makeApiRequests();
}

Questions.prototype.makeApiRequests = function() {
    this.urls.forEach(url => {
        const request = new Request(url);
        request.get()
            .then((questionsResponse) => {
                const questionsFromAPi = questionsResponse.results;
                this.pushDataToQuestionsArray(questionsFromAPi);
                PubSub.publish('Questions:api-response-received');
            })
            .catch(console.error);
    })
}

Questions.prototype.pushDataToQuestionsArray = function(questionsFromApi) {
    while (questionsFromApi.length != 0) {
        const question = questionsFromApi.pop();
        this.questionsArray.push(question);
    }
}

module.exports = Questions;
