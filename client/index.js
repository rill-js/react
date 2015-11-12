var React    = require("react");
var dom      = require("react-dom");
var statuses = require("statuses");
var base     = require("../lib/base.js");

module.exports = function (options) {
	return function renderReact (ctx, next) {
		var res = ctx.res;

		ctx.render = function (view, locals) {
			for (var key in locals) ctx.locals[key] = locals[key];

			res.body = React.createElement(base, {
				locals: ctx.locals,
				view: view
			});
		};

		return next().then(function () {
			if (
				!React.isValidElement(res.body) ||
				statuses.redirect[res.status] ||
				statuses.empty[res.status] ||
				(res.get("Location") && !res.get("Refresh"))
			) return;
			return new Promise(function (accept) { dom.render(res.body, document, accept); });
		});
	};
};