var React    = require("react");
var dom      = require("react-dom");
var statuses = require("statuses");
var base     = require("../lib/base.js");

module.exports = function (options) {
	return function renderReact (ctx, next) {
		var res = ctx.res;

		ctx.render = function (view, props) {
			res.body = React.createElement(base, {
				locals: ctx.locals,
				props: props,
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
			return new Promise(function (accept, reject) {
				try {
					dom.render(res.body, document, accept);
				} catch (err) {
					res.body = undefined;
					reject(err);
				}
			});
		});
	};
};