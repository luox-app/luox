# CIE Colour Fidelity Index module for luox [luox-NRC-CIERf]

**_luox_** is an open-source web platform for calculating quantities that describe light exposures. Quantities for the intensity of light exposure in terms of the international standard CIE S026:2018 were calculated in the original release. The luox-NRC-CIERf module, developed at the NRC in collaboration with the site’s original creator, adds quantities related to light source colour appearance and colour rendering, principally those from publication CIE 224:2017 CIE 2017 Colour Fidelity Index for accurate scientific use. It also adds a ‘power mode’ permitting the user to submit any number of spectra simultaneously for calculation.

## Team

This module was developed by Dr. Somang Nam and Dr. Jennifer A. Veitch at the National Research Council of Canada – Construction Research Centre, in collaboration with Dr. Manuel Spitschan (Translational Sensory & Circadian Neuroscience, Max Planck Institute for Biological Cybernetics and Technical University of Munich, Germany).

## Citation

Nam, S., Veitch, J. A., & Spitschan, M. (2021). CIE Colour Fidelity Index module for luox (luox-NRC-CIERf) [Source code]. National Research Council of Canada. https://github.com/nrc-cnrc.

### Companion Paper

[to be updated]

## Licence

luox-NRC-CIERf is distributed as free software under the terms of the GNU GPL-3.0 licence (https://www.gnu.org/licenses/gpl-3.0.en.html) Please review the LICENCE document for terms.

---

**Copyright notice**

**_luox-NRC-CIERf_** is a module to calculate parameters for light source colour appearance and colour rendering in the luox platform.

Copyright (C) 2022 Her Majesty the Queen in Right of Canada. National Research Council of Canada. Ottawa, Canada.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License v 3.0 as published by the Free Software Foundation.

Redistributions and modifications should credit the National Research Council of Canada as the originator of this code.
![National Research Council of Canada Logo](/src/imagess/nrc-signature-e-kr.jpg?raw=true "National Research Council of Canada Logo")

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

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
