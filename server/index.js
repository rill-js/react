var React = require("react");
var dom   = require("react-dom/server");
var base  = require("../lib/base.js");

module.exports = function (options) {
	return function renderReact (ctx, next) {
		var res = ctx.res;

		res.render = function (view, locals) {
			for (var key in locals) ctx.locals[key] = locals[key];

			res.body = React.createElement(base, {
				locals: ctx.locals,
				view: view
			});
		};

		return next().then(function () {
			if (!React.isValidElement(res.body)) return;
			res.body = "<!DOCTYPE html>" + dom.renderToString(res.body);
		});
	};
};