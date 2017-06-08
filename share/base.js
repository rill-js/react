'use strict'

var React = require('react')
var create = require('create-react-class')
var PropTypes = require('prop-types')

module.exports = create({
  displayName: 'BaseElement',
  propTypes: {
    locals: PropTypes.object,
    req: PropTypes.object.isRequired,
    view: PropTypes.element.isRequired
  },
  childContextTypes: { locals: PropTypes.object, req: PropTypes.object },
  getChildContext: function () {
    return { locals: this.props.locals, req: this.props.req }
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

  // Ensure context types exist for components.
  if (typeof el.type !== 'string') {
    el.type.contextTypes = el.type.contextTypes || {}
    // Check if we should automatically add locals.
    if (!('locals' in el.type.contextTypes)) el.type.contextTypes.locals = PropTypes.object
  }

  // Ensure child context types.
  React.Children.forEach(el.props.children, ensureContextType)

  return el
}
