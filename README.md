# Lightbox

## Development

The app is made up of HTML, CSS and JavaScript. We're using ES2015 modules and we use [webpack](https://webpack.js.org) to bundle the application.

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

The tests are written using [Mocha](https://mochajs.org/). The versions of Node/Mocha we're using don't support ES2015 modules so we have to require `@babel/register` to transpile them on the fly.

```
$ npm test
```

### Starting app in development

```
$ npm start
```

## Production

The app is deployed to GitHub Pages using the configuration in .github/workflows/main.yml.
