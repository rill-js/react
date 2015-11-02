var React = require("react");
var dom   = require("react-dom");
var base  = require("../lib/base.js");

module.exports = function (options) {
	return function renderReact (req, res, next) {
		this.render = function (view, locals) {
			return new Promise(function (accept) {
				res.body = dom.render(
					React.createElement(base, {
						locals: locals,
						view: view
					}), document, accept
				);
			});
		};

		return next();
	};
};