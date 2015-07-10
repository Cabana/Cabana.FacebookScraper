var ajax = function(url) {

	var request = new XMLHttpRequest();

	request.open('GET', 'parser', location.href);
	request.onreadystatechange = function() {
		if (request.readyState != 4 || request.status != 200) return console.log("error!");
		console.log('request', request.responseText);
	};
	request.send('parse='+url);

};