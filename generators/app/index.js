'use strict';

/**
 * Generates the core angular application.
 */

var Generator = require('yeoman-generator'),
    chalk     = require('chalk'),
    yosay     = require('yosay'),
    caseIt    = require('change-case'),
    mkdirp    = require('mkdirp');

module.exports = class extends Generator {
  // Initializing Queue
  initializing () {
    this.log(yosay(`Welcome to the ${chalk.red('TricomB2B')} AngularJS+TypeScript generator!`));
  }

  // Prompting Queue
  prompting () {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your app?',
      default: this.appname
    }, {
      type: 'input',
      name: 'prefix',
      message: 'Global prefix (e.g. app = app-directive-name)',
      default: 'app'
    }, {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: 'This is a great app I made in AngularJS+TypeScript!'
    }];

    return this.prompt(prompts)
      .then((answers) => {
        this.props           = answers;
        this.props.upPrefix  = caseIt.upperCaseFirst(this.props.prefix);
        this.props.lowPrefix = caseIt.paramCase(this.props.prefix);
        this.props.appName   = caseIt.paramCase(this.props.name);
      });
  }

  // Configuration Queue
  configuring () {
    this.config.set('upPrefix', this.props.upPrefix);
    this.config.set('lowPrefix', this.props.lowPrefix);
    this.config.save();
  }

  // Writing Queue
  writing () {
    const props = this.props;

    mkdirp.sync(this.destinationPath('src/app'));
    mkdirp.sync(this.destinationPath('src/img'));
    mkdirp.sync(this.destinationPath('src/scss'));
    mkdirp.sync(this.destinationPath('src/app/core'));
    mkdirp.sync(this.destinationPath('src/app/shared'));
    mkdirp.sync(this.destinationPath('src/app/home'));

    this.fs.copy(this.templatePath('babelrc.txt'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('editorconfig.txt'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('gitignore.txt'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('postcss.config.js'), this.destinationPath('postcss.config.js'));
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('tslint.json'), this.destinationPath('tslint.json'));

    this.fs.copy(this.templatePath('src/htaccess.txt'), this.destinationPath('src/.htaccess'));
    this.fs.copy(this.templatePath('src/data.json'), this.destinationPath('src/data.json'));
    this.fs.copy(this.templatePath('src/svg4everybody.min.js'), this.destinationPath('src/svg4everybody.min.js'));

    this.fs.copy(this.templatePath('src/img/**/*'), this.destinationPath('src/img'));

    this.fs.copy(this.templatePath('src/app/home/home.component.ts'), this.destinationPath('src/app/home/home.component.ts'));
    this.fs.copy(this.templatePath('src/app/home/home.controller.ts'), this.destinationPath('src/app/home/home.controller.ts'));
    this.fs.copy(this.templatePath('src/app/home/home.html'), this.destinationPath('src/app/home/home.html'));
    this.fs.copy(this.templatePath('src/app/home/home.module.ts'), this.destinationPath('src/app/home/home.module.ts'));
    this.fs.copy(this.templatePath('src/app/home/home.scss'), this.destinationPath('src/app/home/home.scss'));

    this.fs.copy(this.templatePath('src/app/vendor.ts'), this.destinationPath('src/app/vendor.ts'));

    this.fs.copy(this.templatePath('src/app/core/core.module.ts'), this.destinationPath('src/app/core/core.module.ts'));
    this.fs.copy(this.templatePath('src/app/core/data.service.ts'), this.destinationPath('src/app/core/data.service.ts'));

    this.fs.copy(this.templatePath('src/app/shared/shared.module.ts'), this.destinationPath('src/app/shared/shared.module.ts'));

    this.fs.copyTpl(
      this.templatePath('gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('src/index.ejs'),
      this.destinationPath('src/index.ejs'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('src/app/app.module.ts'),
      this.destinationPath(`src/app/${this.props.lowPrefix}.module.ts`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('src/app/app.component.ts'),
      this.destinationPath(`src/app/${this.props.lowPrefix}.component.ts`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('src/app/app.html'),
      this.destinationPath(`src/app/${this.props.lowPrefix}.html`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('src/scss/**/*'),
      this.destinationPath('src/scss'),
      props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      props
    );
  }

  // Install Queue
  install () {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
      callback: () => {
        this.spawnCommandSync('git', ['init']);
        this.spawnCommandSync('git', ['add', '--all']);
        this.spawnCommandSync('git', ['commit', '-m', '"Initial Commit"']);
      }
    });
  }

  // End Queue
  end () {
    this.log(chalk.green('Your AngularJS+TypeScript app is ready. Build something awesome!'));
    this.spawnCommandSync('subl', ['.']);
    this.spawnCommandSync('npm', ['run', 'serve']);
  }
}
