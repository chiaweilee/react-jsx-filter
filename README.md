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

### Configure

Install [babel-plugin-transform-react-jsx-filter](https://github.com/chiaweilee/react-jsx-filter/tree/master/packages/babel-plugin-transform-react-jsx-filter)
