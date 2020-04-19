# Lightbox

## Development

### Install nvm and node

```
$ brew install nvm
$ # Follow instructions to configure your bash config

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

```
$ npm test
```

### Starting app in development

```
$ npm start
```

## Production

The app is deployed to GitHub Pages using the configuration in .github/workflows/main.yml.
