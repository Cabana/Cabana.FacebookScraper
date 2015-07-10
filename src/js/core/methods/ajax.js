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