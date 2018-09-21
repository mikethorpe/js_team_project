const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request.js')

const Questions = function () {
    this.urls = [
        'https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple',
        'https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple',
        'https://opentdb.com/api.php?amount=4&difficulty=hard&type=multiple'
    ]
    this.questions = [];
}

Questions.prototype.getData = function () {
    this.urls.forEach(url => {
        const request = new Request(url);
        request.get()
            .then((questions) => {
                console.log(questions);
            })
            .catch(console.error);
    })
}

module.exports = Questions;