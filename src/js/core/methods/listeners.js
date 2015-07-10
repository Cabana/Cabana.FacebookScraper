var listeners = function() {

	document.querySelector("[data-scrape]").addEventListener("click", function() {
			
			var url = document.querySelector("[data-scrape-url]").value;

			if (!url) {
				return;	
			}

			var urlParse = function(href) {
		    var l = document.createElement("a");
		    l.href = href;
		    return l;
			};

			Cabana.vars.FacebookScraper.baseUrl = urlParse(url).protocol+'//'+urlParse(url).host;

			Cabana.FacebookScraper().ajax({
				'url': location.href+'?parse='+url,
				'method': 'GET'
			}, Cabana.FacebookScraper().scrape);

	});

};