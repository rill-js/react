var assert      = require("assert");
var agent       = require("supertest");
var Rill        = require("rill");
var React       = require("react");
var dom         = require("react-dom/server");
var base        = require("../lib/base")
var serverViews = require("../server");

describe("Rill/React", function () {
	it("should work on the server", function (done) {
		var view = React.createClass({
			contextTypes: {
				locals: React.PropTypes.object
			},
			render: function () {
				var locals = this.context.locals;
				return React.createElement("html", null,
					React.createElement("head"),
					React.createElement("body", null, locals.hello + locals.ctx)
				);
			}
		});

		var request = agent(
			Rill()
				.use(serverViews())
				.get("/", function (ctx, next) {
					ctx.locals["ctx"] = "locals";
					ctx.res.render(view, { hello: "world" });
				})
				.listen()
		);

		request
			.get("/")
			.expect(200)
			.expect(function (res) {
				var body = res.text.split("</body>")[0].split(">").pop()
				assert.equal(
					body,
					"worldlocals"
				);
			})
			.expect("content-type", "text/html; charset=UTF-8")
			.end(done)
	});
});

function respond (status, test) {
	return function (ctx) {
		ctx.res.status = status;
		if (typeof test === "function") test(ctx);
	};
}