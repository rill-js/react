'use strict'

var React = require('react')
var Component = React.Component
var PropTypes = require('prop-types')
var childContextTypes = {
  locals: PropTypes.object,
  req: PropTypes.object
}

// Expose component.
module.exports = Base

/**
 * React component that provides all sub components with a Rill context (includes locals and req).
 * @param {*} props - the properties for the component.
 * @param {*} ctx - the original context for the component.
 */
function Base (props, ctx) { Component.call(this, props, ctx) }

// Extend react component.
Base.prototype = Object.create(Component.prototype)
Base.prototype.constructor = Base

// Setup react context.
Base.childContextTypes = childContextTypes
Base.prototype.getChildContext = function () {
  return {
    locals: this.props.locals,
    req: this.props.req
  }
}

// Automatically add context to direct children.
Base.prototype.render = function () {
  return ensureContextType(this.props.view)
}

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
