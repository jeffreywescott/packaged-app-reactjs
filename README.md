# packaged-app-reactjs

This is a simple React.js-based web application packaged as an NPM module.

## Rationale

**BEGIN: TRIGGER WARNING**

I am _not_ a fan of Meteor.js. While I think that some of the concepts behind it are interesting, I strongly dislike how prescriptive it is and how it aims to build it's own ecosystem rather than taking the best-of-breed things that already exist in JavaScript / Node.js land.

**END: TRIGGER WARNING**

However, there are some interesting projects built with Meteor, like [Rocket.Chat](https://rocket.chat/).

Rocket.Chat allows you to extend it with Meteor packages. I wanted to have a _loosely coupled_ way to write web applications that can be embedded (client-side) into Rocket.Chat. That is to say that I wanted to essentially "deploy" a client-side web app using React.js into Rocket.Chat.

Since [Meteor packages allow you to use NPM dependencies](https://themeteorchef.com/snippets/using-npm-packages/) my idea was to try and create a React.js application as an NPM module. That way, I could develop the app independently of Meteor and Rocket.Chat, but deploy it inside Rocket.Chat. This repository is my best-effort at creating a React.js app to prove out that concept.
## How it works

This is a pretty "standard" client-side React.js application, with a few things of note:

1. It is written in ES2015 and uses [babel](https://babeljs.io) for compatibility.
2. It uses [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) and [react-transform-hmr](https://github.com/gaearon/react-transform-hmr) for hot-module reloading.
3. The main JavaScript script loaded by the application doesn't run any code to render the app. Instead, it uses an exported `render` function that gets invoked after the script is included. See [`index.html`](index.html) for details. To make this work, webpack was configured with a `libraryTarget` of `this`.

## Getting Started

Be sure you've read the [instructions for contributing](./CONTRIBUTING.md).

1. Clone the repository.
2. Create your `.env` file for your environment, e.g.:
    $ echo -e "PORT=8083\nNODE_ENV=development"
3. Run the server:
    $ npm install
    $ npm start
4. Visit the server in your browser:
    $ open http://localhost:8083


## License

See the [LICENSE](./LICENSE) file.
