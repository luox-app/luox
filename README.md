# luox

## Development

The app is made up of HTML, CSS and JavaScript. We're using ES2015 modules and we use [webpack](https://webpack.js.org) to bundle the application. The core of the application is pure JavaScript and the user interface uses [React](https://reactjs.org).

We use [Prettier](https://prettier.io) to ensure consistent code formatting and [ESLint](https://eslint.org) with [Airbnb's JavaScript style guide](https://github.com/airbnb/javascript) to automatically find and fix problems as well as enforcing a particular code style in our JavaScript.

### Install nvm and node

```
$ brew install nvm
$ # Follow instructions to configure your bash config
```

### Install node

```
$ cd /path/to/lightbox
$ nvm install
$ nvm use
Found '/path/to/lightbox/.nvmrc' with version <v10.19.0>
Now using node v10.19.0 (npm v6.13.4)
```

### Install packages

```
$ npm install
```

### Running tests

The tests are written using [Jest](https://jestjs.io).

```
$ npm test
```

### Starting app in development

```
$ npm start
```

## Production

The app is [deployed to Netlify](https://luox.netlify.app/).
