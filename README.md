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

## Deploy Preview

Netlify automatically runs a build on a non-`master` branch when a GitHub pull request is opened for that branch. If the build passes then Netlify automatically deploys the changes to a "Deploy Preview" whose URL is publicly accessible, but "secure" by being an obscure/unguessable URL. Deploy Previews are listed [here](https://app.netlify.com/sites/luox/deploys?filter=deploy+previews).

## Production

Netlify automatically runs a build when commits are pushed to the `master` branch. If the build passes then Netlify automatically deploys the changes to the production website, [luox.app](https://luox.app/). Production deployments are listed [here](https://app.netlify.com/sites/luox/deploys?filter=master).

## Note

Please note that this repository is participating in a study into sustainability of open source projects. Data will be gathered about this repository for approximately the next 12 months, starting from 4 June 2021.

Data collected will include number of contributors, number of PRs, time taken to close/merge these PRs, and issues closed.

For more information, please visit [our informational page](https://sustainable-open-science-and-software.github.io/) or download our [participant information sheet](https://sustainable-open-science-and-software.github.io/assets/PIS_sustainable_software.pdf).
