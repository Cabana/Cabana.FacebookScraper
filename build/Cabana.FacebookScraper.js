'use strict';
if (!Cabana) {
	var Cabana = {};
}
if (!Cabana.vars) {
	Cabana.vars = {};
}

Cabana.vars.FacebookScraper = {
	'errors': []
};



Cabana.FacebookScraper = function() {

	var _this = Cabana.FacebookScraper;

	var config = arguments.length > 0 ? arguments[0] : arguments,
			configOptions;

	if (config) {
		if (config.options) configOptions = config.options;
	}
	if (arguments.length == 0) {
		var ajax = function(config, callback) {
		
			var request = new XMLHttpRequest();
		
			if (!config) {
				return;
			}
		
			request.open(config.method, encodeURI(config.url));
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.onreadystatechange = function() {
				if (request.readyState != 4 || request.status != 200) return;
				
				var result = JSON.parse(request.responseText);
				
				if (result && callback) {
					callback(result);
				} else if (config.callback) {
					console.log("calling with config", config);
		
					if (config.scrapeArguments) {
						config.callback(config.scrapeArguments[0], config.scrapeArguments[1]);
					}
				}
			};
		
			if (config.data) {
				// var formData = new FormData();
				var formData = [];
		
				for (var key in config.data) {
					formData.push(key+'='+config.data[key]);
				}
		
				request.send(formData.join("&"));
			} else {
				request.send();
			}
		
		};
	
		var listeners = function() {
		
			document.querySelector("[data-scrape]").addEventListener("click", function() {
					
					var url = document.querySelector("[data-scrape-url]").value;
		
					if (!url) {
						return;	
					}
		
					Cabana.FacebookScraper().ajax({
						'url': location.href+'?parse='+url,
						'method': 'GET'
					}, Cabana.FacebookScraper().scrape);
		
			});
		
		};
	
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
		
				// var host = location.host;
				var host = 'http://fm.dk';
		
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
	
	
		return (function() {
	
			return {
				ajax: ajax,
				listeners: listeners,
				scrape: scrape,
				scrapeUrl: 'https://graph.facebook.com'
			};
	
		})();
	
	}


	var returnState = false;
	console.log(this.type);
	try {
		this[this.type.toLowerCase()](this.url);
		returnState = true;
	} catch(e) {
		Cabana.vars.FacebookScraper.errors.push(e);
		returnState = false;
	} finally {
		return returnState;
	}
};

Cabana.FacebookScraper().listeners();