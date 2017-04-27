'use strict';

/**
 * Generates an app service
 */

const Generator = require('yeoman-generator'),
      chalk     = require('chalk'),
      caseIt    = require('change-case'),
      fsp       = require('fs-promise');

module.exports = class extends Generator {
  // Prompting Queue
  prompting () {
    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of this service?',
      validate: Boolean
    }, {
      type: 'confirm',
      name: 'isCore',
      message: 'Is this a core service?',
      default: true
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe this service.',
      default: 'It does stuff with other stuff.'
    }];

    return this.prompt(prompts)
      .then((answers) => {
        this.props            = answers;
        this.props.upPrefix   = this.config.get('upPrefix');
        this.props.lowPrefix  = this.config.get('lowPrefix');
        this.props.upName     = caseIt.upperCaseFirst(this.props.name);
        this.props.lowName    = caseIt.paramCase(this.props.name);
      });
  }

  // Writing Queue
  writing () {
    const props      = this.props,
          coreModule = 'src/app/core/core.module.ts';

    if (props.isCore) {
      this.fs.copyTpl(
        this.templatePath('service.service.ts'),
        this.destinationPath(`src/app/core/${props.lowName}.service.ts`),
        props
      );

      // add the new service to the core container module
      return fsp
        .readFile(this.destinationPath(coreModule), 'utf8')
        .then((data) => {
          const re1 = new RegExp('(\/\/ service imports\n)'),
                re2 = new RegExp(`(module\\('core', \\[\\]\\)\n)`);

          let newFile = data
            .replace(
              re1,
              `$&import { ${props.upName}Service } from './${props.lowName}.service';\n`)
            .replace(
              re2,
              `$&  .service('${props.upName}Service', ${props.upName}Service)\n`);

          return fsp.writeFile(this.destinationPath(coreModule), newFile);
        })
        .then(() => {
          this.log(`   ${chalk.green('updated')} ${coreModule}`);
        });
    }
  }

  // End Queue
  end () {
    this.log(chalk.green('Your new service is ready!'));
  }
}
