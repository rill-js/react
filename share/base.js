'use strict'

var React = require('react')
var create = require('create-react-class')
var PropTypes = require('prop-types')
var childContextTypes = {
  locals: PropTypes.object,
  req: PropTypes.object
}

module.exports = create({
  displayName: 'BaseElement',
  childContextTypes: childContextTypes,
  propTypes: {
    locals: PropTypes.object,
    req: PropTypes.object.isRequired,
    view: PropTypes.element.isRequired
  },
  getChildContext: function () {
    return {
      locals: this.props.locals,
      req: this.props.req
    }
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
    var contextTypes = el.type.contextTypes = el.type.contextTypes || {}
    // Check if we should automatically add locals.
    for (var key in childContextTypes) {
      if (contextTypes[key]) continue
      contextTypes[key] = childContextTypes[key]
    }
  }

  // Ensure child context types.
  React.Children.forEach(el.props.children, ensureContextType)

  return el
}
