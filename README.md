[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Chat about Rill at https://gitter.im/rill-js/rill](https://badges.gitter.im/rill-js/rill.svg)](https://gitter.im/rill-js/rill?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Rill React
Universal React rendering middleware for [Rill](https://github.com/rill-js/rill).

# Installation

#### Npm
```console
npm install @rill/react
```

# Example

```javascript
const React = require("react");
const app = require("rill")();
const renderer = require("@rill/react");

// Setup React rendering in Rill.
app.use(renderer());

// Set locals in middleware.
app.use(({ locals }), next)=> {
	locals.title = "@rill/react";
	return next();
});

app.use(({ req, res }, next)=> {
	// Just set the body to a react element.
	// updates the dom in the browser, or render a string in the server.
	res.body = <HelloWorld message="Hello World"/>;

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
});

// An example HelloWorld component in React.
function HelloWorld (props, { locals }) {
	return (
		<html>
			<head>
				<title>My App</title>
				<meta name="description" content="Rill Application"/>
			</head>
			<body>
				{ locals.title }
				{ props.message }
				<div>{props.children}</div>
				<script src="/app.js"/>
			</body>
		</html>
	);
}
```

# Nesting Components
When rendering React expects a constant outer layer for elements like html, head and body.
@rill/react makes it easy to wrap react components with the Rill router with a special `#wrap` function.

```js
const { wrap } = require("@rill/react");

// This will automatically wrap any valid react elements attached to the body with the `HelloWorld` component.
// The `props` option can be a function (called with a rill `ctx`) or an object.
app.get("/*", wrap(HelloWorld, { message: "world" }));
app.get("/home", ({ res })=> {
	// This will be a child of the HelloWorld component.
	res.body = <MyOtherComponent/>
})
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
