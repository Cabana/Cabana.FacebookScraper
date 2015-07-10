var scrape = function(object, progress) {

	var status = document.querySelector('[data-scrape-status]');

	if (object && object.url) {
		Cabana.vars.FacebookScraper.urls = object.url;
		var statusLength = Object.keys(object.url).length;
		status.innerHTML = 'Found '+statusLength+' URLs<br />';
		_this().scrape(object.url[0], 0);
		return;
	} else if (!object) {
		console.log(object);
	}


	if (!progress) {
		console.log('SETTING PROGRESS');
		var progress = 0;
	}

	var toScrape = [];



	if (Cabana.vars.FacebookScraper.urls[progress] && progress < 2) {

		var host = Cabana.vars.FacebookScraper.baseUrl ? Cabana.vars.FacebookScraper.baseUrl : location.href;

		var url = object.loc.indexOf('http://') == -1 && object.loc.indexOf('https://') == -1 ? host+object.loc : object.loc;

		_this().ajax({
			'url': _this().scrapeUrl,
			'method': 'POST',
			'data': {
				'id': url,
				'scrape': true
			},
			'callback': Cabana.FacebookScraper().scrape,
			'scrapeArguments': [Cabana.vars.FacebookScraper.urls[progress+1], progress+1]
		});

		//_this().scrape(Cabana.vars.FacebookScraper.urls[progress], progress);

		console.log('continuing', progress);
	} else {
		console.log('finished');
	}

};