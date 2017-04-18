'use strict';

/**
 * Generates an app component
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
      message: 'What is the name of this component?',
      validate: Boolean
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe this component.',
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
          compModule = 'src/app/components/components.module.ts';

    // process the templates
    this.fs.copyTpl(
      this.templatePath('comp.component.ts'),
      this.destinationPath(`src/app/components/${props.lowName}/${props.lowName}.component.ts`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('comp.controller.ts'),
      this.destinationPath(`src/app/components/${props.lowName}/${props.lowName}.controller.ts`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('comp.html'),
      this.destinationPath(`src/app/components/${props.lowName}/${props.lowName}.html`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('comp.module.ts'),
      this.destinationPath(`src/app/components/${props.lowName}/${props.lowName}.module.ts`),
      props
    );
    this.fs.copyTpl(
      this.templatePath('comp.scss'),
      this.destinationPath(`src/app/components/${props.lowName}/${props.lowName}.scss`),
      props
    );

    // add the new module to the components container module
    return fsp
      .readFile(this.destinationPath(compModule), 'utf8')
      .then((data) => {
        const re1 = new RegExp('(\/\/ component module imports\n)'),
              re2 = new RegExp(`(.module\\('${props.lowPrefix}.components', \\[\n)`);

        let newFile = data
          .replace(
            re1,
            `$&import { ${props.upName}Module } from './${props.lowName}/${props.lowName}.module';\n`)
          .replace(
            re2,
            `$&    ${props.upName}Module,\n`);

        return fsp.writeFile(this.destinationPath(compModule), newFile);
      })
      .then(() => {
        this.log(`   ${chalk.green('updated')} ${compModule}`);
      });
  }

  // End Queue
  end () {
    this.log(chalk.green('Your new component is ready!'));
  }
}
