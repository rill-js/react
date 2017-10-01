'use strict'

var React = require('react')
var dom = require('react-dom')
var statuses = require('statuses')
var base = require('../share/base')
var wrap = require('../share/wrap')

// Expose api.
module.exports = exports = reactMiddlewareSetup
exports.wrap = wrap

/**
 * Creates a Rill middleware that checks for react components in the body.
 * React components are rendered into the document.
 */
function reactMiddlewareSetup (opts) {
  var root = (opts && opts.root)
    ? document.querySelector(opts.root)
    : document

  return function reactMiddleware (ctx, next) {
    var req = ctx.req
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
          dom.hydrate(
            React.createElement(base, {
              locals: ctx.locals,
              view: res.body,
              req: req
            }),
            root,
            resolve
          )

          if (res.status === 404) res.status = 200
          res.set('Content-Type', 'text/html; charset=UTF-8')
          res.body = ' '
        } catch (err) {
          reject(err)
        }
      })
    })
  }
}
