var assert      = require("assert");
var agent       = require("./agent");
var Rill        = require("rill");
var React       = require("react");
var serverViews = require("../server");

describe("Rill/React", function () {
	after(agent.clear);

	it("should work on the server", function (done) {
		var view = React.createClass({
			contextTypes: {
				locals: React.PropTypes.object
			},
			render: function () {
				return React.createElement("html", null,
					React.createElement("head"),
					React.createElement("body", null, "Hello World")
				);
			}
		});

		var request = agent.create(
			Rill()
				.use(serverViews())
				.get("/", function (req, res, next) {
					this.render(view, { hello: "world" });
					assert.ok(res.body.startsWith("<!DOCTYPE html><html"));
				})
		);

		request
			.get("/")
			.expect(200)
			.expect("content-type", "text/html; charset=UTF-8")
			.end(done)
	});
});

function respond (status, test) {
	return function (req, res) {
		res.status = status;
		if (typeof test === "function") test.call(this, req, res);
	};
}