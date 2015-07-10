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