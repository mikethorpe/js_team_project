const he = require('he');

const decodeQuestionHtml = function(questionToDecode) {
    questionToDecode.question = he.decode(questionToDecode.question);
    questionToDecode.incorrect_answers = questionToDecode.incorrect_answers.map((incorrectAnswer) => {
        return he.decode(incorrectAnswer);
    })
    questionToDecode.correct_answer = he.decode(questionToDecode.correct_answer);
    return questionToDecode;
};

module.exports = decodeQuestionHtml;