var React    = require("react");
var dom      = require("react-dom");
var statuses = require("statuses");
var base     = require("../lib/base.js");

module.exports = function (opts) {
	return function renderReact (ctx, next) {
		var res = ctx.res;

		ctx.render = function (view) { res.body = view; };

		return next().then(function () {
			if (
				!React.isValidElement(res.body) ||
				statuses.redirect[res.status] ||
				statuses.empty[res.status] ||
				res.get("Location")
			) return;
			return new Promise(function (accept, reject) {
				try {
					dom.render(
						React.createElement(base, {
							session: ctx.session,
							locals: ctx.locals,
							view:   res.body
						}),
						document, accept
					);
				} catch (err) {
					res.body = undefined;
					reject(err);
				}
			});
		});
	};
};
