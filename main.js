$(function() {
    var rules = [
        [/ヴェイ/g, "ベー"],
        [/ヴュ/g, "ビュ"],
        [/ヴァ/g, "バ"],
        [/ヴィ/g, "ビ"],
        [/ヴェ/g, "ベ"],
        [/ヴォ/g, "ボ"],
        [/ヴ/g, "ブ"],
    ];

    var replaceCharacters = function() {
        $('body :not(script,iframe)').contents().filter(function() {
            return this.nodeType === 3 && this.nodeValue.match(/^[\n \t　]*$/) === null;
        }).replaceWith(function() {
            return rules.reduce(function(text, rule) {
                return text.replace(rule[0], rule[1]);
            }, this.nodeValue);
        });
    };

    replaceCharacters();
    $("#main-article-detail-container,#loaded-more-articles").each(function(i, element) {
        var observer = new MutationObserver((dom, instance) => replaceCharacters());
        observer.observe(element, { childList: true });
    });
});
