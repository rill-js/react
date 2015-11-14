var React = require("react");

module.exports = React.createClass({
	displayName: "BaseElement",
	propTypes: {
		locals: React.PropTypes.object,
		props:  React.PropTypes.any,
		view:   React.PropTypes.any.isRequired
	},
	childContextTypes: {
		locals: React.PropTypes.object
	},
	getChildContext: function () {
		return { locals: this.props.locals };
	},
	render: function () {
		return React.createElement(this.props.view, this.props.props);
	}
});