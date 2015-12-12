# Rill React
Isomorphic React rendering middleware for Rill.

# Installation

#### Npm
```console
npm install @rill/react
```

# Example

```javascript
const app        = require("rill")();
const React      = require("react");
const reactViews = require("@rill/react");

class HelloWorld extends React.Component {
	render() {
		const { props }           = this;
		const { session, locals } = this.context;
		return (
			<html>
				<head>
					<title>My App</title>
					<meta name="description" content="Rill Application"/>
				</head>
				<body>
					{ locals.title }
					{ props.message }
					<script src="/app.js"/>
				</body>
			</html>
		);
	}
};
// Locals and a session will be provided as context if available.
HelloWorld.contextTypes = {
	locals: React.PropTypes.object,
	session: React.PropTypes.object
};

app.use(reactViews());

// Set locals in middleware.
app.use(({ locals }), next)=> {
	locals.title = "@rill/react";
	return next();
});

app.use(({ req, res }, next)=> {
	// Just set the body to a react element.
	// updates the dom in the browser, or render a string in the server.
	res.body = (<HelloWorld message="Hello World"/>);

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
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
