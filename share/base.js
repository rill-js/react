var React = require('react')
var object = React.PropTypes.object

module.exports = React.createClass({
  displayName: 'BaseElement',
  propTypes: {
    locals: object,
    view: React.PropTypes.element.isRequired
  },
  childContextTypes: { locals: object },
  getChildContext: function () {
    return { locals: this.props.locals }
  },
  render: function () {
    var view = this.props.view
    var type = view.type

    // Ensure context types exist.
    type.contextTypes = type.contextTypes || {}

    // Check if we should automatically add locals for ease of use.
    if (!('locals' in type.contextTypes)) {
      type.contextTypes.locals = object
    }

    return React.cloneElement(view)
  }
})
