# intelligrated-lcm

> Kiosk-style tool for Intelligrated's Lifecycle Management service.

#### Job

- 9697: Design / Development

#### Stakeholders

- TriComB2B: Design / Development
- Intelligrated: Owner / Content Generation

#### Platforms

- win32 : v0.0.1 : March 31, 2017

## Getting Started

To get started locally, clone this repository, install the dependencies, and build the assets:

```sh
$ git clone git@github.com:TricomB2B/intelligrated-lcm.git
$ cd intelligrated-lcm
$ yarn
$ gulp build
```

The app can now be run from any web browser.

### Development

Following the process above, either update the gulpfile with your local proxy URL:

```js
/* -- gulpfile.babel.js -- */

// Proxy URL (optional)
const proxyUrl = 'intelligrated-lcm.dev';
```

or just utilize the local browser sync server task:

```sh
# proxy
$ gulp proxy

# local
$ gulp
```

You'll see the assets build for development, and gulp will being watching files for changes.

## Prerequisites

No additional prereqs are required to deploy to a live server or run the packaged version(s).

### Development

- [NodeJS](https://nodejs.org/en/)
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
  "bigPath": "img/big/",
  "medPath": "img/medium/",
  "smallPath": "img/small/",
  "bigTail": "-bkg.jpg",
  "medTail": "-220x220.jpg",
  "smallTail": "-192x192.jpg",
  "home": [],
  "cats": {},
  "topics": {}
}
```

#### Paths / Tails

This is the path to the various sized images, along with the filename suffix. All image filenames should match its associated topic ID.

#### Home Array

```js
"home": [
  "peak",
  "manage",
  "maintain",
  "247"
 ]
```

Simply an array of category ID references to the category objects.

#### Cats

```js
"cats": {
  "peak": {
    "title": "LCM Peak",
    "size": "medium",
    "introCopy": "Lorem Ipsum",
    "topics": [
      "assessment",
      "system-stress-test",
      "project-management",
      "performance-guarantee",
      "reporting",
      "escalation",
      "supplemental-support-resources",
      "parts-inv-management",
      "parts-peak-insurance-kit",
      "tech-support-base",
      "onsite-operator-training",
      "contract-terms"
    ]
  }
}
```

Category definitions.

- `title` Displayed title of the category.
- `size` Sizing of the boxes in the selector. Valid options are `medium` and `small`.
- `introCopy` Copy to display at the top of the selector view.
- `topics` Array of topic ID references to the topic objects.

#### Topics

```js
"topics": {
  "assessment": {
    "title": "Assessment",
    "copy": "<p>Blah Blah HTML allowed here.</p>"
  }
}
```

Topic definitions.

- `title` Displayed title of the topic.
- `copy` Copy to display in the detail view. HTML is allowed here, however it will be sanitized to only allow safe tags. At minimum, you will need a `<p> ... </p>` tag for the copy to display correctly.

## Built With

[AngularJS](https://angularjs.org/) - Web framework, v1.6.x  
[TypeScript](https://www.typescriptlang.org/) - Code  
[Yarn](https://yarnpkg.com/en/) - Dependency management

## Contributing

Branch off of the `dev` branch, develop your feature, and open a pull request to merge back into `dev`.

## Versioning

We use SemVer for versioning.

## Authors

- Dan Williams - Designer
- Todd Miller - Developer
- Lorie Woods - Account Executive

## License

Copyright (c) 2017 TriComB2B & Intelligrated