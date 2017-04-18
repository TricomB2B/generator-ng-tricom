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
      type: 'input',
      name: 'description',
      message: 'Describe this service.',
      default: 'It does stuff.'
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
          servModule = 'src/app/services/services.module.ts';

    // process the templates
    this.fs.copyTpl(
      this.templatePath('service.module.ts'),
      this.destinationPath(`src/app/services/${props.lowName}/${props.lowName}.module.ts`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('service.service.ts'),
      this.destinationPath(`src/app/services/${props.lowName}/${props.lowName}.service.ts`),
      props
    );

    // add the new module to the components container module
    return fsp
      .readFile(this.destinationPath(servModule), 'utf8')
      .then((data) => {
        const re1 = new RegExp('(\/\/ service module imports\n)'),
              re2 = new RegExp(`(.module\\('${props.lowPrefix}.services', \\[\n)`);

        let newFile = data
          .replace(
            re1,
            `$&import { ${props.upName}Module } from './${props.lowName}/${props.lowName}.module';\n`)
          .replace(
            re2,
            `$&    ${props.upName}Module,\n`);

        return fsp.writeFile(this.destinationPath(servModule), newFile);
      })
      .then(() => {
        this.log(`   ${chalk.green('updated')} ${servModule}`);
      });
  }

  // End Queue
  end () {
    this.log(chalk.green('Your new service is ready!'));
  }
}
