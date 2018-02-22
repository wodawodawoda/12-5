var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
	$.getJSON(prefix + quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });
}

function createTweet(input) {
	var data = input[0];
	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = 'Unkown author';
	}

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.box__quote').text(quoteText);
		$('.box__author').text("Author: " + quoteAuthor);
		$('.action__tweet').attr('href', tweet);
	}
}

$(function() {
	getQuote();
	$('.action__trigger').click(function() {
		getQuote();
	});
});
