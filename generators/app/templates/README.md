# Repo Name

> Short description

#### Job

- Job Number and Description

#### Stakeholders

- TriComB2B: Design / Development
- Client: Owner / Content Generation

#### Platforms

- Define platform-specific builds.
- Optional (ie. there may not be any platform-specific builds).

## Getting Started

To get started locally, clone this repository, install the dependencies, and compile the source:

```sh
$ git clone git@github.com:TricomB2B/repo.git
$ cd repo
$ yarn
$ npm run build
```

The app can now be run from any web browser by pointing at the `./dist/` directory.

### Development

Following the process above, run the webpack dev server!

```sh
$ npm run serve
App now at http://localhost:3000
```

You'll see the assets build for development, and and webpack will begin watching files for changes.

## Prerequisites

No additional prereqs are required to deploy to a live server or run the packaged version(s).

### Development

- [NodeJS](https://nodejs.org/en/)
- [Webpack](https://webpack.js.org/)
- [Gulp](http://gulpjs.com/)
- [Yarn](https://yarnpkg.com/en/)
- [Electron](https://electron.atom.io/)
- [Electron Packager](https://github.com/electron-userland/electron-packager)

## Initial testing

There are no automated tests. QA is done through manual testing methods.
    
## Deployment

For the web version, deployment should be done via Git on a web server, checking out the master branch or a specific tagged version. No additional steps should be necessary for a root installation.

For the packaged versions, you can utilize our [generator-ng-electron](https://github.com/TricomB2B/generator-ng-electron) to convert an AngularJS web app into an Electron desktop application. Win32, MacOS, and Linux are all supported platforms.

## Data Management

All data is managed through the `data.json` object.

#### Core Structure

```js
{

}
```

#### Define All Data Structures

## Built With

[AngularJS](https://angularjs.org/) - Web framework, v1.6.x  
[TypeScript](https://www.typescriptlang.org/) - Code  
[Yarn](https://yarnpkg.com/en/) - Dependency management

## Contributing

Branch off of the `dev` branch, develop your feature, and open a pull request to merge back into `dev`.

## Versioning

We use SemVer for versioning.

## Authors

- Person - Role

## License

Copyright (c) 2017 TriComB2B & ClientName