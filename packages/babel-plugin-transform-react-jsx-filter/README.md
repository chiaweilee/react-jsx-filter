babel-plugin-transform-react-jsx-filter
---------------------------------------

## Install

```
$ npm install babel-plugin-transform-react-jsx-filter --save-dev
```

## Usage

### Via .babelrc (Recommended)

.babelrc

```json
{
  "plugins": ["transform-react-jsx-filter"]
}
```

### Via CLI

```command
$ babel --plugins transform-react-jsx-filter script.js
```

### Via Node API

```JavaScript
require('babel-core').transform('code', {
  plugins: ['transform-react-jsx-filter']
});
```

### Via Webpack

```json
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  loader: require.resolve('babel-loader'),
  options: {
    plugins: [
      [ require.resolve('babel-plugin-transform-react-jsx-filter') ]
    ]
  }
}
```

## React JSX filter

https://github.com/chiaweilee/react-jsx-filter
