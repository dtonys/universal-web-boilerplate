# :black_circle: universal-web-boilerplate

## Overview

A modern universal web boilerplate, built on react, redux, webpack, and node.  Use as a starting point for server rendered, code split webapps.

See the demo app [here](http://www.universalboilerplate.com/)

## Motivation

Setting up a modern javascript web project can be time consuming and difficult.

Frameworks like [nextjs](https://github.com/zeit/next.js/), [create-react-app](https://github.com/facebook/create-react-app), and [razzle](https://github.com/jaredpalmer/razzle) address this complexity by abstracting configurations away with custom scaffolding tools and setup scripts.

However these frameworks and tools take control away from the developer, and make it more difficult to change or customize the configuration.

Universal web boilerplate provides an opinionated yet solid foundation you need to get started, without abstracting any of the implementation details away.


## Featuring


#### Modern javascript
  - async / await everywhere, to simplify async control flow and error handling
  - react HOCs applied with decorators
  - iterators and generators integrated with redux-saga

#### Rapid developer workflow
  - Hot module replacement reloads the source code on both server and client on change
  - Changes to the web server picked up and reloaded with nodemon
  - `autodll-webpack-plugin` prevents large vendor libraries from being reloaded in development mode

#### Production ready
  - CSS and Javascipt minified in production
  - CommonsChunkPlugin bundles all vendor dependencies together to be browser cached
  - Polyfills, autoprefixers, NODE_ENV, and all the other details taken care of

#### Modern frontend tech
  - `react` for declarative UI
  - `redux` for explicit state management
  - `react-final-form` for simple and high performance form handling
  - `redux-saga` for handling async workflows
  - `redux-first-router` for handling universal routing
  - `material-ui` foundational components, with `css-modules` enabled sass for custom styling
  - `fetch-everywhere` for isomorphic API calls

#### Testing with Jest + Enzyme
  - Components and pages are fully mounted, wrapped with redux, emulating the app's natural state
  - Components are tested from a user perspective, hitting all parts of the system


#### ESLint based on `eslint-config-airbnb` for fine grained control of code syntax and quality
  - Optimized for a react frontend environment
  - IDE integration highly recommended

#### Logging and error handling setup from the start
  - redux logger implemented on both server and client
  - simple http logging with morgan

## Code splitting + server rendering

Universal web boilerplate utilizes the "universal" product line to solve the problem of code splitting + server rendering together.

It is recommended to read more about [these modules](https://medium.com/faceyspacey).  Some short excerpts below are provided to give you a general sense of what is going on.

- [react-universal-component](https://github.com/faceyspacey/react-universal-component), which loads components on demand on the client, and synchronously loaded on the server.
- [redux-first-router](https://github.com/faceyspacey/redux-first-router), a router which encourages route based data fetching, and redux as the source of truth for route data.

## Usage with a JSON API backend

This app is designed to connect to a live backend, using the API defined [here](https://github.com/dtonys/node-api-boilerplate#api).

If you do not provide an API_URL, the app will run in offline mode, and you will not be able to log in or sign up.

Point the API to `http://api.universalboilerplate.com` to use the existing api deployed there.

You can also run [node-api-boilerplate](https://github.com/dtonys/node-api-boilerplate) locally alongside the web server, which is recommended to get started with full stack work.

The app assumes your API server is on running on a separate process, and uses a proxy to send requests to the external API.

This decoupled approach makes the web and api services easier to organize, and provides a more flexible architecture.


## Prerequisites

- nodejs, latest LTS - https://nodejs.org/en/
- Yarn - https://yarnpkg.com/en/

## Setup

#### Download the repo and install dependencies
`git clone https://github.com/dtonys/universal-web-boilerplate && cd universal-web-boilerplate`

`yarn`

#### Create a `.env` file with values below, and add to the project root
NOTE: Substitute your own values as needed
```
SERVER_PORT=3010
API_URL=http://api.universalboilerplate.com
```

#### Start the server in development mode
`npm run dev`

#### Build and run the server in production mode
`npm run build`

`npm run start`

#### Run tests
`npm run test`

#### Run ESLint
`npm run lint-js`


## External references

This boilerplate was created with inspiration from the following resources:

- react-redux-universal-hot-example - https://github.com/erikras/react-redux-universal-hot-example
- survivejs - https://github.com/survivejs-demos/webpack-demo
- redux-first-router-demo - https://github.com/faceyspacey/redux-first-router-demo
- universal-demo - https://github.com/faceyspacey/universal-demo
- egghead-universal-component - https://github.com/timkindberg/egghead-universal-component
- create-react-app - https://github.com/facebook/create-react-app

