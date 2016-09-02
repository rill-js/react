<h1 align="center">
  <!-- Logo -->
  <img src="https://raw.githubusercontent.com/rill-js/rill/master/Rill-Icon.jpg" alt="Rill"/>
  <br/>
  @rill/react
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/@rill/react">
    <img src="https://img.shields.io/npm/v/@rill/react.svg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@rill/react">
    <img src="https://img.shields.io/npm/dm/@rill/react.svg?style=flat-square" alt="Downloads"/>
  </a>
  <!-- Gitter Chat -->
  <a href="https://gitter.im/rill-js/rill">
    <img src="https://img.shields.io/gitter/room/rill-js/rill.svg?style=flat-square" alt="Gitter Chat"/>
  </a>
</h1>

Universal React rendering middleware for [Rill](https://github.com/rill-js/rill).

# Installation

```console
npm install @rill/react
```

# Example

```javascript
const app = require('rill')()
const React = require('react')
const renderer = require('@rill/react')

// Setup React rendering in Rill.
app.use(renderer())

// Set locals in middleware.
app.use(({ locals }), next)=> {
	locals.title = '@rill/react'
	return next()
})

app.use(({ req, res }, next)=> {
	// Just set the body to a react element.
	// updates the dom in the browser, or render a string in the server.
	res.body = <HelloWorld message="Hello World"/>

	// On the server the final response will be.
	`
		<!DOCTYPE html>
		<html>
			<head>
				<title>My App</title>
				<meta name="description" content="Rill Application">
			</head>
			<body>
				@rill/react@0.x
				Hello World
				<script src="/app.js"></script>
			</body>
		</html>
	`
})

// An example HelloWorld component in React.
function HelloWorld (props, { locals }) {
	return (
		<html>
			<head>
				<title>My App</title>
				<meta name="description" content="Rill Application"/>
			</head>
			<body>
				{locals.title}
				{props.message}
				<div>{props.children}</div>
				<script src="/app.js"/>
			</body>
		</html>
	)
}
```

# Nesting Components
When rendering React expects a constant outer layer for elements like html, head and body.
@rill/react makes it easy to wrap react components with the Rill router with a special `#wrap` function.

```js
const { wrap } = require("@rill/react")

// This will automatically wrap any valid react elements attached to the body with the `HelloWorld` component.
// The `props` option can be a function (called with a rill `ctx`) or an object.
app.get('/*', wrap(HelloWorld, { message: 'world' }))
app.get('/home', ({ res })=> {
	// This will be a child of the HelloWorld component.
	res.body = <MyOtherComponent/>
})
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
