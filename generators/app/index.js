'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const slugify = require('slugify');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('generator-resthapi')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Whats the project name?',
        default: this.appname // Default to current folder name
      },
      {
        type: 'input',
        name: 'appTitle',
        message: 'Enter app title',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'Enter app version',
        default: '1.0.0'
      }
    ];

    return this.prompt(prompts).then(props => {
      props.name = slugify(props.name);
      this.props = props;
    });
  }

  writing() {
    let props = this.props;
    let copy = this.fs.copy.bind(this.fs);
    let copyTpl = this.fs.copyTpl.bind(this.fs);
    let tPath = this.templatePath.bind(this);
    let dPath = this.destinationPath.bind(this);

    copyTpl(tPath('server.js'), dPath('server.js'), props);
    copyTpl(tPath('.env.example'), dPath('.env.example'), props);
    copyTpl(tPath('.env'), dPath('.env'), props);
    copyTpl(tPath('_package.json'), dPath('package.json'), props);
    copy(tPath('gitignore'), dPath('.gitignore'));
    copyTpl(tPath('_README.md'), dPath('README.md'), props);
    mkdirp.sync(dPath('models'));
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
