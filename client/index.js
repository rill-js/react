var React = require("react");
var dom   = require("react-dom");
var base  = require("../lib/base.js");

module.exports = function (options) {
	return function renderReact (ctx, next) {
		ctx.locals = ctx.locals || {};
		var res    = ctx.res;

		res.render = function (view, locals) {
			for (var key in locals) ctx.locals[key] = locals[key];

			res.body = React.createElement(base, {
				locals: ctx.locals,
				view: view
			});
		};

		return next().then(function () {
			if (!React.isValidElement(res.body) || res.headers["location"]) return;
			return new Promise(function (accept) { dom.render(res.body, document, accept); });
		});
	};
};