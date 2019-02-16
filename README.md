## React-JSX-filter
---

### Example

```react.js
// <div>React</div>
<div>{ 'react' | capitalize }</div>
```

```react.js
// <div>Hello world!</div>
<div>{ 'hello' | capitalize | concat(' ', 'world!') }</div>
```

```react.js
<div>你好</div>
<div>{ 'hello' | translate('zh-cn') }</div>
```

```react.js
// with lodash
<div>{ this.state.data | _.filter({ 'active': true }) | this.renderTable }</div>
```


result: *Hello world!*

### Issue

[x] todo support TypeScript

### Configure

Babel [babel-plugin-transform-react-jsx-filter](https://github.com/chiaweilee/react-jsx-filter/tree/master/packages/babel-plugin-transform-react-jsx-filter)

Eslint [eslint-config-react-jsx-filter](https://github.com/chiaweilee/react-jsx-filter/tree/master/packages/eslint-config-react-jsx-filter)

umi.js [Configure](https://github.com/chiaweilee/react-jsx-filter/blob/master/docs/umi.js.md)
