// 'use strict';

// const Generator = require('yeoman-generator');
// const chalk     = require('chalk');
// const mkdirp    = require('mkdirp');

// module.exports = class extends Generator {
//   prompting() {
//     this.log(
//       'This is a ' + chalk.red('baza-webapp') + ' generator which bootstraps simple ES6-driven project.'
//     );

//     const prompts = [{
//       type: 'confirm',
//       name: 'proceed',
//       message: 'Shall we proceed?',
//       default: true
//     }];

//     return this.prompt(prompts).then(props => {
//       this.props = props;
//     });
//   }

//   writing() {
//     this._writingDummyDirectories();
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
//   }

//   _writingDummyDirectories() {
//     mkdirp('src/images');
//   }

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

//   install() {
//     this.installDependencies({
//       bower: false
//     });
//   }
// };
