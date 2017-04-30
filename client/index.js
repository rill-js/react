'use strict'

var React = require('react')
var dom = require('react-dom')
var statuses = require('statuses')
var base = require('../share/base')
var wrap = require('../share/wrap')

// Expose api.
reactMiddlewareSetup.wrap = wrap
module.exports = reactMiddlewareSetup

/**
 * Creates a Rill middleware that checks for react components in the body.
 * React components are rendered into the document.
 */
function reactMiddlewareSetup (opts) {
  return function reactMiddleware (ctx, next) {
    var res = ctx.res
    return next().then(function () {
      if (
        !React.isValidElement(res.body) ||
        statuses.redirect[res.status] ||
        statuses.empty[res.status] ||
        res.get('Location')
        ) return
      return new Promise(function (resolve, reject) {
        try {
          dom.render(
            React.createElement(base, {
              locals: ctx.locals,
              view: res.body
            }),
            document, resolve
          )

          if (res.status === 404) res.status = 200
          res.set('Content-Type', 'text/html; charset=UTF-8')
        } catch (err) {
          console && console.error && console.error(err)
        } finally {
          res.body = ''
        }
      })
    })
  }
}
