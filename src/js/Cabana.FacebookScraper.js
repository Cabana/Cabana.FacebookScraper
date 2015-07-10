'use strict';

//= include core/variables.js

Cabana.FacebookScraper = function() {

	var _this = Cabana.FacebookScraper;

	var config = arguments.length > 0 ? arguments[0] : arguments,
			configOptions;

	if (config) {
		if (config.options) configOptions = config.options;
	}

	//= include core/methods.js

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