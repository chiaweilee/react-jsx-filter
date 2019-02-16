## React-JSX-filter
---

### Example

```react.js
<div>{ 'react' | capitalize }</div>
```

result: *React*

```react.js
<div>{ 'hello' | translate('zh-cn') }</div>
```

result: *你好*

```react.js
<div>{ 'hello' | capitalize | concat(' ', 'world!') }</div>
```

result: *Hello world!*

### Issue

[x] todo support TypeScript

### Configure

Babel [babel-plugin-transform-react-jsx-filter](https://github.com/chiaweilee/react-jsx-filter/tree/master/packages/babel-plugin-transform-react-jsx-filter)

Eslint [eslint-config-react-jsx-filter](https://github.com/chiaweilee/react-jsx-filter/tree/master/packages/eslint-config-react-jsx-filter)

umi.js [Configure](https://github.com/chiaweilee/react-jsx-filter/blob/master/docs/umi.js.md)
