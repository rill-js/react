var React = require("react");
var dom   = require("react-dom/server");
var base  = require("../lib/base.js");

module.exports = function (options) {
	return function renderReact (ctx, next) {
		var res = ctx.res;
		res.render = function (view, locals) {
			return new Promise(function (accept) {
				res.body = "<!DOCTYPE html>" + dom.renderToString(
					React.createElement(base, {
						locals: locals,
						view: view
					})
				);

				accept();
			});
		};

		return next();
	};
};