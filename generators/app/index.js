'use strict';

const Generator = require('yeoman-generator');
const chalk     = require('chalk');
const mkdirp    = require('mkdirp');
const isScoped  = require('is-scoped');

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const pascalCase = (string) => {
  return string.split('-').map(word => capitalize(word)).join('');
};

const getUnscopedName = (name) => {
  return isScoped(name) ? name.split('/')[1] : name;
};

module.exports = class extends Generator {
  prompting() {
    this.log(
      `This is a @bezet/${chalk.red('js-lib')} generator which bootstraps a new JavaScript library.`
    );

    return this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Your library name (as in package.json - provide namespace if needed)',
        default : '@anonymous/cool-library'
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Your library\'s description',
        default : 'JavaScript library doing some cool stuff.'
      },
      {
        type    : 'input',
        name    : 'authorName',
        message : 'Your name (eg. your nick on GitHub)',
        default : 'anonymous'
      },
      {
        type    : 'input',
        name    : 'authorEmail',
        message : 'Your e-mail',
        default : ''
      },
      {
        type    : 'input',
        name    : 'authorURL',
        message : 'Your URL (eg. link to a GitHub profile)',
        default : ''
      },
      {
        type    : 'input',
        name    : 'license',
        message : 'Your library\'s license',
        default : 'MIT'
      },
    ]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    this._writingLibraryFiles();
    this._writingDemoFiles();
  }

  _writingLibraryFiles() {
    this.fs.copy(this.templatePath('config/*'), this.destinationPath('config/'));
    this.fs.copy(this.templatePath('test/*'), this.destinationPath('test/'));
    this.fs.copy(this.templatePath('./.*'), this.destinationPath('.'));
    this.fs.copy(this.templatePath('gulpfile.*'), this.destinationPath('.'));

    this.fs.copy(
      this.templatePath('src/main.js'),
      this.destinationPath(`src/${getUnscopedName(this.props.name)}.js`)
    );

    this.fs.copy(
      this.templatePath('src/main.scss'),
      this.destinationPath(`src/${getUnscopedName(this.props.name)}.scss`)
    );

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        isMIT: (this.license === 'MIT'),
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        description: this.props.description,
        name: this.props.name,
        unscopedName: getUnscopedName(this.props.name),
        authorName: this.props.authorName,
        license: this.props.license
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        authorName: `${this.props.authorName}`,
        authorEmail: `${this.props.authorEmail}`,
        authorURL: `${this.props.authorURL}`,
        packageName: `${this.props.name}`,
        packageDescription: `${this.props.description}`,
        unscopedPackageName: `${getUnscopedName(this.props.name)}`,
        license: `${this.props.license}`
      }
    );
  }

  _writingDemoFiles() {
    mkdirp('docs/fonts');
    mkdirp('docs/images');

    this.fs.copyTpl(
      this.templatePath('docs/scripts/main.js'),
      this.destinationPath('docs/scripts/main.js'),
      {
        importName: `${pascalCase(getUnscopedName(this.props.name))}`,
        packageName: `${this.props.name}`
      }
    );

    this.fs.copyTpl(
      this.templatePath('docs/styles/main.scss'),
      this.destinationPath('docs/styles/main.scss'),
      {
        packageName: `${getUnscopedName(this.props.name)}`
      }
    );

    this.fs.copyTpl(
      this.templatePath('docs/index.html'),
      this.destinationPath('docs/index.html'),
      {
        title: {
          author: this.props.authorName !== '' ? `${this.props.authorName}'s ` : '',
          libraryName: `${getUnscopedName(this.props.name)}`,
        }
      }
    );

    this.fs.copyTpl(
      this.templatePath('docs/_package.json'),
      this.destinationPath('docs/package.json'),
      {
        authorName: `${this.props.authorName}`,
        authorEmail: `${this.props.authorEmail}`,
        authorURL: `${this.props.authorURL}`
      }
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.log(
      `${chalk.blue('Now we need to run')} ${chalk.red('npm run initialize')} ${chalk.blue('which will install demo\'s dependencies and symlink your lib so it can be used locally without publishing yet.')}`
    );

    this.spawnCommandSync('npm', ['run', 'initialize']);
  }
};
