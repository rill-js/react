'use strict'

var React = require('react')

module.exports = wrap

/**
 * Creates a middleware that will wrap all react components with a parent.
 *
 * @param {React.Component} Component - the component to wrap.
 * @param {Object|Function} [props] - static properties or a function that will give the component props.
 * @return {Function} a rill middleware function.
 */
function wrap (Component, props) {
  return function (ctx, next) {
    return next().then(function () {
      var body = ctx.res.body
      if (!React.isValidElement(body)) return
      ctx.res.body = React.createElement(
        Component,
        (typeof props === 'function' ? props(ctx) : props),
        body
      )
    })
  }
}
