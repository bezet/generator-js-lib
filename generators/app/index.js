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
      'This is a @bezet/' + chalk.red('js-lib') + ' generator which bootstraps a new JavaScript library.'
    );

    return this.prompt([
      {
        type    : 'input',
        name    : 'name',
        message : 'Your library name (as in package.json - provide namespace if neeeded)',
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
//     this._writingScripts();
//     this._writingStyles();
//     this._writingTemplates();
//     this._writingPackageJSON();
//     this._writingGulpfile();
//     this._writingBabel();
//     this._writingGit();
//     this._writingWebpackConfig();
//     this._writingModernizrConfig();
//     this._writingReadme();
  }

  _writingLibraryFiles() {
    mkdirp('docs/fonts');

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

//   _writingScripts() {
//     this.fs.copy(
//       this.templatePath('src/scripts/index.js'),
//       this.destinationPath('src/scripts/index.js')
//     );
//   }

//   _writingStyles() {
//     this.fs.copy(
//       this.templatePath('src/scss/main.scss'),
//       this.destinationPath('src/scss/main.scss')
//     );
//   }

//   _writingTemplates() {
//     this.fs.copy(
//       this.templatePath('src/templates/index.html'),
//       this.destinationPath('src/templates/index.html')
//     );
//   }

//   _writingGulpfile() {
//     this.fs.copy(
//       this.templatePath('gulpfile.babel.js'),
//       this.destinationPath('gulpfile.babel.js')
//     );
//   }

//   _writingPackageJSON() {
//     this.fs.copy(
//       this.templatePath('_package.json'),
//       this.destinationPath('package.json')
//     );
//   }

//   _writingBabel() {
//     this.fs.copy(
//       this.templatePath('babelrc'),
//       this.destinationPath('.babelrc')
//     );
//   }

//   _writingGit() {
//     this.fs.copy(
//       this.templatePath('gitignore'),
//       this.destinationPath('.gitignore'));

//     this.fs.copy(
//       this.templatePath('gitattributes'),
//       this.destinationPath('.gitattributes'));
//   }

//   _writingWebpackConfig() {
//     this.fs.copy(
//       this.templatePath('webpack.config.js'),
//       this.destinationPath('webpack.config.js')
//     );
//   }

//   _writingModernizrConfig() {
//     this.fs.copy(
//       this.templatePath('modernizr-config.json'),
//       this.destinationPath('modernizr-config.json')
//     );
//   }

//   _writingReadme() {
//     this.fs.copy(
//       this.templatePath('README.md'),
//       this.destinationPath('README.md')
//     );
//   }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
