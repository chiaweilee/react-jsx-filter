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

### Embedding Expressions in JSX

JavaScript expression
