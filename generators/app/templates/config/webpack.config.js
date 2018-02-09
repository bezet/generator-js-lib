import path from 'path';
import webpack from 'webpack';
import isScoped from 'is-scoped';
import packageInfo from '../package.json';

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const pascalCase = (string) => {
  return string.split('-').map(word => capitalize(word)).join('');
};

const getUnscopedName = (name) => {
  return isScoped(name) ? name.split('/')[1] : name;
};

const rootPath = '../';
const packageName = getUnscopedName(packageInfo.name);

module.exports = {
  cache: true,
  entry: path.resolve(__dirname, rootPath, `src/${packageName}.js`),
  output: {
    path: path.resolve(__dirname, rootPath, 'dist'),
    filename: `${packageName}.js`,
    library: `${pascalCase(packageName)}`,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['babel-plugin-add-module-exports']
        }
      }
    ]
  }
};
