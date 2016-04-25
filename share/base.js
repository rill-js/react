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
    return ensureContextType(this.props.view)
  }
})

/**
 * Recursively iterates over a React Element and it's children to ensure that it accepts a contextType.
 *
 * @param {React.Element} el
 * @return {React.Element}
 */
function ensureContextType (el) {
  if (!el) return
  if (!el.type) return

  // Ensure child context types.
  React.Children.forEach(el.props.children, ensureContextType)

  // Ensure context types exist.
  el.type.contextTypes = el.type.contextTypes || {}

  // Check if we should automatically add locals.
  if (!('locals' in el.type.contextTypes)) {
    el.type.contextTypes.locals = object
    // Clone to element to ensure context type gets updated.
    return React.cloneElement(el)
  }

  return el
}
