# Rill React
Isomorphic React rendering middleware for Rill.

# Installation

#### Npm
```console
npm install @rill/react
```

# Example

```javascript
const app    = require("rill")();
const React  = require("react");
const reactViews = require("@rill/react");

const HelloWorld = React.createClass({
	// Locals will be provided as context.
	contextTypes: {
		locals: React.PropTypes.object
	},
	render: function () {
		const { props }  = this;
		const { locals } = this.context;
		return (
			<html>
				<head>
					<title>My App</title>
					<meta name="description" content="Rill Application"/>
				</head>
				<body>
					{ locals.title }@{ locals.version }
					{ props.message }
					<script src="/app.js"/>
				</body>
			</html>
		);
	}
});

app.use(reactViews());

// Set locals on the app.
app.set("version", "0.x");

// Set locals in middleware.
app.use(function ({ locals }), next) {
	locals.title = "@rill/react";
	return next();	
});

app.use(function ({ req, res, render }, next) {
	// Render our app.
	render(HelloWorld, { message: "Hello World"});

	// On the server. (In the browser react will render to the dom).
	res.body; //-> `
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

# API

**ctx.render(component, locals)** - Renders a component (client or server) and attaches locals to the react context.


### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
