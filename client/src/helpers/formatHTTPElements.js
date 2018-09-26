const formatHTTPElements = function(string) {
    let target = string;
    target = target.split("&quot;").join("\"");
    target = target.split("&#039;").join("\'");
    target = target.split("&amp;").join('&');
    return target;
};

module.exports = formatHTTPElements;