var React = require("react");

module.exports = React.createClass({
	displayName: "BaseElement",
	propTypes: {
		session: React.PropTypes.any,
		locals:  React.PropTypes.object,
		view:    React.PropTypes.element.isRequired
	},
	childContextTypes: {
		session: React.PropTypes.any,
		locals: React.PropTypes.object
	},
	getChildContext: function () {
		return {
			session: this.props.session,
			locals: this.props.locals
		};
	},
	render: function () {
		return React.cloneElement(this.props.view);
	}
});