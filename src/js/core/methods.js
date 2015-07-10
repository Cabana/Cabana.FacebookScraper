if (arguments.length == 0) {

	//= include methods/ajax.js
	//= include methods/listeners.js
	//= include methods/scrape.js

	return (function() {

		return {
			ajax: ajax,
			listeners: listeners,
			scrape: scrape,
			scrapeUrl: 'https://graph.facebook.com'
		};

	})();

}